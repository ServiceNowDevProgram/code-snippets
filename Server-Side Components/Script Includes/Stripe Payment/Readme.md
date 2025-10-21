# ⚙️ StripePaymentProcessor Script Include

### Overview

The **StripePaymentProcessor** Script Include provides a complete backend integration between **ServiceNow** and **Stripe**, supporting both **one-time payments** and **subscriptions**.

It’s designed to work seamlessly with the **Stripe Payment Widget** — together forming a full ServiceNow–Stripe payment ecosystem.

---

### 🧩 Features

- 💳 Create and confirm **Stripe PaymentIntents**
- 🔁 Create and manage **Stripe Subscriptions**
- 🧠 Auto-link **PaymentMethods** with customers
- 💬 Update `u_transaction_history` and webhook logs automatically
- 🔒 Securely interacts with the Stripe API via REST
- 🌐 Fully dynamic REST message creation — no need for integrations in UI

---

### 📁 Folder Structure

| File                               | Purpose                                                 |
| ---------------------------------- | ------------------------------------------------------- |
| `Script.js`                        | Full Script Include XML definition                      |
| (Optional) `Stripe_Payment_Widget` | UI widget that calls this backend for creating payments |

---

### ⚙️ Installation Steps

1. Import the Script Include XML:  
   Navigate to **System Update Sets → Retrieved Update Sets → Import**  
   and upload `sys_script_include_0a4e750983796e10cf0977447daad3a1.xml`.

2. Create or update a **System Property**:

   - Name: `stripe_payment_key`
   - Value: your Stripe **secret key** (`sk_live_...` or `sk_test_...`)

3. (Optional) Install the **Stripe Payment Widget** from your companion repo or PR.

4. Link the widget to this processor by calling:
   ```js
   var processor = new global.StripePaymentProcessor();
   var result = processor.createPaymentIntent({
     payment_method_id: "pm_123",
     amount: 2500,
     currency: "usd",
     metadata: { description: "Test Payment" },
   });
   ```

### 🔗 Integration Path

For a working demo, navigate to:
Service Portal Page: /sp?id=stripe_payment_checkout
→ This page contains the Stripe Payment Widget
→ On submit, it triggers the StripePaymentProcessor backend call.

🧠 Example Usage (Client → Server)

In your widget’s Server Script:

```
(function() {
    var processor = new global.StripePaymentProcessor();
    data.result = processor.createPaymentIntent(input);
})();

```

In Client Script (Angular Controller):

```
c.server.get({ payment_method_id: pm.id, amount: 1999 })
  .then(function(response) {
    console.log('Payment Intent:', response.data.result);
  });

```

### 🧰 Technical Details

Script Type: Script Include

API: global.StripePaymentProcessor

Scope: Global

Callable from: Server-side only (not client callable)

Dependencies: sn_ws.RESTMessageV2, u_transaction_history, Stripe Secret Key
