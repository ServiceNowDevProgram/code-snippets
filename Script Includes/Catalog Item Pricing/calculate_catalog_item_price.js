var calculateCatalogItemPrice = Class.create();
/**
 * Helper class for dealing with catalogs Item Pricing.
 * @class calculateCatalogItemPrice
 * @author ankit shukla 
 */
calculateCatalogItemPrice.prototype = {
    initialize: function() {
    },
    /**
     * Returns the final price for the catalog.
     *
     * @param {catalogItem} Represents the base catalog item record.
     * @return {integer} rwhich represents the final calculated price of the catalog item.
     */
    calculatePrice: function(catalogItem, currentItem) {
        var basePrice = catalogItem.price;
        var finalPrice = basePrice;

        // Get system properties for dynamic pricing configuration
        var enterpriseDiscount = gs.getProperty('catalog_item_enterprise_discount'); // Discount for Enterprise customers
        var quantityDiscountThreshold = gs.getProperty('catalog_item_quantity_discount_threshold'); // Quantity threshold for discount
        var quantityDiscountPercentage = gs.getProperty('catalog_item_quantity_discount_percentage'); // Discount percentage for qualifying quantities
        var installationCost = gs.getProperty('catalog_item_installation_cost'); // Cost of installation service

        // Apply discounts based on customer type
        if (currentItem.customer.type == 'Enterprise') {
            finalPrice = finalPrice * (1 - enterpriseDiscount); // Apply Enterprise discount
        }

        // Apply quantity-based discounts
        if (currentItem.quantity > quantityDiscountThreshold) {
            finalPrice = finalPrice * (1 - quantityDiscountPercentage); // Apply quantity-based discount
        }

        // Add costs for additional services
        if (currentItem.additional_services.includes('Installation')) {
            finalPrice += installationCost; // Add installation cost
        }

        // Set the final price on the current item
        currentItem.price = finalPrice;
        currentItem.update();

        return finalPrice;
    }
};
