
# Client Script - Set Price type field to only one currency

In a multi currecny enabled servicenow environment, if you have a requirement to enable only one currency choice for a particular table and field of type Price.

## Usage

- Create a new client script
- Set the type to OnLoad.
- Copy the script to your client script.
- Update the <price_field> in the client script to 'Your field name'
- Add your currency code and symbol in place of USD & $
- Save