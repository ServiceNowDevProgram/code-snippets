angular.module("sn.chg_soc.config", ["sn.common"])
    .service("configService", ["dataService", "ganttChart", "urlService", "SOC", function(dataService, ganttChart, urlService, SOC) {
        var configService = this;

        configService.showConfigItem = true;
        configService.showDuration = true;
		configService.showShortDesc=true; 
        configService.showBlackoutOption = true;
        configService.showBlackoutSchedules = true;
        configService.showMaintOption = true;
        configService.showMaintSchedules = true;

        configService.childRecords = {};

        configService.setChildRecords = function(childTables) {
            for (var tableName in childTables)
                configService.childRecords[tableName] = {
                    inputId: tableName + "Option",
                    label: childTables[tableName].__label,
                    name: tableName + "Show",
                    show: true,
                    change: updateChildRecords
                };
        };

        function updateChildRecords(tableName) {
            var gantt = ganttChart.getGantt(urlService.socId);
            var ganttTasks = gantt.getTaskByTime();
            for (var i = 0; i < ganttTasks.length; i++)
                if (ganttTasks[i].parent && ganttTasks[i].table === tableName)
                    ganttTasks[i].__visible = configService.childRecords[tableName].show;
            gantt.attachEvent("onBeforeTaskDisplay", function(id, task) {
                if (task.parent)
                    return task.__visible;
                return true;
            });
            gantt.templates.grid_open = gridOpen;
            gantt.render();
        }

        function gridOpen(task) {
            var gantt = ganttChart.getGantt(urlService.socId);
            var children = gantt.getChildren(task.id);

            for (var i = 0; i < children.length; i++) {
                var childTask = gantt.getTask(children[i]);
                if (childTask.__visible)
                    return "<div class='gantt_tree_icon gantt_" + (task.$open ? "close" : "open") +
                        " icon-vcr-" + (task.$open ? "down" : "right") + "'></div>";
            }

            return "<div class='gantt_tree_icon gantt_blank'></div>";
        }
    }])
    .directive("socAsideConfig", ["getTemplateUrl", "configService", "ganttChart", "dataService", "objectKeysLengthFilter", "SOC", "i18n", function(getTemplateUrl, configService, ganttChart, dataService, objectKeysLengthFilter, SOC, i18n) {
        "use strict";
        return {
            restrict: "A",
            templateUrl: getTemplateUrl("sn_chg_soc_aside_config_body.xml"),
            scope: {
                socDefId: "="
            },
            controller: function($scope, objectKeysLengthFilter) {
               // $scope.showConfigItem = configService.showConfigItem;
              //  $scope.showDuration = configService.showDuration;
                $scope.showBlackoutOption = configService.showBlackoutOption;
                $scope.showShortDesc = configService.showShortDesc;
                $scope.showBlackoutSchedules = configService.showBlackoutSchedules;
                $scope.showMaintOption = configService.showMaintOption;
                $scope.showMaintSchedules = configService.showMaintSchedules;
                $scope.childRecords = configService.childRecords;
                $scope.objectKeysLengthFilter = objectKeysLengthFilter;
                $scope.messages = {
                    "Child Records": i18n.getMessage("Child Records"),
                    "Columns": i18n.getMessage("Columns"),
                    "Configuration Item": i18n.getMessage("Configuration Item"),
                    "Short Description": i18n.getMessage("Short Description"),
                    "Duration": i18n.getMessage("Duration"),
                    "Related Records": i18n.getMessage("Related Records"),
                    "Schedules": i18n.getMessage("Schedules"),
                    "Blackout": i18n.getMessage("Blackout"),
                    "Maintenance": i18n.getMessage("Maintenance")
                };

                $scope.updateColumnLayout = function(columnId) {
                    var gantt = ganttChart.getGantt($scope.socDefId);
                    var column = gantt.getGridColumn(columnId);
                    if (SOC.COLUMN.CONFIG_ITEM === columnId) {
                        configService.showConfigItem = !configService.showConfigItem;
                        column.hide = !configService.showConfigItem;
                    } else if (SOC.COLUMN.DURATION === columnId) {
                        configService.showDuration = !configService.showDuration;
                        column.hide = !configService.showDuration;
                    } else if (SOC.COLUMN.SHORT_DESCRIPTION === columnId) {
                        configService.showShortDesc = !configService.showShortDesc;
						column.hide = !configService.showShortDesc;
                    } else
                        return;
                    gantt.render();
                };

                function getScheduleEvent(task, startDate, endDate, styleClass) {
                    var gantt = ganttChart.getGantt($scope.socDefId);
                    startDate = gantt.date.parseDate(startDate, "xml_date");
                    endDate = gantt.date.parseDate(endDate, "xml_date");
                    var sizes = gantt.getTaskPosition(task, startDate, endDate);
                    var el = document.createElement("div");
                    el.className = "schedule-bar " + styleClass;
                    el.style.left = sizes.left + "px";
                    el.style.width = sizes.width + "px";
                    el.style.top = sizes.top + "px";
                    return el;
                }

                var scheduleTaskLayer = function(task) {
                    if ((!this.show_blackout && !this.show_maint) || (task.blackout_spans.length === 0 && task.maint_spans.length === 0))
                        return;
                    var wrapper = document.createElement("div");
                    if (this.show_blackout && dataService.definition.show_blackout.value)
                        task.blackout_spans.forEach(function(blackoutSpan) {
                            wrapper.appendChild(getScheduleEvent(task, blackoutSpan.start, blackoutSpan.end, "blackout"));
                        });
                    if (this.show_maint && dataService.definition.show_maintenance.value)
                        task.maint_spans.forEach(function(maintSpan) {
                            wrapper.appendChild(getScheduleEvent(task, maintSpan.start, maintSpan.end, "maint"));
                        });
                    return wrapper;
                };

                $scope.updateScheduleLayer = function() {
                    configService.showBlackoutSchedules = $scope.showBlackoutSchedules;
                    configService.showMaintSchedules = $scope.showMaintSchedules;
                    var ganttInstance = ganttChart.getInstance($scope.socDefId);
                    ganttInstance.removeTaskLayer();

                    if ($scope.showBlackoutSchedules || $scope.showMaintSchedules) {
                        ganttInstance.addTaskLayer(scheduleTaskLayer.bind({
                            show_blackout: $scope.showBlackoutSchedules,
                            show_maint: $scope.showMaintSchedules
                        }));
                        ganttInstance.gantt.render();
                    }
                };
            }
        };
    }]);
