<!-- ADD THE BELOW TO THE HTML, SERVER SCRIPT AND CSS FIELDS OF THE WIDGET YOU ARE USING TO DISPLAY THE SEARCH BAR IN THE SERVICE PORTAL / EMPLOYEE CENTER (DEFAULT IS HOMEPAGE SEARCH). YOU MAY NEED TO CLONE THE OUT OF THE BOX WIDGET TO MAKE CHANGES -->

<!--HTML - ADD THIS UNDER THE '<sp-widget widget="data.typeAheadSearch"></sp-widget>' LINE IN THE WIDGET. DONT FORGET TO REPLACE THE <PORTAL> PARTS OF THE HREF WITH YOUR PORTAL SUFFIX-->

<div class="recently-viewed" ng-if="data.items.length == 1">
    <strong>Recently viewed: &nbsp</strong><a
        href="../<PORTAL>?id=sc_cat_item&sys_id={{data.items[0].sys_id}}">{{data.items[0].name}}</a> <!-- Replace <PORTAL> with your portal suffix-->
</div>
<div class="recently-viewed" ng-if="data.items.length == 2">
    <strong>Recently viewed: &nbsp</strong><a
        href="../<PORTAL>?id=sc_cat_item&sys_id={{data.items[0].sys_id}}">{{data.items[0].name}}</a> &nbsp &nbsp|&nbsp &nbsp <!-- Replace <PORTAL> with your portal suffix-->
    <a href="../<PORTAL>?id=sc_cat_item&sys_id={{data.items[1].sys_id}}">{{data.items[1].name}}</a> <!-- Replace <PORTAL> with your portal suffix-->
</div>
<div class="recently-viewed" ng-if="data.items.length > 2">
    <strong>Recently viewed: &nbsp</strong><a
        href="../<PORTAL>?id=sc_cat_item&sys_id={{data.items[0].sys_id}}">{{data.items[0].name}}</a> &nbsp &nbsp|&nbsp &nbsp <!-- Replace <PORTAL> with your portal suffix-->
    <a href="../<PORTAL>?id=sc_cat_item&sys_id={{data.items[1].sys_id}}">{{data.items[1].name}}</a> &nbsp &nbsp|&nbsp &nbsp <!-- Replace <PORTAL> with your portal suffix-->
    <a href="../<PORTAL>?id=sc_cat_item&sys_id={{data.items[2].sys_id}}">{{data.items[2].name}}</a> <!-- Replace <PORTAL> with your portal suffix-->
</div>


<!--CSS-->

.recently-viewed {
    color: white;
    margin:10px 0px 10px 10px;
    width: max-content;
  }
  
  .recently-viewed a {
      color: white;
      text-decoration: none;
  }


<!--SERVER SCRIPT-->

// Get the logged in users last 100 recent items.
var itemsArray = [];
var viewed = new GlideRecord('sp_log');
viewed.addEncodedQuery('userDYNAMIC90d1921e5f510100a9ad2572f2b477fe^type=Cat Item View'); // Encoded query uses the 'user is me' dynamic filter
viewed.orderByDesc('sys_created_on');
viewed.setLimit(100);
viewed.query();
while (viewed.next()) {
	itemsArray.push(viewed.id.toString());
}

// Remove duplicate items from array
var arr = [];
var arrayUtil = new global.ArrayUtil();
itemsArray = arrayUtil.unique(itemsArray);
for (var i = 0; i < itemsArray.length; i++) {
     arr.push(itemsArray[i]);
}

// Look up the details of the first 3 items in array
var returnedArray = [];
for (var j = 0; j < 3; j++) {
	var obj = {};
	var itemLookup = new GlideRecord('sc_cat_item');
	itemLookup.addEncodedQuery('sys_id=' + arr[j]);
	itemLookup.query();
	if (itemLookup.next()) {
		obj.name = itemLookup.name.toString();
		obj.sys_id = itemLookup.sys_id.toString();
		returnedArray.push(obj);
	}
}

data.items = returnedArray;
