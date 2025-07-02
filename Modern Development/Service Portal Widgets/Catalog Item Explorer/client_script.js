api.controller = function ($scope, $window) {
  /* widget controller */
  var c = this;

  /* Variable and Service Initizalization */
  setWidgetState("initial", c.data.catalogCategories);

  /* Function to be called when "Show All Items" has been clicked */
  c.showAllItems = function () {
    setWidgetState("initial", c.data.catalogCategories);
    c.filteredCatalogItems = c.displayItems = c.data.catalogItems;
    c.isShowAllSelected = true;
    c.data.currentPage = resetCurrentPage();
    c.isMultiplePage = checkMultiPage(c.filteredCatalogItems.length, c.data.itemsPerPage);
  };

  /* Function to be called when "Quick Search" is active */
  c.quickSearch = function () {
    if ($scope.searchText.length == 0) {
      setWidgetState("initial", c.data.catalogCategories);
      return;
    }

    setWidgetState("default-selected", c.data.catalogCategories);
    c.data.currentPage = resetCurrentPage();
    c.filteredCatalogItems = c.displayItems = $scope.searchText.length > 0 ? quickSearch(c.data.catalogItems, $scope.searchText) : [];
    c.isMultiplePage = checkMultiPage(c.filteredCatalogItems.length, c.data.itemsPerPage);
  };

  /* Function to be called when category letter has been clicked */
  c.selectCategory = function (category) {
    setWidgetState("default", c.data.catalogCategories);
    category.selected = true;
    c.data.currentPage = resetCurrentPage();
    c.filteredCatalogItems = selectCategory(c.data.catalogItems, category);
    c.isMultiplePage = checkMultiPage(c.filteredCatalogItems.length, c.data.itemsPerPage);
    c.displayItems = calculateDisplayCatalogItems(c.filteredCatalogItems, c.data.currentPage, c.data.itemsPerPage);
  };

  /* Function to be called when reset button has been pressed*/
  c.resetState = function () {
    setWidgetState("initial", c.data.catalogCategories);
  };

  /* Function to make the whole row clickable */
  c.openUrl = function (itemId, externalUrl) {

    var fullLink = "";
    fullLink = c.data.defaultCatalogLink + itemId;
    
    /* If external URL provided then replace the output with it */
    if (externalUrl) { fullLink = externalUrl };

    $window.open(fullLink, "_blank");
  };

  /* Pagination */

  /* Function to be called by the form element when another page has been selected */
  c.pageChanged = function () {
    c.displayItems = calculateDisplayCatalogItems(c.filteredCatalogItems, c.data.currentPage, c.data.itemsPerPage);
  };

  /* Functions */

  /* If it is a quick seach then we are giving filtered array based on the condition */
  function quickSearch(items, searchText) {
    return items.filter(function (item) {
      try {
        /* First we need to check that values are not null, otherwise assign them with empty space to avoid app crash */
        var itemName = item.name != null ? item.name.toLowerCase() : "";
        var itemDescription = item.description != null ? item.description.toLowerCase() : "";

        /* Return item if quick search text we placed in our input field is contained in the item name or description */
        return (itemName).indexOf(searchText.toLowerCase()) != -1 || (itemDescription).indexOf(searchText.toLowerCase()) != -1;
      } catch (error) {
        console.log("Something went wrong while filtering searching by item name or description");
      }
    });
  }

  /* If it is a quick seach then we are giving filtered array based on the condition */
  function selectCategory(items, category) {
    return items.filter(function (item) {
      return (item.name.toLowerCase()).substring(0, 1) == category.letter.toLowerCase();
    });
  }

  /* Function to reset the category selection to default state (all are non-selected) */
  function resetSelected(items) {
    for (var i = 0; i < items.length; i++) {
      items[i].selected = false;
    }
    c.isShowAllSelected = false;
  }

  /* Function to reset quick search text in the input field */
  function resetQuickSearchText() {
    $scope.searchText = "";
  }

  /* Function that accumulates reset of selected category and quick search text */
  function setWidgetState(state, items) {
    /* Default state is intended to clear quick search text and reset category selection only */
    if (state == "default") {
      resetSelected(items);
      resetQuickSearchText();

      return c.data.msgDefaultState;
    }

    /* Default-Selected is intended to reset the category selection state only e.g. for All items category selection */
    if (state == "default-selected") {
      resetSelected(items);

      return c.data.msgCategoryReset;
    }

    /* Initial is intended to bring the widget to the initial state same as after pager reload */
    if (state == "initial") {
      resetQuickSearchText();
      resetSelected(items);
      c.filteredCatalogItems = c.data.catalogItems;
      c.displayItems = [];
      c.isShowAllSelected = false;
      c.isMultiplePage = false;

      return "Initialization has completed";
    }
  }

  /* Function to flag multipaging which is used by pagination to display page selector */
  function checkMultiPage(itemsToDisplay, numOfPages) {
    return Math.ceil(itemsToDisplay / numOfPages) > 1 ? true : false;
  }

  /* Function to reset the current page to 1 everytime the category changes */
  function resetCurrentPage() {
    return 1;
  }

  /* Function to prepare the list of items to display based on the selected page */
  function calculateDisplayCatalogItems(filteredItemsArray, currentPage, itemsPerPage) {
    return filteredItemsArray.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }

  /* Debug - Logs */
  if (c.data.isDebugEnabled) {
    console.log(c);
  }
};
