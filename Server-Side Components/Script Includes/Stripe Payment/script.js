var StripePaymentProcessor = Class.create();
StripePaymentProcessor.prototype = {
  initialize: function () {
    this.stripeSecretKey = gs.getProperty("stripe_payment_key");
    this.stripeApiUrl = "https://api.stripe.com/v1/";
  },

  createPaymentIntent: function (paymentData) {
    try {
      // Validate input data
      if (!paymentData.payment_method_id || !paymentData.amount) {
        return {
          success: false,
          error: "Missing required payment data",
        };
      }

      // Prepare PaymentIntent data
      var intentData = {
        amount: parseInt(paymentData.amount),
        currency: paymentData.currency || "usd",
        payment_method: paymentData.payment_method_id,
        confirmation_method: "automatic",
        confirm: true,
        return_url: "https://npsm.service.service-now.com/",
      };

      // Add customer info if provided
      if (paymentData.customer_info) {
        intentData.description = paymentData.metadata
          ? paymentData.metadata.description
          : "ServiceNow Payment";

        var customerId = this.findOrCreateCustomer(paymentData.customer_info);
        if (customerId) {
          intentData.customer = customerId;
        }
      }

      // Add metadata
      if (paymentData.metadata) {
        intentData.metadata = paymentData.metadata;
      }

      // Make REST call to Stripe
      var response = this.makeStripeRequest(
        "payment_intents",
        "POST",
        intentData
      );

      if (response && response.id) {
        // Log the initial payment attempt
        this.logPaymentAttempt(response, paymentData);

        // Handle the payment result
        if (response.status === "succeeded") {
          this.updatePaymentLogSuccess(response.id, response);
        } else if (response.status === "requires_action") {
          this.updatePaymentLogRequiresAction(response.id, response);
        }

        return {
          success: true,
          payment_intent_id: response.id,
          status: response.status,
          client_secret: response.client_secret,
          requires_action: response.status === "requires_action",
          next_action: response.next_action,
        };
      } else {
        // Log failed payment attempt
        this.logFailedPayment(
          null,
          paymentData,
          "Failed to create payment intent"
        );
        return {
          success: false,
          error: "Failed to create payment intent",
        };
      }
    } catch (error) {
      gs.error("Stripe Payment Error: " + error.toString());
      // Log failed payment attempt
      this.logFailedPayment(null, paymentData, error.message);
      return {
        success: false,
        error: "Payment processing error: " + error.message,
      };
    }
  },

  getPaymentmethod: function (paymethod, recordid) {
    gs.info(
      "getPaymentmethod called + " +
        JSON.stringify(paymethod) +
        " id :- " +
        recordid
    );
    var methodid = paymethod.payment_method_id;
    var grUTH = new GlideRecord("u_transaction_history");
    if (grUTH.get(recordid)) {
      var data = {};
      data.product = grUTH.getDisplayValue("u_product");
      data.promo_code = grUTH.getDisplayName("u_promo_code");
      data.billing_cycle = grUTH.getValue("u_billing_cycle");
      data.discount_amount = grUTH.getValue("u_discount_amount");
      data.subscribed_on = grUTH.getValue("u_subscribed_on");
      data.status = grUTH.getValue("u_status");
      data.ends_on = grUTH.getValue("u_ends_on");
      data.customerid = grUTH.getValue("u_customerid");
      data.total_users = grUTH.getValue("u_total_users");
      var amountincents = grUTH.getValue("u_total_amount") * 100;

      var subscriptionData = {
        customerId: grUTH.getValue("u_customer_stripe_id"),
        productId: grUTH.getValue("u_stripe_product_id"),
        paymentID: methodid,
        unitAmount: parseInt(amountincents),
        interval: grUTH.getValue("u_billing_cycle"),
        currency: "usd",
      };

      gs.info("subscriptionData" + JSON.stringify(subscriptionData));

      var attachResult = this.attachPaymentMethodToCustomer(
        methodid,
        subscriptionData.customerId
      );
      if (!attachResult.success) {
        gs.error(
          "Failed to attach payment method to customer: " + attachResult.error
        );
        this.updateTransactionStatus(
          recordid,
          "Failed",
          "Failed to attach payment method to customer: " + attachResult.error
        );
        return {
          success: false,
          error:
            "Failed to attach payment method to customer: " +
            attachResult.error,
        };
      }

      gs.info(
        "Payment method attached successfully, proceeding with subscription creation"
      );
      return this.createSubscription(subscriptionData);
    }
    this.updateTransactionStatus(
      recordid,
      "Failed",
      "Transaction record not found for sys_id: " + recordid
    );
    return {
      success: false,
      error: "Transaction record not found",
    };
  },

  createSubscriptionFromClient: function (subscriptionData, recordid) {
    try {
      gs.info(
        "Creating subscription from client data: " +
          JSON.stringify(subscriptionData)
      );

      var gr_tsc = new GlideRecord("u_transaction_history");
      if (!gr_tsc.get(recordid)) {
        gs.error("Transaction record not found for sys_id: " + recordid);
        this.updateTransactionStatus(
          recordid,
          "Failed",
          "Transaction record not found for sys_id: " + recordid
        );
        return {
          success: false,
          error: "Transaction record not found",
        };
      }

      var amount = gr_tsc.getValue("u_total_amount") * 100;
      var billing_cycle = gr_tsc.getValue("u_billing_cycle");
      var productid = gr_tsc.getValue("u_stripe_product_id");
      var product = gr_tsc.getDisplayValue("u_product");

      var customerId = subscriptionData.customer_info.id;
      var attachResult = this.attachPaymentMethodToCustomer(
        subscriptionData.payment_method_id,
        customerId
      );
      if (!attachResult.success) {
        this.updateTransactionStatus(
          recordid,
          "Failed",
          "Failed to attach payment method: " + attachResult.error
        );
        return attachResult;
      }

      var payload = {
        customer: customerId,
        items: [
          {
            price_data: {
              currency: "usd",
              unit_amount: amount,
              recurring: {
                interval: billing_cycle,
              },
              product: productid,
            },
          },
        ],
        default_payment_method: subscriptionData.payment_method_id,
        expand: ["latest_invoice.payment_intent"],
        collection_method: "charge_automatically",
        metadata: {
          recordid: recordid,
          product: product,
          description: subscriptionData.metadata.description || "",
        },
      };

      if (subscriptionData.subscription_details.trial_period_days > 0) {
        payload.trial_period_days =
          subscriptionData.subscription_details.trial_period_days;
      }

      gs.info("Subscription payload: " + JSON.stringify(payload));

      var response = this.makeStripeRequest("subscriptions", "POST", payload);
      gs.info("Stripe subscription response: " + JSON.stringify(response));

      this.updateTransactionRecord(recordid, response, customerId);

      if (
        response.latest_invoice &&
        response.latest_invoice.payment_intent &&
        response.latest_invoice.payment_intent.status === "requires_action"
      ) {
        return {
          success: true,
          requires_action: true,
          payment_intent: {
            id: response.latest_invoice.payment_intent.id,
            client_secret: response.latest_invoice.payment_intent.client_secret,
            payment_method:
              response.latest_invoice.payment_intent.payment_method,
          },
          subscription_id: response.id,
        };
      }

      if (response.status === "active" || response.status === "trialing") {
        gs.info(
          "Subscription created with status: " +
            response.status +
            ". Checking webhook confirmation..."
        );
        gs.sleep(2000);

        var webhookResult = this.checkWebhookConfirmation(
          response.latest_invoice
            ? response.latest_invoice.payment_intent.id
            : null,
          recordid,
          response.id
        );

        if (webhookResult.success) {
          gs.info(
            "Webhook confirmation received for subscription: " + response.id
          );
          this.updateTransactionStatus(recordid, "Active");
          return {
            success: true,
            subscription_id: response.id,
            status: response.status,
            requires_action: false,
            webhook_confirmed: true,
            payment_confirmed: true,
          };
        } else {
          gs.info(
            "Webhook confirmation pending for subscription: " + response.id
          );
          return {
            success: true,
            subscription_id: response.id,
            status: response.status,
            requires_action: false,
            webhook_confirmed: false,
            payment_confirmed: false,
            message: "Subscription created but awaiting webhook confirmation",
          };
        }
      } else {
        this.updateTransactionStatus(
          recordid,
          "Failed",
          "Subscription creation failed with status: " + response.status
        );
        return {
          success: false,
          error: "Subscription creation failed with status: " + response.status,
        };
      }
    } catch (ex) {
      gs.error("Exception in createSubscriptionFromClient: " + ex.toString());
      this.updateTransactionStatus(
        recordid,
        "Failed",
        "Internal server error: " + ex.toString()
      );
      return {
        success: false,
        error: "Internal server error: " + ex.toString(),
      };
    }
  },

  attachPaymentMethodToCustomer: function (paymentMethodId, customerId) {
    try {
      gs.info(
        "Attaching payment method " +
          paymentMethodId +
          " to customer " +
          customerId
      );

      if (!paymentMethodId || !customerId) {
        return {
          success: false,
          error: "Payment method ID and customer ID are required",
        };
      }

      var payload = {
        customer: customerId,
      };

      var response = this.makeStripeRequest(
        "payment_methods/" + paymentMethodId + "/attach",
        "POST",
        payload
      );

      gs.info(
        "Payment method attached successfully: " + JSON.stringify(response)
      );
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      gs.error("Error attaching payment method: " + error.message);
      return {
        success: false,
        error: "Failed to attach payment method to customer: " + error.message,
      };
    }
  },

  updateTransactionRecord: function (recordid, stripeResponse, customerId) {
    try {
      var grUTH = new GlideRecord("u_transaction_history");
      if (grUTH.get(recordid)) {
        grUTH.setValue("u_subscription_id", stripeResponse.id);

        if (
          stripeResponse.latest_invoice &&
          stripeResponse.latest_invoice.payment_intent
        ) {
          grUTH.setValue(
            "u_payment_intent_id",
            stripeResponse.latest_invoice.payment_intent.id
          );
        }

        grUTH.u_comments = JSON.stringify(stripeResponse);

        if (stripeResponse.latest_invoice) {
          grUTH.setValue("u_last_invoice_id", stripeResponse.latest_invoice.id);
        }

        grUTH.update();
        gs.info("Updated transaction record: " + recordid);
      }
    } catch (error) {
      gs.error("Error updating transaction record: " + error.message);
    }
  },

  updateTransactionStatus: function (recordid, status, comment) {
    try {
      var grUTH = new GlideRecord("u_transaction_history");
      if (grUTH.get(recordid)) {
        grUTH.setValue("u_status", status);
        if (comment) {
          var existingComments = grUTH.getValue("u_comments") || "";
          var newComment = new Date().toISOString() + ": " + comment;
          grUTH.u_comments = existingComments
            ? existingComments + "\n" + newComment
            : newComment;
        }
        grUTH.update();
        gs.info(
          "Updated transaction status for record: " +
            recordid +
            " to: " +
            status +
            (comment ? " with comment: " + comment : "")
        );
      } else {
        gs.warn("Transaction record not found for sys_id: " + recordid);
      }
    } catch (error) {
      gs.error(
        "Error updating transaction status for record: " +
          recordid +
          ": " +
          error.message
      );
    }
  },

  confirm3DSecurePayment: function (paymentIntentId, recordid) {
    try {
      gs.info("Confirming 3D Secure payment for PI: " + paymentIntentId);

      var paymentIntent = this.getPaymentIntent(paymentIntentId);
      if (!paymentIntent.success) {
        this.updateTransactionStatus(
          recordid,
          "Failed",
          "Failed to retrieve payment intent: " + paymentIntent.error
        );
        return paymentIntent;
      }

      var status = paymentIntent.data.status;
      gs.info("Payment Intent status: " + status);

      if (status === "succeeded") {
        var webhookConfirmed = this.checkWebhookConfirmation(
          paymentIntentId,
          recordid
        );
        if (webhookConfirmed.success) {
          this.updateTransactionStatus(recordid, "Active");
          return {
            success: true,
            status: "succeeded",
            message: "Payment confirmed via webhook",
            webhook_confirmed: true,
            payment_confirmed: true,
          };
        } else {
          return {
            success: false,
            error: "Payment succeeded but webhook confirmation pending",
            payment_confirmed: false,
            webhook_confirmed: false,
          };
        }
      } else if (status === "processing") {
        return {
          success: false,
          error: "Payment is still processing",
          payment_confirmed: false,
        };
      } else {
        this.updateTransactionStatus(
          recordid,
          "Failed",
          "Payment failed or was cancelled with status: " + status
        );
        return {
          success: false,
          error: "Payment failed or was cancelled",
          payment_confirmed: false,
        };
      }
    } catch (error) {
      gs.error("Error confirming 3D Secure payment: " + error.message);
      this.updateTransactionStatus(
        recordid,
        "Failed",
        "Failed to confirm 3D Secure payment: " + error.message
      );
      return {
        success: false,
        error: "Failed to confirm payment: " + error.message,
        payment_confirmed: false,
      };
    }
  },

  getPaymentIntent: function (paymentIntentId) {
    try {
      var response = this.makeStripeRequest(
        "payment_intents/" + paymentIntentId,
        "GET"
      );
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to retrieve payment intent: " + error.message,
      };
    }
  },

  checkWebhookConfirmation: function (
    paymentIntentId,
    recordid,
    subscriptionId
  ) {
    try {
      gs.info(
        "Checking webhook confirmation for PI: " +
          paymentIntentId +
          ", Record: " +
          recordid +
          ", Subscription: " +
          subscriptionId
      );

      var grEventLog = new GlideRecord("u_stripe_event_log");
      grEventLog.addQuery("u_transaction_ref", recordid);

      var eventTypes = [];
      if (paymentIntentId) {
        eventTypes.push("payment_intent.succeeded");
        eventTypes.push("invoice.payment_succeeded");
      }
      if (subscriptionId) {
        eventTypes.push("customer.subscription.created");
        eventTypes.push("customer.subscription.updated");
      }

      if (eventTypes.length > 0) {
        grEventLog.addQuery("u_event_type", "IN", eventTypes.join(","));
      }

      grEventLog.addQuery("u_status", "Processed");
      grEventLog.orderByDesc("sys_created_on");
      grEventLog.query();

      var foundWebhook = false;
      var webhookSubscriptionId = null;

      while (grEventLog.next()) {
        var eventType = grEventLog.getValue("u_event_type");

        if (
          paymentIntentId &&
          (eventType === "payment_intent.succeeded" ||
            eventType === "invoice.payment_succeeded")
        ) {
          var eventData = grEventLog.getValue("u_event_data");
          if (eventData && eventData.indexOf(paymentIntentId) > -1) {
            foundWebhook = true;
            webhookSubscriptionId = grEventLog.getValue("u_subscription_id");
            break;
          }
        }

        if (
          subscriptionId &&
          (eventType === "customer.subscription.created" ||
            eventType === "customer.subscription.updated")
        ) {
          var storedSubId = grEventLog.getValue("u_subscription_id");
          if (storedSubId === subscriptionId) {
            foundWebhook = true;
            webhookSubscriptionId = subscriptionId;
            break;
          }
        }
      }

      if (foundWebhook) {
        this.updateTransactionStatus(recordid, "Active");
        return {
          success: true,
          subscription_id: webhookSubscriptionId || subscriptionId,
          confirmed_via_webhook: true,
        };
      }

      return {
        success: false,
        error: "Webhook confirmation not found",
      };
    } catch (error) {
      gs.error("Error checking webhook confirmation: " + error.message);
      this.updateTransactionStatus(
        recordid,
        "Failed",
        "Failed to check webhook confirmation: " + error.message
      );
      return {
        success: false,
        error: "Failed to check webhook confirmation",
      };
    }
  },

  checkPaymentStatus: function (paymentIntentId) {
    try {
      var paymentIntent = this.getPaymentIntent(paymentIntentId);

      if (!paymentIntent.success) {
        return {
          status: "error",
          error: paymentIntent.error,
        };
      }

      var status = {
        status: paymentIntent.data.status,
      };

      if (status === "succeeded") {
        response.amount_received = paymentIntent.data.amount_received;
      } else if (status === "requires_action") {
        response.next_action = paymentIntent.data.next_action;
      } else if (status === "failed") {
        response.error = paymentIntent.data.last_payment_error
          ? paymentIntent.data.last_payment_error.message
          : "Payment failed";
      }

      return response;
    } catch (error) {
      return {
        status: "error",
        error: "Failed to check payment status: " + error.message,
      };
    }
  },

  checkSubscriptionStatus: function (subscriptionId, recordid) {
    try {
      var grEventLog = new GlideRecord("u_stripe_event_log");
      grEventLog.addQuery("u_subscription_id", subscriptionId);
      grEventLog.addQuery(
        "u_event_type",
        "IN",
        "customer.subscription.created,customer.subscription.updated,invoice.payment_succeeded"
      );
      grEventLog.orderByDesc("sys_created_on");
      grEventLog.setLimit(1);
      grEventLog.query();

      var webhookStatus = null;
      if (grEventLog.next()) {
        webhookStatus = grEventLog.getValue("u_status");
      }

      var stripeSubscription = this.getSubscription(subscriptionId);
      var stripeStatus = stripeSubscription.success
        ? stripeSubscription.data.status
        : null;

      var finalStatus = "pending";
      if (
        webhookStatus === "Processed" &&
        (stripeStatus === "active" || stripeStatus === "trialing")
      ) {
        finalStatus = "active";
        this.updateTransactionStatus(recordid, "Active");
      } else if (
        stripeStatus === "incomplete" ||
        stripeStatus === "incomplete_expired" ||
        stripeStatus === "canceled"
      ) {
        finalStatus = "failed";
        this.updateTransactionStatus(
          recordid,
          "Failed",
          "Subscription status invalid: " + stripeStatus
        );
      } else if (webhookStatus) {
        finalStatus = "processing";
      }

      return {
        status: finalStatus,
        stripe_status: stripeStatus,
        webhook_confirmed: !!webhookStatus,
      };
    } catch (error) {
      gs.error("Error checking subscription status: " + error.message);
      this.updateTransactionStatus(
        recordid,
        "Failed",
        "Failed to check subscription status: " + error.message
      );
      return {
        status: "error",
        error: "Failed to check subscription status: " + error.message,
      };
    }
  },

  checkFinalPaymentConfirmation: function (
    subscriptionId,
    paymentIntentId,
    recordid
  ) {
    try {
      gs.info(
        "Checking final payment confirmation for subscription: " +
          subscriptionId
      );
      gs.sleep(1000);

      var webhookResult = this.checkWebhookConfirmation(
        paymentIntentId,
        recordid,
        subscriptionId
      );

      if (webhookResult.success) {
        this.updateTransactionStatus(recordid, "Active");
        return {
          success: true,
          payment_confirmed: true,
          webhook_confirmed: true,
          subscription_id: webhookResult.subscription_id,
          message: "Payment fully confirmed via webhook",
        };
      } else {
        var subscriptionResult = this.getSubscription(subscriptionId);
        if (
          subscriptionResult.success &&
          (subscriptionResult.data.status === "active" ||
            subscriptionResult.data.status === "trialing")
        ) {
          this.updateTransactionStatus(recordid, "Active");
          return {
            success: true,
            payment_confirmed: true,
            webhook_confirmed: false,
            subscription_id: subscriptionId,
            message: "Payment confirmed via Stripe API (webhook pending)",
          };
        }

        this.updateTransactionStatus(
          recordid,
          "Failed",
          "Payment confirmation pending or failed"
        );
        return {
          success: false,
          payment_confirmed: false,
          webhook_confirmed: false,
          error: "Payment confirmation pending",
        };
      }
    } catch (error) {
      gs.error("Error in checkFinalPaymentConfirmation: " + error.message);
      this.updateTransactionStatus(
        recordid,
        "Failed",
        "Failed to confirm payment: " + error.message
      );
      return {
        success: false,
        payment_confirmed: false,
        error: "Failed to confirm payment: " + error.message,
      };
    }
  },

  createSubscription: function (subscriptionData) {
    try {
      var validation = this._validateSubscriptionData(subscriptionData);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.error,
          errorCode: "VALIDATION_ERROR",
        };
      }

      if (subscriptionData.paymentID && subscriptionData.customerId) {
        var attachResult = this.attachPaymentMethodToCustomer(
          subscriptionData.paymentID,
          subscriptionData.customerId
        );
        if (!attachResult.success) {
          gs.error(
            "Failed to attach payment method in createSubscription: " +
              attachResult.error
          );
          return {
            success: false,
            error:
              "Failed to attach payment method to customer: " +
              attachResult.error,
            errorCode: "PAYMENT_METHOD_ATTACH_ERROR",
          };
        }
        gs.info("Payment method attached successfully in createSubscription");
      }

      var payload = this._buildSubscriptionPayload(subscriptionData);
      gs.info("Subscription payload: " + JSON.stringify(payload));

      var response = this.makeStripeRequest("subscriptions", "POST", payload);
      gs.info("Stripe subscription response: " + JSON.stringify(response));

      if (response.status === "active" || response.status === "trialing") {
        gs.info("Stripe subscription created successfully: " + response.id);
        return {
          success: true,
          subscriptionId: response.id,
          status: response.status,
          data: response,
        };
      } else {
        return {
          success: false,
          error:
            response.error ||
            "Subscription creation failed with status: " + response.status,
          errorCode: response.errorCode || "SUBSCRIPTION_CREATION_ERROR",
        };
      }
    } catch (ex) {
      gs.error("Exception in createSubscription: " + ex.toString());
      return {
        success: false,
        error: "Internal server error: " + ex.toString(),
        errorCode: "INTERNAL_ERROR",
      };
    }
  },

  _validateSubscriptionData: function (data) {
    if (!data) {
      return {
        isValid: false,
        error: "Subscription data is required",
      };
    }

    var requiredFields = [
      "customerId",
      "productId",
      "unitAmount",
      "interval",
      "paymentID",
    ];
    var missingFields = [];

    for (var i = 0; i < requiredFields.length; i++) {
      var field = requiredFields[i];
      if (
        !data[field] ||
        (typeof data[field] === "string" && data[field].trim() === "")
      ) {
        missingFields.push(field);
      }
    }

    if (
      data.unitAmount &&
      (typeof data.unitAmount !== "number" || data.unitAmount <= 0)
    ) {
      return {
        isValid: false,
        error: "unitAmount must be a positive number (amount in cents)",
      };
    }

    if (missingFields.length > 0) {
      return {
        isValid: false,
        error: "Missing required fields: " + missingFields.join(", "),
      };
    }

    if (data.interval) {
      var validIntervals = ["day", "week", "month", "year"];
      if (validIntervals.indexOf(data.interval) === -1) {
        return {
          isValid: false,
          error:
            "Invalid interval. Must be one of: " + validIntervals.join(", "),
        };
      }
    }

    return {
      isValid: true,
    };
  },

  _buildSubscriptionPayload: function (data) {
    var payload = {
      customer: data.customerId,
      items: [
        {
          price_data: {
            currency: data.currency || "usd",
            unit_amount: data.unitAmount,
            recurring: {
              interval: data.interval,
            },
            product: data.productId,
          },
        },
      ],
      expand: ["latest_invoice.payment_intent"],
      collection_method: "charge_automatically",
    };

    if (data.paymentID) {
      payload.default_payment_method = data.paymentID;
    }

    return payload;
  },

  getSubscription: function (subscriptionId) {
    try {
      if (!subscriptionId) {
        return {
          success: false,
          error: "Subscription ID is required",
        };
      }

      var request = new sn_ws.RESTMessageV2();
      request.setEndpoint(
        this.stripeApiUrl + "subscriptions/" + subscriptionId
      );
      request.setHttpMethod("GET");
      request.setRequestHeader(
        "Authorization",
        "Bearer " + this.stripeSecretKey
      );
      request.setRequestHeader("Stripe-Version", "2023-10-16");

      var response = request.execute();
      var httpStatus = response.getStatusCode();
      var responseBody = response.getBody();

      if (httpStatus === 200) {
        return {
          success: true,
          data: JSON.parse(responseBody),
        };
      } else {
        var errorData = JSON.parse(responseBody);
        return {
          success: false,
          error: errorData.error.message,
          errorCode: errorData.error.code,
        };
      }
    } catch (ex) {
      return {
        success: false,
        error: "Failed to retrieve subscription: " + ex.toString(),
      };
    }
  },

  getStripeCustomer: function (customerId) {
    gs.info("getStripeCustomer called by someone:- " + customerId);
    try {
      if (!customerId) {
        return {
          success: false,
          error: "Customer ID is required",
        };
      }

      var request = new sn_ws.RESTMessageV2();
      request.setEndpoint(this.stripeApiUrl + "customers/" + customerId);
      request.setHttpMethod("GET");
      request.setRequestHeader(
        "Authorization",
        "Bearer " + this.stripeSecretKey
      );
      request.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );

      var response = request.execute();
      var httpStatus = response.getStatusCode();
      var responseBody = response.getBody();

      if (httpStatus == 200) {
        var customerData = JSON.parse(responseBody);

        return {
          success: true,
          customer: {
            id: customerData.id,
            name: customerData.name,
            email: customerData.email,
            phone: customerData.phone,
            address: customerData.address
              ? {
                  line1: customerData.address.line1,
                  line2: customerData.address.line2,
                  city: customerData.address.city,
                  state: customerData.address.state,
                  postal_code: customerData.address.postal_code,
                  country: customerData.address.country,
                }
              : null,
            created: customerData.created,
            description: customerData.description,
          },
        };
      } else {
        gs.error("Stripe API Error: " + httpStatus + " - " + responseBody);
        return {
          success: false,
          error: "Failed to fetch customer data from Stripe",
        };
      }
    } catch (error) {
      gs.error("Error fetching Stripe customer: " + error.toString());
      return {
        success: false,
        error: "Internal server error while fetching customer data",
      };
    }
  },

  findOrCreateCustomer: function (customerInfo) {
    gs.info(
      "function called findOrCreateCustomer:- " + JSON.stringify(customerInfo)
    );
    try {
      var customerData = {
        email: customerInfo.email,
        name: customerInfo.name,
        address: customerInfo.address,
      };

      var customerResponse = this.makeStripeRequest(
        "customers",
        "POST",
        customerData
      );

      if (customerResponse && customerResponse.id) {
        gs.info(
          "function called findOrCreateCustomer Response :- " +
            JSON.stringify(customerResponse)
        );
        return customerResponse.id;
      }
    } catch (error) {
      gs.warn("Customer creation error: " + error.toString());
    }

    return null;
  },

  makeStripeRequest: function (endpoint, method, data) {
    try {
      var request = new sn_ws.RESTMessageV2();
      request.setEndpoint(this.stripeApiUrl + endpoint);
      request.setHttpMethod(method);

      request.setRequestHeader(
        "Authorization",
        "Bearer " + this.stripeSecretKey
      );
      request.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      request.setRequestHeader("Stripe-Version", "2023-10-16");

      if (method === "POST" && data) {
        var formData = this.objectToFormData(data);
        request.setRequestBody(formData);
      }

      var response = request.execute();
      var responseBody = response.getBody();
      var httpStatus = response.getStatusCode();

      if (httpStatus >= 200 && httpStatus < 300) {
        return JSON.parse(responseBody);
      } else {
        var errorData = JSON.parse(responseBody);
        gs.error("Stripe API Error: " + httpStatus + " - " + responseBody);
        throw new Error(
          errorData.error ? errorData.error.message : "Stripe API Error"
        );
      }
    } catch (error) {
      gs.error("Stripe Request Error: " + error.toString());
      throw error;
    }
  },

  objectToFormData: function (obj, prefix) {
    var formData = [];

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var value = obj[key];
        var formKey = prefix ? prefix + "[" + key + "]" : key;

        if (
          value !== null &&
          typeof value === "object" &&
          !(value instanceof Date)
        ) {
          formData.push(this.objectToFormData(value, formKey));
        } else if (value !== null && value !== undefined) {
          formData.push(
            encodeURIComponent(formKey) + "=" + encodeURIComponent(value)
          );
        }
      }
    }

    return formData.join("&");
  },

  type: "StripePaymentProcessor",
};
