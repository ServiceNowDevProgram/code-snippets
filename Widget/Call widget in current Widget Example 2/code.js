// Write code in  of parent widget

// --------HTML------------
<div>

  <h1>This is Parent Widget<h1>
      <sp-widget widget='data.Widget_2'></sp-widget>
</div>

//-------- Server Script----------
(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */

	data.Widget_2 = $sp.getWidget('my_child_widget_2');
})();
