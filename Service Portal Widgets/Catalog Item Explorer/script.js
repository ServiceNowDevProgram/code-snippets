(function () {

    /* Configuration */
    data.isDebugEnabled = (options.is_debug_mode_on === "true");
    data.showCopyright = options.show_copyright === "true" || false;
    data.showAllMsg = gs.getMessage(options.show_all_items_category_label) || gs.getMessage("All");
    data.defaultCatalogLink = options.default_item_link ||"?id=sc_cat_item&sys_id=";
    data.itemsPerPage = $sp.getParameter("items_per_page") || options.items_per_page || 10;
    data.maxPagesInPaginator = options.max_pages_in_paginator || 4;
    data.showBoundaryLinks = (options.show_boundary_links_in_paginator === "true") || false;
    data.widgetTitle = options.widget_title || "Catalog Item Explorer";

    /* Used to set the default first page for the pagination */
    data.currentPage = 1;    

    /* Messages */
    data.showAllMsg = gs.getMessage(options.show_all_items_category_label) || gs.getMessage("All");
    data.msgQuickSearchPlaceholder = gs.getMessage(options.quick_search_placeholder);
    data.msgDefaultState = gs.getMessage("Widget fields were set back to default");
    data.msgCategoryReset = gs.getMessage("Category selection was reset");

    /* Get Catalog ID */
    var catalogsId = $sp.getParameter("used_catalog") || options.used_catalog;
    
    /* Get all catalog items */
    var catalogItems = new GlideRecordSecure('sc_cat_item');
    catalogItems.addQuery('sc_catalogs', 'IN', catalogsId);
    catalogItems.addQuery('active', true);
    catalogItems.orderBy('name');
    catalogItems.query();

    /* Save all sys_ids and names of catalog items to an array */
    data.catalogItems = [];
    
    /* Declare a variable to host externalUrl */
    var extUrl = "";

    while (catalogItems.next()) {
        if (!$sp.canReadRecord("sc_cat_item", catalogItems.sys_id.getDisplayValue())) {
            continue;
        }

        extUrl = "";        
        if (catalogItems.sys_class_name == "sc_cat_item_content") {
            var contentItemGr = new GlideRecordSecure('sc_cat_item_content');
            contentItemGr.get(catalogItems.getUniqueValue());
            extUrl = contentItemGr.isValidRecord() ? contentItemGr.getValue('url') : "";            
        }

        data.catalogItems.push({
            itemId: catalogItems.getUniqueValue(),
            name: catalogItems.getValue('name'),
            description: catalogItems.getValue('short_description'),
			externalUrl: extUrl
        });
    }

    /* Get first letters to generate categories */
    data.catalogCategories = getUniqueFirstLetters(data.catalogItems);

    function getUniqueFirstLetters(strings) {
        /* Create an empty array to store the first letters */
        var firstLetters = [];

        /* Iterate over the input array of strings */
        for (var i = 0; i < strings.length; i++) {
            /* Get the first letter of the current string */
            var firstLetter = strings[i].name.charAt(0);
            var exists = false;

            /* Check if the letter already exists in the array */
            for (var j = 0; j < firstLetters.length; j++) {
                if (firstLetters[j].letter === firstLetter.toUpperCase()) {
                    exists = true;
                    break;
                }
            }

            /* Check if the first letter already exist in the array */
            if (!exists) {
                /* If not add it */ 
                firstLetters.push({
                    letter: firstLetter,
                    selected: false
                });
            }
        }

        /* Sort the array of objects, otherwise the simplier version of sort might be used */
        firstLetters.sort(function (a, b) {
            return a.letter.localeCompare(b.letter);
        });

        /* Return the sorted array of unique first letters */
        return firstLetters;
    }
})();
