/**
 * Name: Aadhaar
 * Purpose: Complete Aadhaar verification wrapper via REST using Connection & Credential Alias
 *
 * Features:
 *  - Send OTP to Aadhaar-linked mobile
 *  - Verify OTP and retrieve eKYC data
 *  - Demographic verification (name, DOB, gender)
 *  - Document download/retrieval
 *  - Session management
 *  - Rate limiting protection
 *  - Comprehensive error handling
 *
 * Setup:
 *  1. Create Connection & Credential Alias: 'aadhaar_api'
 *  2. Configure base endpoint (e.g., https://api.provider.com/v1)
 *  3. Add API key/token in credential
 *  4. Adjust paths based on your provider's API specification
 *
 * Security Notes:
 *  - Never log sensitive data (OTP, full Aadhaar, personal info)
 *  - Use encrypted fields for storing verification results
 *  - Implement proper ACLs on tables using this script
 *  - Audit all verification attempts
 */

var Aadhaar = Class.create();
Aadhaar.prototype = {
  initialize: function () {
    this.alias = "aadhaar_api";
    this.timeoutMs = 15000;
    this.retries = 2;
    this.sessionStore = {};

    // API endpoints - adjust based on your provider
    this.endpoints = {
      sendOtp: "/aadhaar/otp/send",
      verifyOtp: "/aadhaar/otp/verify",
      verifyDemo: "/aadhaar/demographic/verify",
      getDocument: "/aadhaar/document/download",
      checkStatus: "/aadhaar/status",
    };

    // Validation patterns
    this.patterns = {
      aadhaar: /^[2-9]{1}[0-9]{11}$/,
      mobile: /^[6-9]\d{9}$/,
      otp: /^\d{6}$/,
      dob: /^\d{4}-\d{2}-\d{2}$/,
      gender: /^(M|F|O)$/i,
    };
  },

  /**
   * Step 1: Send OTP to Aadhaar-linked mobile number
   * @param {Object} params
   *   - uid: Aadhaar number (12 digits)
   *   - captcha: Optional captcha if required by provider
   *   - consentGiven: Boolean, must be true
   * @returns {Object} { ok, code, message, data: { txnId, mobile, validUntil } }
   */
  sendOtp: function (params) {
    try {
      params = params || {};

      // Input validation
      if (!params.uid) {
        return this._err("Aadhaar number is required", 400);
      }

      if (!params.consentGiven) {
        return this._err(
          "User consent is required for Aadhaar verification",
          403
        );
      }

      var uid = this._sanitizeAadhaar(params.uid);
      if (!this.patterns.aadhaar.test(uid)) {
        return this._err("Invalid Aadhaar number format", 400);
      }

      var payload = {
        aadhaar_number: uid,
        consent: "Y",
        timestamp: new GlideDateTime().getDisplayValue(),
      };

      if (params.captcha) {
        payload.captcha = String(params.captcha);
      }

      // Make API call with retry logic
      var result = this._executeWithRetry(
        "POST",
        this.endpoints.sendOtp,
        payload
      );

      if (result.ok) {
        var responseData = result.data || {};

        // Store session info (transaction ID)
        var txnId =
          responseData.transaction_id ||
          responseData.txnId ||
          responseData.txn_id;
        if (txnId) {
          this._storeSession(txnId, {
            uid: this._maskAadhaar(uid),
            createdAt: new GlideDateTime().getNumericValue(),
            stage: "otp_sent",
          });
        }

        // Audit log
        this._auditLog("OTP_SENT", uid, true, txnId);

        return {
          ok: true,
          code: result.code,
          message: "OTP sent successfully",
          data: {
            txnId: txnId,
            mobile: this._maskMobile(responseData.mobile || responseData.phone),
            validUntil: responseData.valid_until || responseData.otpExpiry,
            message: responseData.message || "OTP sent to registered mobile",
          },
        };
      }

      this._auditLog("OTP_SEND_FAILED", uid, false);
      return result;
    } catch (e) {
      gs.error("[Aadhaar] sendOtp error: " + e);
      return this._err("Error sending OTP: " + e, 500);
    }
  },

  /**
   * Step 2: Verify OTP and retrieve eKYC data
   * @param {Object} params
   *   - txnId: Transaction ID from sendOtp
   *   - otp: 6-digit OTP
   *   - shareCode: Optional share code for offline verification
   * @returns {Object} { ok, code, message, data: { verified, kycData, documentUrl } }
   */
  verifyOtp: function (params) {
    try {
      params = params || {};

      // Input validation
      if (!params.txnId) {
        return this._err("Transaction ID is required", 400);
      }

      if (!params.otp) {
        return this._err("OTP is required", 400);
      }

      var otp = String(params.otp).replace(/\D/g, "");
      if (!this.patterns.otp.test(otp)) {
        return this._err("Invalid OTP format. Must be 6 digits", 400);
      }

      // Check session
      var session = this._getSession(params.txnId);
      if (!session) {
        return this._err("Invalid or expired transaction", 404);
      }

      var payload = {
        transaction_id: params.txnId,
        otp: otp,
        timestamp: new GlideDateTime().getDisplayValue(),
      };

      if (params.shareCode) {
        payload.share_code = String(params.shareCode);
      }

      // Make API call
      var result = this._executeWithRetry(
        "POST",
        this.endpoints.verifyOtp,
        payload
      );

      if (result.ok) {
        var responseData = result.data || {};

        // Update session
        this._updateSession(params.txnId, {
          stage: "otp_verified",
          verifiedAt: new GlideDateTime().getNumericValue(),
        });

        // Parse eKYC data
        var kycData = this._parseKycData(
          responseData.kyc || responseData.data || responseData
        );

        // Audit log (without sensitive data)
        this._auditLog("OTP_VERIFIED", session.uid, true, params.txnId);

        return {
          ok: true,
          code: result.code,
          message: "OTP verified successfully",
          data: {
            verified: true,
            txnId: params.txnId,
            kycData: kycData,
            documentUrl: responseData.document_url || responseData.documentUrl,
            verificationTimestamp: new GlideDateTime().getDisplayValue(),
          },
        };
      }

      this._auditLog("OTP_VERIFY_FAILED", session.uid, false, params.txnId);
      this._clearSession(params.txnId);
      return result;
    } catch (e) {
      gs.error("[Aadhaar] verifyOtp error: " + e);
      return this._err("Error verifying OTP: " + e, 500);
    }
  },

  /**
   * Alternative: Demographic Verification (without OTP)
   * Verifies Aadhaar details against provided demographic information
   * @param {Object} params
   *   - uid: Aadhaar number
   *   - name: Full name
   *   - dob: Date of birth (YYYY-MM-DD)
   *   - gender: M/F/O
   *   - pincode: Optional 6-digit pincode
   * @returns {Object} { ok, code, message, data: { matched, score, details } }
   */
  verifyDemographic: function (params) {
    try {
      params = params || {};

      // Input validation
      var validationResult = this._validateDemographicParams(params);
      if (!validationResult.valid) {
        return this._err(validationResult.message, 400);
      }

      var uid = this._sanitizeAadhaar(params.uid);

      var payload = {
        aadhaar_number: uid,
        name: this._sanitizeName(params.name),
        dob: params.dob,
        gender: params.gender.toUpperCase(),
        consent: "Y",
        timestamp: new GlideDateTime().getDisplayValue(),
      };

      if (params.pincode && /^\d{6}$/.test(params.pincode)) {
        payload.pincode = params.pincode;
      }

      // Make API call
      var result = this._executeWithRetry(
        "POST",
        this.endpoints.verifyDemo,
        payload
      );

      if (result.ok) {
        var responseData = result.data || {};

        // Audit log
        this._auditLog("DEMO_VERIFIED", uid, true);

        return {
          ok: true,
          code: result.code,
          message: "Demographic verification completed",
          data: {
            matched:
              responseData.match === true || responseData.status === "matched",
            score: responseData.match_score || responseData.score || 0,
            details: {
              nameMatch: responseData.name_match,
              dobMatch: responseData.dob_match,
              genderMatch: responseData.gender_match,
              addressMatch: responseData.address_match,
            },
            verificationId: responseData.verification_id || responseData.ref_id,
            timestamp: new GlideDateTime().getDisplayValue(),
          },
        };
      }

      this._auditLog("DEMO_VERIFY_FAILED", uid, false);
      return result;
    } catch (e) {
      gs.error("[Aadhaar] verifyDemographic error: " + e);
      return this._err("Error in demographic verification: " + e, 500);
    }
  },

  /**
   * Download/Retrieve Aadhaar Document (XML/PDF)
   * @param {Object} params
   *   - txnId: Transaction ID from successful verification
   *   - format: 'xml' or 'pdf' (default: 'xml')
   *   - password: Optional password for encrypted document
   * @returns {Object} { ok, code, message, data: { documentId, downloadUrl, format } }
   */
  getDocument: function (params) {
    try {
      params = params || {};

      if (!params.txnId) {
        return this._err("Transaction ID is required", 400);
      }

      var session = this._getSession(params.txnId);
      if (!session || session.stage !== "otp_verified") {
        return this._err("Invalid transaction or OTP not verified", 403);
      }

      var format = (params.format || "xml").toLowerCase();
      if (!["xml", "pdf"].includes(format)) {
        return this._err('Invalid format. Use "xml" or "pdf"', 400);
      }

      var payload = {
        transaction_id: params.txnId,
        format: format,
        timestamp: new GlideDateTime().getDisplayValue(),
      };

      if (params.password) {
        payload.password = params.password;
      }

      var result = this._executeWithRetry(
        "POST",
        this.endpoints.getDocument,
        payload
      );

      if (result.ok) {
        var responseData = result.data || {};

        this._auditLog("DOCUMENT_RETRIEVED", session.uid, true, params.txnId);

        return {
          ok: true,
          code: result.code,
          message: "Document retrieved successfully",
          data: {
            documentId: responseData.document_id || responseData.docId,
            downloadUrl: responseData.download_url || responseData.url,
            format: format,
            expiresAt: responseData.expires_at || responseData.expiry,
            size: responseData.size,
            checksum: responseData.checksum,
          },
        };
      }

      return result;
    } catch (e) {
      gs.error("[Aadhaar] getDocument error: " + e);
      return this._err("Error retrieving document: " + e, 500);
    }
  },

  /**
   * Check verification status
   * @param {String} txnId - Transaction ID
   * @returns {Object} Status information
   */
  checkStatus: function (txnId) {
    try {
      if (!txnId) {
        return this._err("Transaction ID is required", 400);
      }

      var session = this._getSession(txnId);
      if (!session) {
        return this._err("Transaction not found or expired", 404);
      }

      var payload = {
        transaction_id: txnId,
      };

      var result = this._executeWithRetry(
        "GET",
        this.endpoints.checkStatus + "/" + txnId,
        null
      );

      if (result.ok) {
        return {
          ok: true,
          code: result.code,
          message: "Status retrieved",
          data: {
            txnId: txnId,
            stage: session.stage,
            status: result.data.status,
            createdAt: new GlideDateTime(session.createdAt).getDisplayValue(),
            lastUpdated: result.data.updated_at,
          },
        };
      }

      return result;
    } catch (e) {
      gs.error("[Aadhaar] checkStatus error: " + e);
      return this._err("Error checking status: " + e, 500);
    }
  },

  // ========== UTILITY METHODS ==========

  /**
   * Execute HTTP request with retry logic
   */
  _executeWithRetry: function (method, path, bodyObj) {
    var attempt = 0;
    var lastError;

    while (attempt <= this.retries) {
      attempt++;

      try {
        var response = this._makeRequest(method, path, bodyObj);
        var code = response.status;

        if (code >= 200 && code < 300) {
          var body = this._safeParse(response.body);
          return { ok: true, code: code, message: "success", data: body };
        }

        // Client errors - don't retry
        if (code >= 400 && code < 500 && ![429].includes(code)) {
          var errorBody = this._safeParse(response.body);
          return this._err(
            errorBody.message || errorBody.error || "API error",
            code,
            errorBody
          );
        }

        // Server errors or rate limit - retry
        if ([429, 500, 502, 503, 504].includes(code)) {
          lastError = { code: code, body: response.body };
          if (attempt > this.retries) {
            return this._err("Service temporarily unavailable", code);
          }
        } else {
          return this._err("Unexpected response code: " + code, code);
        }
      } catch (e) {
        lastError = e;
        if (attempt > this.retries) {
          return this._err("Request failed: " + e, 0);
        }
      }

      // Exponential backoff
      if (attempt <= this.retries) {
        gs.sleep(this._backoff(attempt));
      }
    }

    return this._err("Failed after " + (this.retries + 1) + " attempts", 0);
  },

  /**
   * Make HTTP request
   */
  _makeRequest: function (method, path, bodyObj) {
    var r = new sn_ws.RESTMessageV2();
    r.setHttpMethod(method.toUpperCase());
    r.setEndpoint(this._resolveEndpoint(path));
    r.setRequestHeader("Content-Type", "application/json");
    r.setRequestHeader("Accept", "application/json");
    r.setEccParameter("skip_sensor", true);

    if (bodyObj && method.toUpperCase() !== "GET") {
      r.setRequestBody(JSON.stringify(bodyObj));
    }

    r.setHttpTimeout(this.timeoutMs);
    r.setAuthenticationProfile("connection_alias", this.alias);

    var res = r.execute();
    return {
      status: res.getStatusCode(),
      body: res.getBody(),
      headers: res.getHeaders(),
    };
  },

  /**
   * Resolve endpoint path
   */
  _resolveEndpoint: function (path) {
    if (!path || path.charAt(0) !== "/") {
      path = "/" + (path || "");
    }
    return path;
  },

  /**
   * Validate demographic parameters
   */
  _validateDemographicParams: function (params) {
    if (!params.uid) {
      return { valid: false, message: "Aadhaar number is required" };
    }

    if (!params.name || params.name.trim().length < 2) {
      return { valid: false, message: "Valid name is required" };
    }

    if (!params.dob || !this.patterns.dob.test(params.dob)) {
      return { valid: false, message: "Valid DOB required (YYYY-MM-DD)" };
    }

    if (!params.gender || !this.patterns.gender.test(params.gender)) {
      return { valid: false, message: "Valid gender required (M/F/O)" };
    }

    var uid = this._sanitizeAadhaar(params.uid);
    if (!this.patterns.aadhaar.test(uid)) {
      return { valid: false, message: "Invalid Aadhaar number format" };
    }

    return { valid: true };
  },

  /**
   * Parse and standardize KYC data
   */
  _parseKycData: function (rawData) {
    if (!rawData) return null;

    return {
      name: rawData.name || rawData.full_name,
      dob: rawData.dob || rawData.date_of_birth,
      gender: rawData.gender || rawData.sex,
      address: {
        line1: rawData.address_line1 || rawData.house,
        line2: rawData.address_line2 || rawData.street,
        city: rawData.city || rawData.vtc,
        district: rawData.district || rawData.dist,
        state: rawData.state || rawData.state_name,
        pincode: rawData.pincode || rawData.zip,
        country: rawData.country || "India",
      },
      photo: rawData.photo || rawData.photo_base64,
      email: rawData.email,
      mobile: rawData.mobile || rawData.phone,
      aadhaarLastFour: rawData.aadhaar_last_4 || rawData.uid_last_4,
    };
  },

  /**
   * Session management
   */
  _storeSession: function (txnId, data) {
    var key = "aadhaar_session_" + txnId;
    gs.getSession().putProperty(key, JSON.stringify(data));
    this.sessionStore[txnId] = data;
  },

  _getSession: function (txnId) {
    if (this.sessionStore[txnId]) {
      return this.sessionStore[txnId];
    }
    var key = "aadhaar_session_" + txnId;
    var stored = gs.getSession().getProperty(key);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return null;
      }
    }
    return null;
  },

  _updateSession: function (txnId, data) {
    var session = this._getSession(txnId);
    if (session) {
      Object.keys(data).forEach(function (key) {
        session[key] = data[key];
      });
      this._storeSession(txnId, session);
    }
  },

  _clearSession: function (txnId) {
    var key = "aadhaar_session_" + txnId;
    gs.getSession().clearProperty(key);
    delete this.sessionStore[txnId];
  },

  /**
   * Audit logging
   */
  _auditLog: function (action, uid, success, txnId) {
    var log = new GlideRecord("sys_audit");
    log.initialize();
    log.tablename = "aadhaar_verification";
    log.documentkey = txnId || "N/A";
    log.fieldname = "verification_action";
    log.oldvalue = action;
    log.newvalue = success ? "SUCCESS" : "FAILED";
    log.user = gs.getUserID();
    log.insert();

    // Also log to system log (without sensitive data)
    gs.info(
      "[Aadhaar] " +
        action +
        " - " +
        (success ? "Success" : "Failed") +
        " - TxnId: " +
        (txnId || "N/A")
    );
  },

  /**
   * Data sanitization
   */
  _sanitizeAadhaar: function (uid) {
    return String(uid).replace(/\D/g, "").substring(0, 12);
  },

  _sanitizeName: function (name) {
    return String(name)
      .trim()
      .replace(/[^a-zA-Z\s.]/g, "")
      .substring(0, 100);
  },

  _maskAadhaar: function (uid) {
    if (!uid || uid.length < 12) return "XXXX";
    return "XXXX-XXXX-" + uid.substring(8);
  },

  _maskMobile: function (mobile) {
    if (!mobile || mobile.length < 10) return "XXXXXX";
    return "XXXXXX" + mobile.substring(mobile.length - 4);
  },

  /**
   * Common utilities
   */
  _backoff: function (n) {
    return 300 * Math.pow(2, n - 1) + Math.floor(Math.random() * 100);
  },

  _safeParse: function (s) {
    if (!s) return {};
    try {
      return JSON.parse(s);
    } catch (e) {
      return { raw: s };
    }
  },

  _err: function (msg, code, data) {
    return {
      ok: false,
      code: code || 0,
      message: msg,
      data: data || {},
      timestamp: new GlideDateTime().getDisplayValue(),
    };
  },

  type: "Aadhaar",
};

/* ========== USAGE EXAMPLES ==========

// Example 1: Complete OTP-based verification flow
var aadhaar = new Aadhaar();

// Step 1: Send OTP
var otpResult = aadhaar.sendOtp({
  uid: '123456789012',
  consentGiven: true
});

if (otpResult.ok) {
  gs.info('OTP sent to: ' + otpResult.data.mobile);
  var txnId = otpResult.data.txnId;
  
  // Step 2: Verify OTP (after user provides OTP)
  var verifyResult = aadhaar.verifyOtp({
    txnId: txnId,
    otp: '123456'
  });
  
  if (verifyResult.ok) {
    var kycData = verifyResult.data.kycData;
    gs.info('Name: ' + kycData.name);
    gs.info('DOB: ' + kycData.dob);
    
    // Step 3: Download document (optional)
    var docResult = aadhaar.getDocument({
      txnId: txnId,
      format: 'xml'
    });
    
    if (docResult.ok) {
      gs.info('Document URL: ' + docResult.data.downloadUrl);
    }
  }
}

// Example 2: Demographic verification (no OTP)
var demoResult = aadhaar.verifyDemographic({
  uid: '123456789012',
  name: 'John Doe',
  dob: '1990-01-15',
  gender: 'M'
});

if (demoResult.ok && demoResult.data.matched) {
  gs.info('Demographic verification successful');
  gs.info('Match score: ' + demoResult.data.score);
}

// Example 3: Check status
var statusResult = aadhaar.checkStatus(txnId);
if (statusResult.ok) {
  gs.info('Current stage: ' + statusResult.data.stage);
}

*/
