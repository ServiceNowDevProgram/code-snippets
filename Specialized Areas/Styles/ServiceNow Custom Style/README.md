


# ServiceNow Custom Styles

This README explains how to apply the custom styles defined in `style.css` to your ServiceNow instance.

## How to Apply Styles

### 1. Create a UI Script:

- Navigate to **System UI > UI Scripts** in your ServiceNow instance.
- Create a new **UI Script**.
- Name it something like `CustomStyles`.
- Set **Global** to `true` if you want these styles available globally.

### 2. Add the CSS:

- Copy the contents of `style.css` into the UI Script's "Script" field.
- Wrap the CSS in a `<style>` tag:

```javascript
(function() {
  var style = document.createElement('style');
  style.innerHTML = `
    // Paste the entire contents of style.css here
  `;
  document.head.appendChild(style);
})();
```

### 3. Apply to Specific Pages:

- To apply these styles to specific pages, add the UI Script to the required pages or modules.

## Usage Examples

### Custom Button:

```html
<button class="custom-button">Click me</button>
```

### Custom Input:

```html
<input type="text" class="custom-input" placeholder="Enter text...">
```

### Custom Table:

```html
<table class="custom-table">
  <tr>
    <th>Header 1</th>
    <th>Header 2</th>
  </tr>
  <tr>
    <td>Row 1, Cell 1</td>
    <td>Row 1, Cell 2</td>
  </tr>
</table>
```

### Custom Alert:

```html
<div class="custom-alert">This is an alert message!</div>
<div class="custom-alert success">This is a success message!</div>
<div class="custom-alert info">This is an info message!</div>
<div class="custom-alert warning">This is a warning message!</div>
```

## Important Note

- Remember to test these styles in a non-production environment before applying them to your live ServiceNow instance.
```

This Markdown version organizes the instructions and code snippets effectively for easy reading and application.
