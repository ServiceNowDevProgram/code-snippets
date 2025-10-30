# Currency Conversion- Using CurrencyFreaks API
## Overview
This API allows to convert an amount from USD to any selected currency in real-time using live exchange rates fetched from the CurrencyFreaks API.

## Configuration Steps
### Get Your CurrencyFreaks API Key
1. Go to https://currencyfreaks.com
2. Sign up for a free account.
3. Navigate to Dasboard ->API Keys.
4. Copy your API key - you'll need it in ServiceNow.

### Create a REST Message in ServiceNow
- Name: CurrencyFreaks API
- Endpoint: https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apikey}&symbols=${symbols}
- HTTP Method: GET

### Example Response
```json
{"date":"2025-10-30 00:00:00+00","base":"USD","rates":{"EUR":"0.861846","SAR":"3.7502","KWD":"0.30678","INR":"88.4075"}}
