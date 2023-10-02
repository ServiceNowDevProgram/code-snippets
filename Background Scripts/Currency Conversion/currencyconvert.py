import requests
base_url = "https://api.example.com/currency-converter"
params = {
    "from_currency": "EUR",
    "to_currency": "USD",
    "amount": 100
}
response = requests.get(base_url, params=params)
if response.status_code == 200:
    data = response.json()
    converted_amount = data["converted_amount"]
    print(f"Converted amount: {converted_amount}")
else:
    print(f"API call failed with status code: {response.status_code}")
