[HTML]

<button id="popup" class="feedback-button" onclick="window.location.href = '?id=sc_cat_item&sys_id=ADD YOUR CATALOG ITEM SYS ID HERE';">Feedback</button>

[Server Script]

(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */

})();

[Client Script]

api.controller=function() {
  /* widget controller */
  var c = this;
};

[CSS]

.feedback-button {
  height: 50px;
  border: none;
  background: #80B6A1;
  width: 100px;
  line-height: 32px;
  -webkit-transform: rotate(-90deg);
  color: white;
  transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  text-align: center;
  font-size: 16px;
  position: fixed;
  right: -8px;
  top: 45%;
  font-family: "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif;
  z-index: 999;
}
