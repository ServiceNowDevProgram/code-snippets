Catalog Item Pricing

Description:
This script includes provides a dynamic and configurable approach to calculating the final price of catalog items in ServiceNow.
It utilizes system properties for pricing parameters, enabling administrators to adjust them without modifying the code itself.

Functionality:

Dynamic Pricing: Retrieves discount and cost values from system properties, offering flexibility in pricing configuration.
Customer Discounts: Applies discounts based on customer type (e.g., Enterprise customers might receive a discount).
Quantity Discounts: Provides discounts for orders exceeding a predefined quantity threshold.
Additional Service Costs: Incorporates costs for additional services selected in the order (e.g., installation fees).
Price Calculation: Calculates the final price by applying discounts and adding any applicable service costs to the base price of the catalog item.
Benefits:

Centralized Configuration: Simplifies management of pricing parameters through system properties.
Flexibility: Adapts to different pricing scenarios by modifying system property values.
User-Friendliness: Empowers administrators to configure pricing rules without code changes.
Improved Efficiency: Streamlines the process of calculating final catalog item prices.
Usage:

Include this script (calculate_catalog_item_price.js) in your desired business rule or workflow.
Pass the catalogItem and currentItem records as arguments to the calculatePrice function.
The function will return the final calculated price.
Example:

JavaScript
// In a business rule or workflow script

var catalogItem = GlideRecord('sc_catalog_item');
catalogItem.get('your_catalog_item_sys_id');

var currentItem = current.sc_catalog_item;

var finalPrice = calculateCatalogItemPrice.calculatePrice(catalogItem, currentItem);

// Use the finalPrice variable for further processing


System Properties:

catalog_item_enterprise_discount: Discount percentage for Enterprise customers (e.g., 0.1 for 10% discount)
catalog_item_quantity_discount_threshold: Minimum quantity required to qualify for a quantity-based discount (e.g., 10)
catalog_item_quantity_discount_percentage: Discount percentage for orders exceeding the threshold (e.g., 0.05 for 5% discount)
catalog_item_installation_cost: Cost of the "Installation" service (e.g., 100)

Additional Notes:
You can extend this script to include additional pricing factors or logic as needed.
Refer to the ServiceNow documentation for more information on system properties and script includes.
