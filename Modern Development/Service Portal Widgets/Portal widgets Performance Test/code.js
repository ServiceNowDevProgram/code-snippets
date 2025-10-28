(async () => {
  let threshold = 1000; // only show load times for widgets higher than this value (in milliseconds)
  var wa = $("div [widget='widget']").css("border", "1px solid red").css("padding-top", "20px").css("position", "relative")
  let widgetTable = [];
  let wmk = [];
  for (var i = 0; i < wa.length; i++) {
    let widgetEntry = {};
    $0 = wa[i]
    let scope = $($0).scope();
    try{
      var widget = scope.widget;
    } catch(e){
      console.error(e);
      continue;
    }
    var timing = 0;
    let elem = $("<div style='position: absolute; top: 1px; left: 1px'><a target='_blank' href='/$sp.do?id=widget_editor&sys_id=" + widget.sys_id + "'> " + widget.name + "</a>&nbsp;&nbsp;</div>");
    var printScope = $("<a href='javascript:void(0);'>Print scope </a>").on('click', function() {
      console.info(scope);
    });
    elem.append(printScope);
    widgetEntry.name = widget.name;
    widgetEntry.rectangle = widget.rectangle_id || 'undefined';
    widgetEntry.sys_id = widget.sys_id;
    let id = scope.widget.rectangle_id + "_" + scope.$id

    // if this is not a nested widget, go ahead and refresh it.
    if (!scope.$parent || !scope.$parent.widget) {
      var widget_name = widget.name;
      var t0 = performance.now();
      await scope.server.refresh();
      var t1 = performance.now();
      timing = "<div style='float:right;color:red;' id='" + id + "'> Load Time: " + parseInt(t1 - t0) + " ms.</div>";
      widgetEntry.load_time_ms = parseInt(t1 - t0) || 0;
      elem.append(timing);
    }
    // add a button to refresh manually.
    var loadTime = $("<button style='border-radius: 50%;'> ⟳ </button>").on('click', function() {
      var widget_name = scope.widget.name;
      let id = scope.widget.rectangle_id + "_" + scope.$id
      var t0 = performance.now();
      scope.server.refresh().then(() => {
        var t1 = performance.now();
        timing = "<div style='float:right;color:red;' id='" + id + "'> Load Time: " + parseInt(t1 - t0) + " ms.</div>";
        widgetEntry.load_time_ms = parseInt(t1 - t0) || 0;
        if ($('#' + id)) {
          $('#' + id).remove();
        }

        elem.append(timing);
        console.log("Call to " + widget_name + " took " + (t1 - t0) + " ms.");
      });
    });

    elem.append(loadTime);
    $($0).append(elem);
    widgetTable.push(widgetEntry);
  }
  widgetTable.sort((a, b) => (a.load_time_ms > b.load_time_ms) ? 1 : -1);
  var slow = widgetTable.filter((e, i, w) => {
    return e.load_time_ms >= threshold;
  });

  let mkdn = `|Name|sys_id|rectangle_id|Load Time Ms|
|:---:|:---:|:---:|:---:|
${slow.map((widgetEntry, i, widgetTable) => {
return `|${widgetEntry.name}|${widgetEntry.sys_id}|${widgetEntry.rectangle}|${widgetEntry.load_time_ms}|`;
}).join("\n")}`;
  var doCopy = function() {
    var el = document.createElement('textarea');
    el.value = mkdn;
    el.setAttribute('readonly', '');
    el.style = {
      position: 'absolute',
      left: '-9999px'
    };
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
  var elem = `<div style="float: right;
z-index: 1;
position: relative;
left: -50%; /* or right 50% */
text-align: left;
padding:10px">
<h2>${(slow.length > 0)?"Slow Widgets:" : "No Slow Widgets Found!"}</h2>
<table style="padding:3px; display:${(slow.length > 0)?"table":"none"}">
<tr><td style="padding:3px;" >Name</td><td style="padding:3px;">sys_id</td><td style="padding:3px;">rectangle id</td><td style="padding:3px;">load time ms</td></tr>
${slow.map((widgetEntry, i, widgetTable) => {
return `<tr><td style="padding:3px;">${widgetEntry.name}</td><td style="padding:3px;">${widgetEntry.sys_id}</td><td style="padding:3px;">${widgetEntry.rectangle}</td><td style="padding:3px;">${widgetEntry.load_time_ms}</td></tr>`;
}).join(" ")}
</table>
<button onClick=${doCopy()} style="display:${(slow.length > 0)?"table":"none"}">Copy Markdown</button>
</div>`;
  $('body').append(elem);
})();
