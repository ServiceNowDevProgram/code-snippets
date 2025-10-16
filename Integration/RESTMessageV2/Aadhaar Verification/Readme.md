# Aadhaar Integration - ServiceNow Integration

A **production-ready ServiceNow Script Include** for **Aadhaar verification** and **eKYC**, utilizing a **Connection & Credential Alias** for secure, secret-free integration.

⚠️ **Compliance Warning:** Adherence to **UIDAI regulations**, the **IT Act**, **DPDP**, and your provider's terms is mandatory. Always obtain **explicit user consent** before performing any verification.

---

## 🎯 Key Features

This script provides a complete flow for secure Aadhaar integration:

| Feature                | Methods                    | Description                                                                      |
| :--------------------- | :------------------------- | :------------------------------------------------------------------------------- |
| **OTP eKYC Flow**      | `sendOtp()`, `verifyOtp()` | Multi-step process with built-in session management (expiry, replay protection). |
| **Demographic Check**  | `verifyDemographic()`      | Verify identity (Name, DOB, Gender) _without_ OTP. Returns a match score.        |
| **Document Retrieval** | `getDocument()`            | Downloads Aadhaar XML/PDF (supports encrypted documents).                        |
| **Status Tracking**    | `checkStatus()`            | Queries the status of any ongoing verification session.                          |

### 🔒 Security & Compliance Built-in

- **No Hardcoded Secrets:** Uses **Connection & Credential Alias** (`aadhaar_api`).
- **Data Masking:** Hides Aadhaar/mobile numbers in logs (e.g., `XXXX-XXXX-1234`).
- **Audit Logging:** Comprehensive logging of purpose, actor, consent, and outcome.
- **Consent Tracking:** Persistent tracking of the user's consent statement and timestamp.

---

## 🛠️ Setup & Configuration

1.  **Create Connection & Credential Alias:**

    - **Name:** `aadhaar_api` (or your chosen alias).
    - **Base URL:** Your provider's base endpoint (`https://api.provider.tld`).
    - **Auth:** Configure credentials (API Key, OAuth, Basic) as per your provider.

2.  **Configure Endpoints (In Script):** Map your provider's API paths inside the Script Include:
    ```javascript
    var endpoints = {
      otpSend: "/aadhaar/otp/send",
      otpVerify: "/aadhaar/otp/verify",
      // ... and others
    };
    ```
3.  **Set Timeouts & Retries:** Configure `timeoutMs` (default 8000) and `retries` (default 2) to manage reliability.

---

## 🚀 Usage Examples

Use from a **Background Script** or any server-side logic:

```javascript
var sa = new SmartAadhaar();

// 1. Send OTP & Get Session ID
var s1 = sa.sendOtp({
  uid: "123412341234",
  purpose: "eKYC for onboarding",
  consent: true,
});

// 2. Verify OTP (using session_id from s1)
var s2 = sa.verifyOtp({
  uid: "123412341234",
  otp: "123456",
  session_id: s1.data.session_id,
});
if (s2.ok) {
  gs.info("eKYC success for: " + s2.data.name);
}
```

## API Reference

All methods return a normalized envelope:
`{ ok:Boolean, code:Number, message:String, data:Object }`

| Method                 | Purpose                   | Required Parameters            |
| :--------------------- | :------------------------ | :----------------------------- |
| `sendOtp(p)`           | Initiate OTP flow         | `uid`, `purpose`, `consent`    |
| `verifyOtp(p)`         | Verify OTP and fetch eKYC | `uid`, `otp`, `session_id`     |
| `verifyDemographic(p)` | Demographic match w/o OTP | `uid`, `name`, `dob`, `gender` |
