# CustomCurrencyUtils

## Purpose

`CustomCurrencyUtils.js` provides utility functions for handling custom currency operations within your application. It facilitates formatting, parsing, and conversion of currency values, supporting both standard and custom currency types. These utilities help ensure consistency and accuracy when displaying or processing monetary values, especially in scenarios involving multiple currencies are enabled.

## Usefulness

- Centralizes currency-related logic, reducing code duplication.
- Simplifies integration of custom currencies by abstracting formatting and conversion details.
- Enhances maintainability by providing a single location for currency utilities.
- Improves user experience by ensuring currency values are presented clearly and consistently.

## Usage

1. **Get Currency value in reference currency:**
    ```js
    var ref_currency = new CustomCurrencyUtils().getReferenceValue('<sys_id>', '<your_field>');
    ```