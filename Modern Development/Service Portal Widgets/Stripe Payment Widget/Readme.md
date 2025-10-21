# 💳 Stripe Payment Widget for ServiceNow Service Portal

### Overview

The **Stripe Payment Widget** enables secure and modern payment experiences directly inside the **ServiceNow Service Portal** using **Stripe.js v3**.  
It supports one-time payments and subscription flows, with integrated address fields, real-time validation, and full Stripe Element styling.

Built entirely using **client**, **server**, and **HTML/CSS** components — this widget can be plugged into any portal page to accept payments or donations seamlessly.

---

### ✨ Features

- 🔐 Powered by **Stripe.js v3** (secure, PCI-compliant)
- 🧾 Supports **PaymentIntent** and **Subscription** flows
- 🌍 Includes **Address Element** and live validation
- 💬 Displays dynamic messages and status indicators
- 💅 Modern, responsive design using Tailwind-like CSS
- ⚙️ Fully compatible with ServiceNow **Service Portal widgets**
- 🔒 No card details ever stored in ServiceNow

---

### 🧩 Folder Structure

| File Name                    | Description                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------------- |
| `Readme.md`                  | Project documentation                                                                        |
| `Stripe_Payment_html`        | Widget HTML template                                                                         |
| `Stripe_Payment_css`         | Widget styling (responsive modern design)                                                    |
| `Stripe_Payment_client_code` | AngularJS client controller with Stripe.js logic                                             |
| `Stripe_Payment_server_code` | Server script handling secure backend processing via `StripePaymentProcessor` Script Include |

---

### 🧰 Technical Dependencies

- **ServiceNow Instance** with Service Portal enabled
- **Stripe API Key** stored in a system property:
  - Property Name → `stripe_element_key`
  - Example Value → `pk_test_51Nxxxxx`
- **Script Include**: `StripePaymentProcessor`  
  Handles backend communication with Stripe API securely.

---

### ⚙️ Installation Steps

1. Create a **new Service Portal Widget** in your instance.
2. Copy each file’s content into its respective section:
   - HTML → Widget HTML
   - CSS → Widget CSS
   - Client Script → Widget Client Controller
   - Server Script → Widget Server Script
3. Add a system property:
   - Name: `stripe_element_key`
   - Value: Your Stripe Publishable Key
4. Add the widget to a portal page (like `/checkout` or `/donate`).
5. (Optional) Create Script Include: `StripePaymentProcessor` to handle backend API calls.

---

### 💳 Example Use Cases

- 🎗️ Donation collection for NGOs / non-profits
- 🧾 Subscription renewal systems
- 🛒 Checkout page for internal app store
- 💼 Invoice or expense reimbursement payment portals

---

### 🧠 Future Enhancements

- Support **Apple Pay** and **Google Pay**
- Add **multi-currency** and **tax calculation**
- Enable **webhook-based status sync**
- Dashboard to track transactions and refunds

---

### 🧑‍💻 Author

**Abhishek Aggarwal**  
ServiceNow Developer | Hacktoberfest 2025 Contributor  
🌐 [GitHub Profile](https://github.com/abhishek-aggarwal)

---

### 🏷️ Tags

`ServiceNow` `ServicePortal` `Stripe` `Hacktoberfest` `Widget` `Payment Integration` `Donation`
