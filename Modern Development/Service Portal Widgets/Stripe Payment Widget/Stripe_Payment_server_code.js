(function () {
  data.stripeKey = gs.getProperty("Stripe_element_key");

  // Transaction history sys_id
  var recordSysId = input.record;
  var recordType = input.type; // Fixed typo: recordtye -> recordType
  data.typeofrecord = recordType;
  data.recordid = recordSysId;

  var stripeProcessor = new StripePaymentProcessor();

  // Handle different client actions
  if (input.action === "createSubscription") {
    try {
      var result = stripeProcessor.createSubscriptionFromClient(
        input.subscriptionData,
        input.subscriptionData.recordid
      );
      data.response = {
        success: true, // Added success flag
        data: result,
      };
    } catch (error) {
      gs.error("Error creating subscription: " + error.message);
      data.response = {
        success: false,
        error: error.message || "Subscription creation failed",
      };
    }
    return; // Exit early after handling action
  } else if (input.action === "confirm3DSecurePayment") {
    try {
      var result = stripeProcessor.confirm3DSecurePayment(
        input.payment_intent_id,
        input.recordid
      );
      data.response = {
        success: true,
        data: result,
      };
    } catch (error) {
      gs.error("Error confirming 3D Secure payment: " + error.message);
      data.response = {
        success: false,
        error: error.message || "3D Secure confirmation failed",
      };
    }
    return; // Exit early after handling action
  } else if (input.action === "checkPaymentStatus") {
    try {
      var result = stripeProcessor.checkPaymentStatus(input.payment_intent_id);
      data.response = {
        success: true, // Added success flag
        status: result.status,
        error: result.error || null,
      };
    } catch (error) {
      gs.error("Error checking payment status: " + error.message);
      data.response = {
        success: false,
        status: "error",
        error: error.message || "Payment status check failed",
      };
    }
    return; // Exit early after handling action
  } else if (input.action === "checkSubscriptionStatus") {
    try {
      var result = stripeProcessor.checkSubscriptionStatus(
        input.subscription_id
      );
      data.response = {
        success: true, // Added success flag
        status: result.status,
        error: result.error || null,
      };
    } catch (error) {
      gs.error("Error checking subscription status: " + error.message);
      data.response = {
        success: false,
        status: "error",
        error: error.message || "Subscription status check failed",
      };
    }
    return; // Exit early after handling action
  } else if (input.action === "checkFinalPaymentConfirmation") {
    try {
      var result = stripeProcessor.checkFinalPaymentConfirmation(
        input.subscription_id,
        input.payment_intent_id,
        input.recordid
      );
      data.response = {
        success: result.success,
        data: result,
      };
    } catch (error) {
      gs.error("Error checking final payment confirmation: " + error.message);
      data.response = {
        success: false,
        error: error.message || "Final payment confirmation check failed",
      };
    }
    return; // Exit early after handling action
  } else if (input.action === "createPaymentIntent") {
    try {
      data.response = stripeProcessor.createPaymentIntent(input.paymentData);
      if (!data.response.success) {
        data.response.success = false; // Ensure success flag is set
      }
    } catch (error) {
      gs.error("Error creating payment intent: " + error.message);
      data.response = {
        success: false,
        error: error.message || "Payment intent creation failed",
      };
    }
    return; // Added return for consistency
  } else if (input.action === "confirmPaymentSuccess") {
    try {
      data.response = stripeProcessor.confirmPaymentSuccess(
        input.payment_intent_id
      );
      if (!data.response.success) {
        data.response.success = false; // Ensure success flag is set
      }
    } catch (error) {
      gs.error("Error confirming payment success: " + error.message);
      data.response = {
        success: false,
        error: error.message || "Payment confirmation failed",
      };
    }
    return; // Added return for consistency
  } else if (input.action) {
    // Handle unknown actions but only if action is provided
    data.response = {
      success: false,
      error: "Unknown action: " + input.action,
    };
    return; // Exit early for unknown actions
  }

  // Default behavior: Load transaction history data
  // Extracted common logic into a function to avoid duplication
  function loadTransactionHistoryData() {
    var grUTH = new GlideRecord("u_transaction_history");

    // Fetch and populate data if record is found
    if (recordSysId && grUTH.get(recordSysId)) {
      data.product = grUTH.getDisplayValue("u_product");

      if (data.product) {
        var gr_PA = new GlideRecord("cmdb_software_product_model");
        if (gr_PA.get(grUTH.getValue("u_product"))) {
          data.productedition = gr_PA.getValue("edition");
          data.productname = gr_PA.getValue("name");
          data.productcost = gr_PA.cost.getReferenceValue();
          data.productdesc = gr_PA.getValue("short_description");
        }
      }

      // Fixed: Access field value correctly
      data.productplan =
        grUTH.getValue("u_product.edition") || grUTH.u_product.edition;
      data.promo_code = grUTH.getDisplayValue("u_promo_code");

      var billing_cycle = grUTH.getValue("u_billing_cycle");
      data.billing_cycle = billing_cycle == "year" ? "Per Year" : "Per Month";

      data.discount_amount = grUTH.getValue("u_discount_amount");
      data.subscribed_on = grUTH.getValue("u_subscribed_on");
      data.status = grUTH.getValue("u_status");
      data.ends_on = grUTH.getValue("u_ends_on");
      data.customerid = grUTH.getValue("u_customerid");
      data.customer_stripeid = grUTH.getValue("u_customer_stripe_id");
      data.total_users = grUTH.getValue("u_total_users");
      data.total_amount = "$" + grUTH.getValue("u_total_amount");

      // Only set upgradeplan if recordType is not specified (second branch behavior)
      if (!recordType) {
        data.upgradeplan = grUTH.getValue("u_upgrade_history");
      }

      // Get customer address data
      var customerSysId = grUTH.getValue("u_customerid");
      if (customerSysId) {
        var grCA = new GlideRecord("customer_account");
        if (grCA.get(customerSysId)) {
          data.customer_name = grCA.getValue("name") || "";
          data.user_name = gs.getUserDisplayName();
          data.user_email = gs.getUser().getEmail();
          data.customer_email = grCA.getValue("email") || "";
          data.customer_phone = grCA.getValue("phone") || "";

          var countryName = grCA.getValue("country");
          var stateName = grCA.getValue("state") || "";

          var countryCode = "US"; // Default fallback
          if (countryName) {
            var grCountry = new GlideRecord("core_country");
            grCountry.addQuery("name", countryName);
            grCountry.setLimit(1); // Only need one result
            grCountry.query();

            if (grCountry.next()) {
              countryCode = grCountry.getValue("iso3166_2") || "US";
            }
          }

          var stateCode = stateName;

          // Only apply state code mapping if recordType is not specified
          if (!recordType) {
            var sys_property = "stripe_state_code";
            var mappingJSON = gs.getProperty(sys_property, "{}");
            var mapping = {};

            try {
              mapping = JSON.parse(mappingJSON);
              if (mapping[countryCode] && mapping[countryCode][stateName]) {
                stateCode = mapping[countryCode][stateName];
              }
            } catch (e) {
              gs.warn("Invalid JSON in sys_property: " + sys_property);
            }
          }

          data.address = {
            line1: grCA.getValue("street") || "",
            city: grCA.getValue("city") || "",
            state: stateCode || "",
            postal_code: grCA.getValue("zip") || "",
            country: countryCode,
          };
        } else {
          gs.warn("Customer account not found for sys_id: " + customerSysId);
          data.error = "Customer record not found";
        }
      }
    } else {
      // Handle case when record is not found
      gs.warn(
        "Transaction history record not found for sys_id: " + recordSysId
      );
      data.error = "Transaction history record not found";
    }
  }

  // Call the common function
  loadTransactionHistoryData();
})();
