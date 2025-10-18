/**
 * Dynamic Field Helper (UI Script)
 * Author: Abhishek Aggarwal
 * Description:
 * Adds smart tooltip icons beside form field labels to help users understand field purpose or business rules dynamically.
 *
 * Usage:
 * 1. Create this as a UI Script named "dynamic_field_helper"
 * 2. Include it on forms or global UI Scripts
 * 3. Define field tips via system property, script include, or inline config below
 */

(function () {
  // Config: fallback if GlideAjax not used
  var fallbackHelp = {
    short_description:
      "Provide a clear, concise summary of the issue or request.",
    assignment_group: "Group responsible for resolving this record.",
    priority: "Determines urgency based on impact and severity.",
    u_project_code: "Auto-filled based on the selected department.",
    u_estimated_cost: "Enter total expected amount in INR.",
  };

  /**
   * Fetch dynamic help content using GlideAjax (optional)
   * Create a Script Include (Client Callable) named 'FieldHelpProvider' if you want to pull help dynamically.
   */
  function fetchHelpData(callback) {
    try {
      if (typeof GlideAjax === "undefined") {
        callback(fallbackHelp);
        return;
      }

      var ga = new GlideAjax("FieldHelpProvider");
      ga.addParam("sysparm_name", "getHelpText");
      ga.addParam("sysparm_table", g_form.getTableName());
      ga.getXMLAnswer(function (response) {
        if (!response) {
          callback(fallbackHelp);
          return;
        }
        try {
          var parsed = JSON.parse(response);
          callback(parsed || fallbackHelp);
        } catch (e) {
          callback(fallbackHelp);
        }
      });
    } catch (err) {
      console.error("DynamicFieldHelper: Fetch error", err);
      callback(fallbackHelp);
    }
  }

  /**
   * Core function to add tooltips
   */
  function addTooltips(helpData) {
    Object.keys(helpData).forEach(function (field) {
      var labelEl = document.querySelector(`label[for='${field}']`);
      if (labelEl && !labelEl.classList.contains("dfh-active")) {
        labelEl.classList.add("dfh-active");
        var icon = document.createElement("span");
        icon.innerHTML = " ⓘ";
        icon.title = helpData[field];
        icon.className = "dfh-tooltip-icon";
        labelEl.appendChild(icon);
      }
    });
  }

  /**
   * Inject CSS for styling (auto once)
   */
  function injectStyle() {
    if (document.getElementById("dfhStyle")) return;
    var style = document.createElement("style");
    style.id = "dfhStyle";
    style.textContent = `
      .dfh-tooltip-icon {
        cursor: help;
        color: #2563eb;
        font-weight: bold;
        margin-left: 4px;
        transition: all 0.2s ease-in-out;
      }
      .dfh-tooltip-icon:hover {
        color: #1d4ed8;
        transform: scale(1.2);
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize
  function init() {
    if (typeof g_form === "undefined") return; // not a form
    injectStyle();
    fetchHelpData(function (data) {
      addTooltips(data);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
