api.controller = function (
  $scope,
  $window,
  $rootScope,
  $timeout,
  $http,
  spUtil
) {
  var c = this;

  // Widget state initialization
  c.stripe = null;
  c.elements = null;
  c.cardNumber = null;
  c.cardExpiry = null;
  c.cardCvc = null;
  c.addressElement = null;
  c.addressData = null;
  c.isProcessing = false;
  c.errorMessage = "";
  c.successMessage = "";
  c.processingMessage = "";
  c.fieldErrors = {
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    address: "",
  };
  c.sessionToken = null;
  c.inactivityTimeout = null;
  c.paymentTimeout = null;
  c.paymentCompleted = false;

  // Constants
  var INACTIVITY_TIMEOUT = 8 * 60 * 1000; // 8 minutes in milliseconds
  var MAIN_PAGE_URL = "?id=home_page_npsm";
  var PAYMENT_SUCCESS_PAGE = "?id=payment_success_page";

  // Utility function for safe Angular apply
  function safeApply(fn) {
    var phase = $scope.$root.$$phase;
    if (phase !== "$apply" && phase !== "$digest") {
      $scope.$apply(fn);
    } else if (fn && typeof fn === "function") {
      fn();
    }
  }

  // Structured logging service (replace with your logging mechanism)
  function logMessage(level, message, data) {
    if ($window.spUtil && spUtil.addInfoMessage) {
      spUtil.addInfoMessage(
        `[${level}] ${message}: ${JSON.stringify(data || {})}`
      );
    }
  }

  // Initialize session token for refresh handling
  function initializeSession() {
    c.sessionToken = $window.sessionStorage.getItem("paymentSessionToken");
    if (!c.sessionToken) {
      c.sessionToken =
        "sess_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
      $window.sessionStorage.setItem("paymentSessionToken", c.sessionToken);
      var params = new URLSearchParams();
      params.set("session", sessionStorage.getItem("paymentSessionToken"));
    }
  }

  // Start inactivity and payment timers
  function startTimers() {
    resetInactivityTimer();
    startPaymentTimer();

    // Reset inactivity timer on user activity
    ["mousemove", "keydown", "touchstart", "scroll"].forEach(function (event) {
      $window.addEventListener(event, resetInactivityTimer, {
        passive: true,
      });
    });
  }

  // Reset inactivity timer
  function resetInactivityTimer() {
    if (c.inactivityTimeout) {
      $timeout.cancel(c.inactivityTimeout);
    }
    c.inactivityTimeout = $timeout(function () {
      endSession("Inactivity timeout after 8 minutes");
    }, INACTIVITY_TIMEOUT);
  }

  // Start payment timer (8 minutes)
  function startPaymentTimer() {
    c.paymentTimeout = $timeout(function () {
      if (!c.paymentCompleted) {
        endSession("Payment not completed within 8 minutes");
      }
    }, INACTIVITY_TIMEOUT);
  }

  // End session and redirect
  function endSession(reason) {
    logMessage("INFO", "Ending session", {
      reason: reason,
    });
    cleanup();
    $window.sessionStorage.removeItem("paymentSessionToken");
    $window.location.href = MAIN_PAGE_URL;
  }

  // Initialize Stripe
  c.initializeStripe = function () {
    return new Promise(function (resolve, reject) {
      if ($window.Stripe) {
        resolve();
        return;
      }
      var script = $window.document.createElement("script");
      script.src = "https://js.stripe.com/v3/";
      script.async = true;
      script.onload = function () {
        logMessage("INFO", "Stripe.js loaded successfully");
        resolve();
      };
      script.onerror = function () {
        logMessage("ERROR", "Failed to load Stripe.js");
        reject(new Error("Failed to load Stripe.js"));
      };
      $window.document.head.appendChild(script);
    });
  };

  // Initialize Stripe Elements
  c.initializeStripeElements = function () {
    try {
      var stripeKey = c.data.stripeKey;
      c.stripe = $window.Stripe(stripeKey);

      var appearance = {
        theme: "stripe",
        variables: {
          colorPrimary: "#667eea",
          colorBackground: "#ffffff",
          colorText: "#374151",
          colorDanger: "#ef4444",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          spacingUnit: "4px",
          borderRadius: "6px",
        },
        rules: {
          ".Input": {
            border: "2px solid #e5e7eb",
            padding: "12px",
            fontSize: "14px",
          },
          ".Input:focus": {
            borderColor: "#667eea",
            boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
          },
        },
      };

      c.elements = c.stripe.elements({
        appearance: appearance,
      });
      c.initializeCardElements();
      c.initializeAddressElement();
    } catch (error) {
      logMessage("ERROR", "Error initializing Stripe elements", {
        error: error.message,
      });
      safeApply(function () {
        c.errorMessage =
          "Error initializing payment form. Please try again later.";
        c.showError(c.errorMessage);
      });
    }
  };

  // Initialize Card Elements
  c.initializeCardElements = function () {
    var cardStyle = {
      base: {
        color: "#374151",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        lineHeight: "24px",
        "::placeholder": {
          color: "#9ca3af",
          fontSize: "14px",
        },
      },
      invalid: {
        color: "#ef4444",
        iconColor: "#ef4444",
      },
      complete: {
        color: "#10b981",
        iconColor: "#10b981",
      },
    };

    c.cardNumber = c.elements.create("cardNumber", {
      style: cardStyle,
      showIcon: true,
    });
    c.cardExpiry = c.elements.create("cardExpiry", {
      style: cardStyle,
    });
    c.cardCvc = c.elements.create("cardCvc", {
      style: cardStyle,
    });

    $timeout(function () {
      c.mountCardElements();
    }, 300);
  };

  // Mount Card Elements
  c.mountCardElements = function () {
    try {
      var elements = [
        {
          element: c.cardNumber,
          id: "stripe-card-number",
          field: "cardNumber",
        },
        {
          element: c.cardExpiry,
          id: "stripe-card-expiry",
          field: "cardExpiry",
        },
        {
          element: c.cardCvc,
          id: "stripe-card-cvc",
          field: "cardCvc",
        },
      ];

      elements.forEach(function (item) {
        var container = $window.document.getElementById(item.id);
        if (container) {
          item.element.mount("#" + item.id);
          c.setupCardElementEvents(item.element, item.field, item.id);
        } else {
          logMessage("ERROR", "Element container not found", {
            id: item.id,
          });
          throw new Error("Element container not found: " + item.id);
        }
      });

      c.attachFormHandler();
    } catch (error) {
      logMessage("ERROR", "Error mounting card elements", {
        error: error.message,
      });
      safeApply(function () {
        c.errorMessage = "Payment form not available. Please refresh the page.";
        c.showError(c.errorMessage);
      });
    }
  };

  // Setup Card Element Event Listeners
  c.setupCardElementEvents = function (element, fieldName, elementId) {
    element.on("change", function (event) {
      safeApply(function () {
        c.fieldErrors[fieldName] = event.error ? event.error.message : "";
        c.displayFieldError(fieldName, c.fieldErrors[fieldName]);
        if (
          !Object.values(c.fieldErrors).some(function (error) {
            return error;
          })
        ) {
          c.errorMessage = "";
          c.clearError();
        }
      });
    });

    element.on("focus", function () {
      var domElement = $window.document.getElementById(elementId);
      if (domElement) {
        domElement.classList.add("focused");
        if (domElement.parentElement) {
          domElement.parentElement.classList.add("field-focused");
        }
      }
    });

    element.on("blur", function () {
      var domElement = $window.document.getElementById(elementId);
      if (domElement) {
        domElement.classList.remove("focused");
        if (domElement.parentElement) {
          domElement.parentElement.classList.remove("field-focused");
        }
      }
    });
  };

  // Initialize Address Element
  c.initializeAddressElement = function () {
    var addressOptions = {
      mode: "billing",
      autocomplete: {
        mode: "automatic",
      },
      fields: {
        phone: "always",
      },
      defaultValues:
        c.data && c.data.address
          ? {
              name: c.data.customer_name || c.data.customerName || "",
              address: {
                line1: c.data.address.line1 || "",
                line2: c.data.address.line2 || "",
                city: c.data.address.city || "",
                state: c.data.address.state || "",
                country: c.data.address.country || "US",
                postal_code: c.data.address.postal_code || "",
              },
              phone: c.data.customer_phone || c.data.customerPhone || "",
            }
          : {},
    };

    c.addressElement = c.elements.create("address", addressOptions);
    document.getElementById("email").value = c.data.user_email || "";
    document.getElementById("cardholder-name").value = c.data.user_name;
    $timeout(function () {
      var container = $window.document.getElementById("address-element");
      if (container) {
        c.addressElement.mount("#address-element");
        c.setupAddressEventListeners();
      } else {
        logMessage("ERROR", "Address element container not found");
        c.errorMessage = "Address form not available. Please refresh the page.";
        c.showError(c.errorMessage);
      }
    }, 400);
  };

  // Setup Address Event Listeners
  c.setupAddressEventListeners = function () {
    c.addressElement.on("change", function (event) {
      safeApply(function () {
        c.fieldErrors.address = event.error ? event.error.message : "";
        c.displayFieldError("address", c.fieldErrors.address);
        if (event.complete && event.value) {
          c.addressData = event.value;
        }
      });
    });
  };

  // Attach Form Handler
  c.attachFormHandler = function () {
    var form = $window.document.getElementById("payment-form");
    if (form) {
      form.removeEventListener("submit", c.handleSubmit);
      form.addEventListener("submit", c.handleSubmit);
    } else {
      logMessage("ERROR", "Payment form not found");
      c.errorMessage = "Payment form not found. Please refresh the page.";
      c.showError(c.errorMessage);
    }
  };

  // Handle Form Submission
  c.handleSubmit = function (event) {
    if (event) {
      event.preventDefault();
    }

    if (c.isProcessing) {
      return;
    }

    if (!$window.confirm("Are you sure you want to submit the payment?")) {
      return;
    }

    safeApply(function () {
      if (!c.isFormValid()) {
        c.errorMessage = "Please complete all required fields.";
        c.showError(c.errorMessage);
        return;
      }

      if (c.hasFieldErrors()) {
        c.errorMessage = "Please correct the errors in the form.";
        c.showError(c.errorMessage);
        return;
      }

      c.isProcessing = true;
      c.updateButtonState(true);
      c.createPaymentMethod();
    });
  };

  // Update Button State
  c.updateButtonState = function (isLoading) {
    var buttonText = $window.document.getElementById("button-text");
    var loadingSpinner = $window.document.getElementById("loading-spinner");
    var submitBtn = $window.document.getElementById("submit-btn");

    if (isLoading) {
      if (buttonText) buttonText.style.display = "none";
      if (loadingSpinner) loadingSpinner.style.display = "inline-block";
      if (submitBtn) submitBtn.disabled = true;
    } else {
      if (buttonText) buttonText.style.display = "inline";
      if (loadingSpinner) loadingSpinner.style.display = "none";
      if (submitBtn) submitBtn.disabled = false;
    }
  };

  // Create Payment Method
  c.createPaymentMethod = function () {
    if (
      !c.stripe ||
      !c.cardNumber ||
      !c.cardExpiry ||
      !c.cardCvc ||
      !c.addressData
    ) {
      c.errorMessage = "Payment form not properly initialized.";
      c.showError(c.errorMessage);
      c.isProcessing = false;
      c.updateButtonState(false);
      c.redirectWithStatus(
        "declined",
        c.subscriptionId,
        c.errorMessage,
        c.recordid
      );
      return;
    }

    c.processingMessage = "Creating payment method...";

    var cardholderName =
      $window.document.getElementById("cardholder-name")?.value?.trim() ||
      c.addressData.name ||
      c.data.customer_name ||
      "Customer";
    var billingDetails = {
      name: cardholderName,
      email: c.data.customer_email || null,
      address: {
        line1: c.addressData.address.line1 || null,
        line2: c.addressData.address.line2 || null,
        city: c.addressData.address.city || null,
        state: c.addressData.address.state || null,
        postal_code: c.addressData.address.postal_code || null,
        country: c.addressData.address.country || "US",
      },
    };

    c.stripe
      .createPaymentMethod({
        type: "card",
        card: c.cardNumber,
        billing_details: billingDetails,
      })
      .then(function (result) {
        safeApply(function () {
          if (result.error) {
            c.errorMessage =
              result.error.message || "Failed to create payment method.";
            c.showError(c.errorMessage);
            c.isProcessing = false;
            c.updateButtonState(false);
            c.redirectWithStatus(
              "declined",
              c.subscriptionId,
              c.errorMessage,
              c.recordid
            );
          } else {
            c.createSubscription(result.paymentMethod);
          }
        });
      })
      .catch(function (error) {
        safeApply(function () {
          c.errorMessage = "Error creating payment method. Please try again.";
          c.showError(c.errorMessage);
          c.isProcessing = false;
          c.updateButtonState(false);
          c.redirectWithStatus(
            "declined",
            c.subscriptionId,
            c.errorMessage,
            c.recordid
          );
        });
      });
  };

  // Create Subscription
  c.createSubscription = function (paymentMethod) {
    c.processingMessage = "Creating subscription...";

    var subscriptionData = {
      payment_method_id: paymentMethod.id,
      recordid: c.data.recordid,
      customer_info: {
        id: c.data.customer_stripeid,
        name: c.addressData.name || c.data.customer_name || "Customer",
        email: c.data.customer_email || null,
      },
      billing_address: c.addressData.address,
      subscription_details: {
        price_id: c.data.priceId || null,
        plan_name: c.data.planName || "Monthly Plan",
        trial_period_days: c.data.trialDays || 0,
      },
      metadata: {
        order_id: c.data.orderId || null,
        description: c.data.description || "ServiceNow Subscription",
        session_token: c.sessionToken,
      },
    };

    c.server
      .get({
        action: "createSubscription",
        subscriptionData: subscriptionData,
      })
      .then(function (response) {
        safeApply(function () {
          var responseData = response?.data?.response?.data;
          if (responseData?.success) {
            c.subscriptionId = responseData.subscription_id;
            if (
              responseData.requires_action &&
              responseData.payment_intent?.id
            ) {
              c.handle3DSecure(responseData.payment_intent);
            } else {
              c.checkFinalPaymentConfirmation(
                responseData.subscription_id,
                responseData.payment_intent?.id
              );
            }
          } else {
            c.errorMessage =
              responseData?.error || "Subscription creation failed.";
            c.showError(c.errorMessage);
            c.isProcessing = false;
            c.updateButtonState(false);
            c.redirectWithStatus(
              "declined",
              c.subscriptionId,
              c.errorMessage,
              c.recordid
            );
          }
        });
      })
      .catch(function (error) {
        safeApply(function () {
          c.errorMessage = "Server error during subscription creation.";
          c.showError(c.errorMessage);
          c.isProcessing = false;
          c.updateButtonState(false);
          c.redirectWithStatus(
            "declined",
            c.subscriptionId,
            c.errorMessage,
            c.recordid
          );
        });
      });
  };

  // Handle 3D Secure Authentication
  c.handle3DSecure = function (paymentIntent) {
    c.processingMessage = "Authenticating payment...";

    c.stripe
      .confirmCardPayment(paymentIntent.client_secret, {
        payment_method: paymentIntent.payment_method,
      })
      .then(function (result) {
        safeApply(function () {
          if (result.error) {
            c.errorMessage =
              result.error.message || "Payment authentication failed.";
            c.showError(c.errorMessage);
            c.isProcessing = false;
            c.updateButtonState(false);
            c.redirectWithStatus(
              "declined",
              c.subscriptionId,
              c.errorMessage,
              c.recordid
            );
          } else if (
            ["succeeded", "processing"].includes(result.paymentIntent.status)
          ) {
            c.checkFinalPaymentConfirmation(
              c.subscriptionId,
              result.paymentIntent.id
            );
          } else {
            c.errorMessage = "Payment could not be confirmed.";
            c.showError(c.errorMessage);
            c.isProcessing = false;
            c.updateButtonState(false);
            c.redirectWithStatus(
              "declined",
              c.subscriptionId,
              c.errorMessage,
              c.recordid
            );
          }
        });
      })
      .catch(function (error) {
        safeApply(function () {
          c.errorMessage = "Error during payment authentication.";
          c.showError(c.errorMessage);
          c.isProcessing = false;
          c.updateButtonState(false);
          c.redirectWithStatus(
            "declined",
            c.subscriptionId,
            c.errorMessage,
            c.recordid
          );
        });
      });
  };

  // Check Final Payment Confirmation
  c.checkFinalPaymentConfirmation = function (subscriptionId, paymentIntentId) {
    c.processingMessage = "Finalizing payment...";

    c.server
      .get({
        action: "checkFinalPaymentConfirmation",
        subscription_id: subscriptionId,
        payment_intent_id: paymentIntentId,
        recordid: c.data.recordid,
      })
      .then(function (response) {
        safeApply(function () {
          var result = response?.data?.response?.data;
          if (result?.success && result.payment_confirmed) {
            c.paymentCompleted = true;
            c.successMessage =
              result.message || "Subscription created successfully!";
            c.showSuccess(c.successMessage);
            c.isProcessing = false;
            c.updateButtonState(false);
            c.clearForm();
            c.redirectWithStatus(
              "MonkeyLampEchoFuzz9RainyTaxiGlueXenonWaltz32GhostPieClapMint",
              subscriptionId,
              "",
              c.recordid
            );
          } else {
            c.errorMessage = result?.error || "Payment confirmation failed.";
            c.showError(c.errorMessage);
            c.isProcessing = false;
            c.updateButtonState(false);
            c.redirectWithStatus(
              "declined",
              subscriptionId,
              c.errorMessage,
              c.recordid
            );
          }
        });
      })
      .catch(function (error) {
        safeApply(function () {
          c.errorMessage = "Error confirming payment.";
          c.showError(c.errorMessage);
          c.isProcessing = false;
          c.updateButtonState(false);
          c.redirectWithStatus(
            "declined",
            subscriptionId,
            c.errorMessage,
            c.recordid
          );
        });
      });
  };

  // Dynamic Redirect
  c.redirectWithStatus = function (status, subscriptionId, errorMessage, rect) {
    var params = new URLSearchParams();
    params.set("status", status);
    params.set("session", sessionStorage.getItem("paymentSessionToken"));
    params.set("fraud_id", c.data.recordid);
    if (subscriptionId) params.set("subscription_id", subscriptionId);
    //if (errorMessage) params.set('error', encodeURIComponent(errorMessage));
    var redirectUrl = PAYMENT_SUCCESS_PAGE + "&" + params.toString();
    $window.location.href = redirectUrl;
  };

  // Error and Success Display
  c.displayFieldError = function (fieldName, message) {
    var errorElementId = {
      cardNumber: "card-number-errors",
      cardExpiry: "card-expiry-errors",
      cardCvc: "card-cvc-errors",
      address: "address-errors",
    }[fieldName];
    var errorElement = $window.document.getElementById(errorElementId);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = message ? "block" : "none";
    }
  };

  c.clearError = function () {
    var errorElement = $window.document.getElementById("card-errors");
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.style.display = "none";
    }
  };

  c.showError = function (message) {
    var errorElement = $window.document.getElementById("card-errors");
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = "block";
    }
    logMessage("ERROR", message);
  };

  c.showSuccess = function (message) {
    var successElement = $window.document.getElementById("success-message");
    if (successElement) {
      successElement.textContent = message;
      successElement.style.display = "block";
    }
    logMessage("INFO", message);
  };

  c.clearForm = function () {
    if (c.cardNumber) c.cardNumber.clear();
    if (c.cardExpiry) c.cardExpiry.clear();
    if (c.cardCvc) c.cardCvc.clear();
    var cardholderNameInput =
      $window.document.getElementById("cardholder-name");
    if (cardholderNameInput) cardholderNameInput.value = "";
    c.fieldErrors = {
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
      address: "",
    };
    c.errorMessage = "";
    c.clearError();
  };

  // Form Validation
  c.isFormValid = function () {
    var cardholderName =
      $window.document.getElementById("cardholder-name")?.value?.trim() || "";
    var email = $window.document.getElementById("email")?.value?.trim() || "";
    return (
      c.stripe &&
      c.cardNumber &&
      c.cardExpiry &&
      c.cardCvc &&
      c.addressData?.address &&
      cardholderName &&
      email &&
      !c.isProcessing
    );
  };

  c.hasFieldErrors = function () {
    return Object.values(c.fieldErrors).some(function (error) {
      return error;
    });
  };

  // Prevent Navigation with Alert
  function handleNavigation(event) {
    if (c.isProcessing || !c.paymentCompleted) {
      event.preventDefault();
      event.returnValue =
        "Payment is in progress. Are you sure you want to leave?";
    }
  }

  // Cleanup
  function cleanup() {
    var form = $window.document.getElementById("payment-form");
    if (form) form.removeEventListener("submit", c.handleSubmit);

    if (c.cardNumber) c.cardNumber.destroy();
    if (c.cardExpiry) c.cardExpiry.destroy();
    if (c.cardCvc) c.cardCvc.destroy();
    if (c.addressElement) c.addressElement.destroy();

    if (c.inactivityTimeout) $timeout.cancel(c.inactivityTimeout);
    if (c.paymentTimeout) $timeout.cancel(c.paymentTimeout);

    ["mousemove", "keydown", "touchstart", "scroll"].forEach(function (event) {
      $window.removeEventListener(event, resetInactivityTimer);
    });

    $window.removeEventListener("beforeunload", handleNavigation);
  }

  // Widget Initialization
  c.$onInit = function () {
    initializeSession();
    startTimers();
    $window.addEventListener("beforeunload", handleNavigation);

    $timeout(function () {
      c.initializeStripe()
        .then(c.initializeStripeElements)
        .catch(function (error) {
          c.errorMessage = "Failed to load payment system.";
          c.showError(c.errorMessage);
          c.redirectWithStatus("declined", null, c.errorMessage);
        });
    }, 100);
  };

  c.handlePaymentMethodSuccess = function (paymentMethod) {
    const paymentData = {
      payment_method_id: paymentMethod.id,
      amount: c.data.amount, // Amount in cents
      currency: c.data.currency || "usd",
      customer_info: {
        id: "cus_STfKPEu4DJT06O",
        name: c.data.customerName || "Customer",
        email: c.data.customerEmail || null,
      },
      metadata: {
        order_id: c.data.orderId || null,
        recordid: "4c9a6f4483526e50cf0977447daad38b",
        description: c.data.description || "ServiceNow Payment",
      },
    };

    c.server
      .get({
        action: "createPaymentIntent",
        paymentData: paymentData,
      })
      .then(function (response) {
        // console.log(response);
        // console.log("Line 256" + response.data.response.success);
        safeApply(function () {
          if (response.data.response.success) {
            // Check if payment requires additional authentication
            if (
              response.data.response.requires_action &&
              response.data.response.client_secret
            ) {
              c.handlePaymentAction(
                response.data.response.client_secret,
                response.data.response.payment_intent_id
              );
            } else if (response.data.response.status === "succeeded") {
              // Payment completed successfully
              c.successMessage = "Payment completed successfully!";
              c.clearForm();
              c.isProcessing = false;
              c.redirectWithStatus(
                "MonkeyLampEchoFuzz9RainyTaxiGlueXenonWaltz32GhostPieClapMint",
                subscriptionId,
                "",
                c.recordid
              );
            } else {
              // Payment is processing
              c.successMessage = "Payment is being processed...";
              c.isProcessing = false;
            }
          } else {
            c.errorMessage =
              response.data.response.error ||
              "Payment failed. Please try again.";
            c.isProcessing = false;
            c.redirectWithStatus(
              "declined",
              subscriptionId,
              c.errorMessage,
              c.recordid
            );
          }
        });
      })
      .catch(function (error) {
        // console.error("Server error:", error);
        safeApply(function () {
          c.errorMessage = "Server error. Please try again.";
          c.isProcessing = false;
          c.redirectWithStatus(
            "declined",
            subscriptionId,
            c.errorMessage,
            c.recordid
          );
        });
      });
  };

  // Updated handlePaymentAction for 3D Secure
  c.handlePaymentAction = function (clientSecret, paymentIntentId) {
    c.stripe
      .confirmCardPayment(clientSecret)
      .then(function (result) {
        safeApply(function () {
          if (result.error) {
            c.errorMessage = result.error.message;
          } else {
            // Payment confirmed successfully
            c.successMessage =
              "Payment confirmed successfully! Payment ID: " + paymentIntentId;
            c.clearForm();
            c.redirectWithStatus(
              "MonkeyLampEchoFuzz9RainyTaxiGlueXenonWaltz32GhostPieClapMint",
              subscriptionId,
              "",
              c.recordid
            );
            // Optional: Notify server that payment was confirmed
            c.server.get({
              action: "confirmPaymentSuccess",
              payment_intent_id: paymentIntentId,
            });
          }
          c.isProcessing = false;
        });
      })
      .catch(function (error) {
        // console.error("Payment confirmation error:", error);
        safeApply(function () {
          c.errorMessage = "Payment confirmation failed. Please try again.";
          c.isProcessing = false;
          c.redirectWithStatus(
            "declined",
            subscriptionId,
            c.errorMessage,
            c.recordid
          );
        });
      });
  };

  // Widget Cleanup
  c.$onDestroy = cleanup;

  $scope.$on("$destroy", cleanup);
};
