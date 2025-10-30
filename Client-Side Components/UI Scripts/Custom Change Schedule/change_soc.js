angular.module("sn.chg_soc.change_soc", [
        "ngAria",
        "sn.common",
        "sn.common.glide",
        "sn.angularstrap",
        "sn.chg_soc.accessibility",
        "sn.chg_soc.tooltip_overflow",
        "sn.chg_soc.notification",
        "sn.chg_soc.mousedown",
        "sn.chg_soc.gantt",
        "sn.chg_soc.data",
        "sn.chg_soc.style",
        "sn.chg_soc.config",
        "sn.chg_soc.share",
        "sn.chg_soc.landing_wizard",
        "sn.chg_soc.context_menu",
        "sn.chg_soc.snCreateNewInvite",
        "sn.chg_soc.keyboard",
        "sn.chg_soc.popover",
        "sn.chg_soc.duration",
        "sn.app_itsm.now.filter",
        "sn.chg_soc.filter_control",
        "sn.chg_soc.loading",
        "sn.itsm.change.overflow"
    ])
    .constant("SOC", {
        BLACKOUT: "blackout",
        BLACKOUT_SPAN_COLOR: "#BDC0C4",
        CHANGE_REQUEST: "change_request",
        DATE_FORMAT: "%Y-%m-%d %H:%i:%s",
        GET_CHANGE_SCHEDULE: "/api/sn_chg_soc/soc/changeschedule/",
        GET_PARSE_QUERY: "/api/now/ui/query_parse/change_request?sysparm_query=",
        ISO_WEEK: "isoWeek",
        MAINT: "maint",
        MAINT_SPAN_COLOR: "#BDDCFC",
        STYLE_PREFIX: "soc_",
        SYSPARM_ID: "sysparm_id",
        ZOOM_LEVEL_PREF: "sn_chg_soc.change_soc_zoom_level",
        COLUMN: {
            SHORT_DESCRIPTION: "short_description",
            CONFIG_ITEM: "config_item",
            // DURATION: "duration",
            NUMBER: "number"
        },
        STYLE_CLASS_MAP: {
            soc_event_bar: "soc-event-bar",
            soc_row_child: "soc-row-child",
            soc_row_child_end: "soc-row-child-end",
            soc_row_child_start: "soc-row-child-start",
            soc_row_child_single: "soc-row-child-single"
        },
        KEYS: {
            TABKEY: 9,
            ENTER: 13,
            ESCAPE: 27,
            SPACE: 32,
            LEFT_ARROW: 37,
            UP_ARROW: 38,
            RIGHT_ARROW: 39,
            DOWN_ARROW: 40,
            D: 68,
            E: 69,
            F: 70,
            SLASH: 191
        }
    })
    .config(["$httpProvider", "$locationProvider", function($httpProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $httpProvider.interceptors.push("xhrInterceptor");
    }])
    .service("urlService", ["$location", "SOC", function($location, SOC) {
        var urlService = this;

        urlService.socId = $location.search()[SOC.SYSPARM_ID];

        urlService.setChangeScheduleId = function() {
            var params = $location.search();
            urlService.socId = params[SOC.SYSPARM_ID];
        };
    }])
    .service("clientService", ["dataService", function(dataService) {
        var clientService = this;

        clientService.filter = dataService.definition;
    }])
    .directive("changeSoc", ["urlService", "ganttChart", "ganttScale", "dataService", "i18n", "getTemplateUrl", "$templateRequest", "$templateCache", "$filter", "$compile", "$window", "SOC", "TextSearchService", "socNotification",
        function(urlService, ganttChart, ganttScale, dataService, i18n, getTemplateUrl, $templateRequest, $templateCache, $filter, $compile, $window, SOC, TextSearchService, socNotification) {
            return {
                restrict: "A",
                scope: false,
                transclude: true,
                template: "<div ng-transclude></div>",
                link: function($scope, $element, $attrs, changeSoCCtrl) {
                    var position = {
                        delta: {
                            top: 0,
                            left: 0
                        },
                        original: {
                            top: 0,
                            left: 0
                        }
                    };
                    $scope.ganttInstance = ganttChart.getInstance(urlService.socId);
                    $scope.gantt = $scope.ganttInstance.gantt;

                    // destroy all popovers when resizing the window
                    angular.element(window).on("resize", function() {
                        angular.element(".popover.soc-task-popover").popover("destroy");
                        _handleDestroyPopover();
                    });

                    angular.element(window).on("keydown", function($event) {
                        if ($event.keyCode === SOC.KEYS.ESCAPE)
                            _handleDestroyPopover();
                    });

                    angular.element(window).on("click", function($event) {
                        var target = getTargetElement($event);
                        if (target === null)
                            _handleDestroyPopover(); // Clicking outside a gantt task
                    });

                    //size of gantt
                    $scope.$watch(function() {
                        return $element[0].offsetWidth + "." + $element[0].offsetHeight;
                    }, function() {
                        $scope.gantt.setSizes();
                    });

                    $scope.$watch("dataService.definition.condition.dryRun", function(newValue, oldValue) {
                        if (newValue)
                            angular.element(".control-left .filter-btn").addClass("dry-run");
                        else
                            angular.element(".control-left .filter-btn").removeClass("dry-run");
                    });
                    /**
                     * Marker config
                     */
                    $scope.gantt.config.show_markers = true;

                    /**
                     * Column config
                     */
                    var msgSelectRecord = i18n.getMessage("Show span start");
                    $scope.gantt.config.columns = [{
                            name: SOC.COLUMN.NUMBER,
                            label: i18n.getMessage("Number"),
                            align: "left",
                            tree: true,
                            width: 160,
                            min_width: 160,
                            resize: true,
                            template: function(content) {
                                return "<span>" + content.number + "</span>" +
                                    "<span data-toggle='tooltip' data-trigger='hover focus click' data-container='body' data-placement='auto bottom' class='select-task icon-target'" +
                                    "data-original-title='" + msgSelectRecord + "'" +
                                    "></span>";
                            }
                        },
                        {
                            name: SOC.COLUMN.CONFIG_ITEM,
                            label: i18n.getMessage("Configuration Item"),
                            align: "left",
                            width: 220,
                            min_width: 220,
                            resize: true,
                            template: function (content) {
                                return "<span data-toggle='tooltip' data-trigger='hover focus click' data-container='body' data-placement='auto bottom' " +
                                    "data-original-title='" + content[SOC.COLUMN.CONFIG_ITEM] + "'>" +
                                    content[SOC.COLUMN.CONFIG_ITEM] +
                                    "</span>";
                            }
                        },
                        {

                            name: SOC.COLUMN.SHORT_DESCRIPTION,
                            label: "Short Description",
                            align: "left",
                            tree: true,
                            width: 160,
                            min_width: 160,
                            resize: true,
                            template: function(content) {
                                return "<span>" + content.short_description + "</span>" +
                                    "<span data-toggle='tooltip' data-trigger='hover focus click' data-container='body' data-placement='auto bottom' class='select-task icon-target'" +
                                    "data-original-title='" + msgSelectRecord + "'" +
                                    "></span>";
                            }

                        },
                        // {
                        //     name: SOC.COLUMN.DURATION,
                        //     label: i18n.getMessage("Duration"),
                        //     align: "left",
                        //     width: 130,
                        //     min_width: 130,
                        //     template: function(content) {
                        //         return content.dur_display;
                        //     },
                        //     resize: true
                        // }
                    ];

                    /**
                     * Core Config
                     */
                    // internal date time format
                    $scope.gantt.config.xml_date = SOC.DATE_FORMAT;
                    // ARIA attributes
                    $scope.gantt.config.wai_aria_attributes = true;
                    // Keyboard navigation
                    $scope.gantt.config.keyboard_navigation = true;

                    /**
                     * Scrolling
                     */
                    // Prevents scrolling gantt on load of data
                    $scope.gantt.config.initial_scroll = false;

                    $scope.gantt.showTask = function(id) {
                        var task = this.getTask(id);
                        var taskSize = this.getTaskPosition(task, task.start, task.end);
                        var left = Math.max(taskSize.left - this.config.task_scroll_offset, 0);
                        var ganttVerScrollWidth = angular.element(".gantt_ver_scroll").width();
                        var ganttTaskWidth = angular.element(".gantt_task").width() - ganttVerScrollWidth;

                        if (Math.abs(this.getScrollState().x - taskSize.left) < ganttTaskWidth && (taskSize.left + taskSize.width) > this.getScrollState().x)
                            left = null;

                        var scrollStateTop = this.getScrollState().y;
                        var scrollStateBottom = scrollStateTop + this._scroll_sizes().y;
                        var visibleTaskTop = taskSize.top;
                        var visibleTaskBottom = taskSize.top + this.config.row_height;
                        var top = null;

                        if (visibleTaskTop < scrollStateTop)
                            top = visibleTaskTop;
                        else if (visibleTaskTop > scrollStateTop && (visibleTaskTop < scrollStateBottom && visibleTaskBottom < scrollStateBottom))
                            top = null;
                        else if (visibleTaskTop > scrollStateTop && visibleTaskBottom > scrollStateBottom)
                            top = visibleTaskBottom - scrollStateBottom + scrollStateTop;

                        this.scrollTo(left, top);
                    };

                    function isPopoverInViewport(el) {
                        var visibleArea = {
                            minWidth: angular.element(".gantt_grid_data").width() - 15, // 15px considering the arrow can be shifted to the right (still visible)
                            maxWidth: angular.element("body").width(),
                            minTop: angular.element(".gantt_data_area").offset().top,
                            maxTop: angular.element("body").height()
                        };
                        var currentArea = {
                            minWidth: el.offset().left,
                            maxWidth: el.offset().left + el.width(),
                            minTop: el.offset().top - 15, // 15px considering the arrow
                            maxTop: el.offset().top + el.height() + 15, // 15px considering the arrow
                        };
                        if (currentArea.minWidth > visibleArea.minWidth && currentArea.maxWidth < visibleArea.maxWidth &&
                            currentArea.minTop > visibleArea.minTop && currentArea.maxTop < visibleArea.maxTop)
                            return true;
                        return false;
                    }

                    function adjustPopover() {
                        popoverElement = angular.element(".popover.soc-task-popover");
                        if (position.delta.top - angular.element(".gantt_ver_scroll").scrollTop() === 0 && position.delta.left - angular.element(".gantt_hor_scroll").scrollLeft() === 0)
                            return;
                        if (popoverElement.hasClass("in")) {
                            var newPopoverPosition = {
                                top: position.original.top + position.delta.top - angular.element(".gantt_ver_scroll").scrollTop(),
                                left: position.original.left + position.delta.left - angular.element(".gantt_hor_scroll").scrollLeft()
                            };
                            popoverElement.offset(newPopoverPosition);
                            if (!isPopoverInViewport(popoverElement))
                                _handleDestroyPopover();
                        }
                    }

                    $scope.lastScrollTop = 0;
                    $scope.loadScrollTop = 0;
                    $scope.lazyLoading = false;
                    $scope.gantt.attachEvent("onGanttScroll", function(left, top) {
                        if ($scope.lazyLoading)
                            $scope.lastScrollTop = top;

                        if (dataService.count >= $window.NOW.sn_chg_soc.limit)
                            return;

                        var gridHeight = angular.element("div.gantt_ver_scroll").find("div").height();
                        var shouldLoad = top > ($scope.loadScrollTop + ((gridHeight - $scope.loadScrollTop) / 4));
                        adjustPopover();
                        if (!shouldLoad || $scope.isLoading() || !dataService.more || $scope.lazyLoading || top <= $scope.loadScrollTop || top <= $scope.lastScrollTop)
                            return;

                        $scope.loadScrollTop = top;
                        $scope.lazyLoading = true;
                        dataService.getChanges(urlService.socId).then(function(model) {
                            if (dataService.count >= $window.NOW.sn_chg_soc.limit)
                                socNotification.show("warning", i18n.format(i18n.getMessage("This schedule has exceeded the event limit. The first {0} events based on your order criteria will be displayed."), $window.NOW.sn_chg_soc.limit), 0);

                            // Need to provide the tasks so it can calc min/max
                            ganttScale.setDateRange(dataService.tasks.data);
                            ganttScale.configureScale();
                            $scope.gantt.clearAll();
                            ganttChart.addNowMarker(urlService.socId);
                            // these are the created tasks that will be added to the gantt
                            $scope.gantt.parse(dataService.tasks, "json");
                            $scope.lazyLoading = false;
                        });
                    });

                    /**
                     * Scales
                     */
                    // Only visible scale is rendered
                    $scope.gantt.config.smart_scales = true;
                    // Removes vertical borders on cells
                    $scope.gantt.config.show_task_cells = false;
                    $scope.gantt.config.scale_height = 60;
                    $scope.gantt.config.row_height = 40;
                    $scope.gantt.config.duration_unit = "hour";
                    $scope.gantt.config.duration_step = 1;
                    $scope.gantt.config.scale_unit = "day";
                    $scope.gantt.config.date_scale = "%j %M %Y";
                    $scope.gantt.config.subscales = [{
                        unit: "hour",
                        step: 1,
                        date: "%H:%i"
                    }];

                    /**
                     * UI Components
                     */
                    $scope.gantt.config.show_progress = false;
                    $scope.gantt.config.drag_links = false;
                    $scope.gantt.config.drag_move = false;
                    $scope.gantt.config.drag_resize = false;

                    /**
                     * Templates
                     */
                    // Configure use of icons in the gantt rows
                    $scope.gantt.templates.grid_open = function(item) {
                        return "<div class='gantt_tree_icon gantt_" + (item.$open ? "close" : "open") + " icon-vcr-" + (item.$open ? "down" : "right") + "'></div>";
                    };
                    $scope.gantt.templates.grid_folder = function(item) {
                        return "";
                    };
                    $scope.gantt.templates.grid_file = function(item) {
                        return "";
                    };
                    $scope.gantt.templates.grid_indent = function(item) {
                        return "";
                    };
                    $scope.gantt.templates.grid_row_class = function(start, end, task) {
                        return "";
                    };
                    $scope.gantt.templates.task_row_class = function(start, end, task) {
                        return "";
                    };
                    $scope.gantt.templates.task_class = function(start, end, task) {
                        return SOC.STYLE_CLASS_MAP.soc_event_bar;
                    };
                    $scope.gantt.templates.task_text = function(start, end, task) {
                        return "";
                    };

                    function getNode(node) {
                        if (node.hasClass("gantt_row"))
                            return angular.element(node.children(".gantt_cell")[0]);
                        if (!node.hasClass("gantt_cell") || node.hasClass("gantt_task_content") || node.hasClass("gantt_task_drag"))
                            node = node.parent();
                        return node;
                    }

                    function getTargetElement($event) {
                        var node = angular.element($event.target || $event.srcElement);
                        if ($event.type === "keydown")
                            return angular.element($event.target);
                        node = getNode(node);
                        if (node.hasClass("gantt_task_line"))
                            return node;
                        return null;
                    }

                    function handleOpenRecord() {
                        var task = $filter("filter")(dataService.tasks.data, {
                            id: this.targetId
                        })[0];
                        $window.location.href = task.table + ".do?&sys_id=" + task.sys_id +
                            "&sysparm_redirect=" + encodeURIComponent("sn_chg_soc_change_soc.do?sysparm_id=" + urlService.socId);
                    }

                    function _handleDestroyPopover() {
                        if (angular.element("[soc-popover]").length === 0)
                            return "";
                        angular.element("[soc-popover]").focus();
                        angular.element("[soc-popover]").attr("aria-expanded", "false");
                        angular.element("[soc-popover]").removeAttr("soc-popover");
                        angular.element(".popover.soc-task-popover").popover("destroy");
                    }

                    function _handleDestroyFlyout() {
                        $scope.$broadcast("sn.aside.change_soc_side.close");
                    }

                    function getTargetSelector($event, taskObj) {
                        if ($event.type !== "keydown") {
                            var selector = ".gantt_grid_data ." + $event.target.className;
                            var result = angular.element(selector);
                            var targetClass = (result.length > 0) ? ".gantt_grid" : ".gantt_task";
                            return (result.length > 0) ? targetClass + " [task_id='" + taskObj.id + "'] .gantt_cell:first" : targetClass + " .gantt_task_line[task_id='" + taskObj.id + "']";
                        } else
                            return ".gantt_grid [task_id='" + taskObj.id + "'] .gantt_cell:first";
                    }

                    function getX(target) {
                        var result = {
                            "start": 0,
                            "end": 0
                        };
                        var targetElement = {
                            "start": angular.element(target).offset().left,
                            "end": angular.element(target).offset().left + angular.element(target).width()
                        };
                        var visibleArea = angular.element(".gantt_task");
                        var visibleAreaLimits = {
                            "start": visibleArea.offset().left,
                            "end": visibleArea.offset().left + visibleArea.width()
                        };
                        result.start = (targetElement.start > visibleAreaLimits.start) ? targetElement.start : visibleAreaLimits.start;
                        result.end = (targetElement.end < visibleAreaLimits.end) ? targetElement.end : visibleAreaLimits.end;
                        return result.start + (result.end - result.start) / 2;
                    }

                    // Callback function used for building the popover template
                    function buildPopoverTemplate(taskObj, $event, popoverContent, popoverTemplate) {
                        var $popoverScope = $scope.$new(true);
                        $popoverScope.openRecord = i18n.getMessage("Open Record");
                        $popoverScope.handleOpenRecord = handleOpenRecord;
                        var targetSelector = getTargetSelector($event, taskObj);
                        var target = angular.element(targetSelector);
                        $popoverScope.targetId = taskObj.id;
                        popoverTemplate = $compile(popoverTemplate)($popoverScope);
                        target.attr("tabindex", "0");
                        target.attr("aria-expanded", "true");
                        target.attr("soc-popover", "opened");
                        var options = {
                            "container": "body",
                            "viewport": {
                                "selector": "body",
                                "padding": 20
                            },
                            "html": true,
                            "trigger": "manual",
                            "placement": "auto",
                            "title": taskObj.number + " - " + (taskObj.record.short_description ? taskObj.record.short_description.display_value : ""),
                            "content": popoverContent,
                            "template": popoverTemplate
                        };
                        target.popover(options);
                        if (targetSelector.indexOf("gantt_task") !== -1) {
                            target.data("bs.popover").options.atMouse = $event.pageX !== 0;
                            target.data("bs.popover").options.mousePos = {
                                "x": getX(target),
                                "y": $event.pageY
                            };
                        }
                        var action = angular.element(".popover.soc-task-popover").hasClass("in") ? "hidden" : "shown";
                        target.on(action + ".bs.popover", function($ev) {
                            if ($ev.type === "shown") {
                                _handleDestroyFlyout();
                                angular.element(".soc-btn-open-record").focus();
                                position.delta = {
                                    top: angular.element(".gantt_ver_scroll").scrollTop(),
                                    left: angular.element(".gantt_hor_scroll").scrollLeft()
                                };
                                position.original = {
                                    top: angular.element(".popover.soc-task-popover").offset().top,
                                    left: angular.element(".popover.soc-task-popover").offset().left
                                };
                                // Amend popover height if it is taller than remaining part of the window
                                var popoverElement = angular.element(".soc-task-popover");
                                var windowHeight = angular.element(window).height();
                                var maxHeight = windowHeight - popoverElement.offset().top;
                                if (popoverElement.height() > maxHeight)
                                    popoverElement.height(maxHeight + "px");
                            } else
                                _handleDestroyPopover();
                        });
                        target.popover("toggle");
                    }

                    function getTooltipTextToDisplay() {

                    }

                    // Callback function used for building the popover content
                    function buildPopoverContent(taskObj, $event, popoverContent) {
                        $templateCache.remove(getTemplateUrl("sn_chg_soc_change_soc_popover_template.xml"));
                        var $popoverContentScope = $scope.$new(true);
                        $popoverContentScope.leftFields = taskObj.left_fields;
                        $popoverContentScope.rightFields = taskObj.right_fields;
                        $popoverContentScope.emptyValue = "[" + i18n.getMessage("Empty") + "]";
                        popoverContent = $compile(popoverContent)($popoverContentScope);
                        $templateRequest(getTemplateUrl("sn_chg_soc_change_soc_popover_template.xml")).then(buildPopoverTemplate.bind(this, taskObj, $event, popoverContent));
                    }

                    function openPopover(id, $event) {
                        var targetElement = getTargetElement($event);
                        var openedPopover = angular.element("[soc-popover]");
                        if (targetElement === null || openedPopover.length > 0) {
                            _handleDestroyPopover();
                            if (targetElement === null || openedPopover.attr("task_id") === id)
                                return;
                        }
                        _handleDestroyFlyout();
                        $event.stopPropagation();
                        var taskObj = $filter("filter")(dataService.tasks.data, {
                            "id": id
                        }, true)[0];
                        $templateRequest(getTemplateUrl("sn_chg_soc_change_soc_task_popover.xml")).then(buildPopoverContent.bind(this, taskObj, $event));
                    }

                    /**
                     * Events
                     **/
                    $scope.gantt.attachEvent("onTaskClick", function(id, $event) {
                        openPopover(id, $event);
                        return true;
                    });

                    $scope.gantt.attachEvent("onTaskDblClick", function(id, e) {
                        return false;
                    });

                    $scope.gantt.addShortcut("enter", function($event) {
                        openPopover(this.taskId, $event);
                    }, "taskRow");

                    $scope.gantt.addShortcut("tab", function($event) {}, "taskRow");

                    $scope.gantt.attachEvent("onTaskSelected", function(id, item) {
                        return true;
                    });

                    $scope.gantt.attachEvent("onBeforeTaskSelected", function(id, item) {
                        return true;
                    });

                    function getScheduleEvent(task, startDate, endDate, styleClass) {
                        startDate = $scope.gantt.date.parseDate(startDate, "xml_date");
                        endDate = $scope.gantt.date.parseDate(endDate, "xml_date");
                        var sizes = $scope.gantt.getTaskPosition(task, startDate, endDate);
                        var el = document.createElement("div");
                        el.className = "schedule-bar " + styleClass;
                        el.style.left = sizes.left + "px";
                        el.style.width = sizes.width + "px";
                        el.style.top = sizes.top + "px";
                        return el;
                    }

                    // Add task layer for blackout windows
                    $scope.ganttInstance.addTaskLayer(function(task) {
                        if (task.blackout_spans.length === 0 && task.maint_spans.length === 0)
                            return;
                        var wrapper = document.createElement("div");
                        if (dataService.definition.show_maintenance.value)
                            task.maint_spans.forEach(function(maintSpan) {
                                wrapper.appendChild(getScheduleEvent(task, maintSpan.start, maintSpan.end, "maint"));
                            });
                        if (dataService.definition.show_blackout.value)
                            task.blackout_spans.forEach(function(blackoutSpan) {
                                wrapper.appendChild(getScheduleEvent(task, blackoutSpan.start, blackoutSpan.end, "blackout"));
                            });
                        return wrapper;
                    });

                    $scope.gantt.attachEvent("onGanttRender", function() {
                        $element.find(".gantt_container").attr("role", "grid");
                        angular.element('[data-toggle="tooltip"]').tooltip('destroy');
                        angular.element(".tooltip[id^='tooltip']").remove();
                        $element.find('[data-toggle="tooltip"]').tooltip();
                    });

                    // Locale information must be associated with gantt object attached to window
                    $window.gantt.locale = {
                        date: {
                            month_full: [i18n.getMessage("January"),
                                i18n.getMessage("February"),
                                i18n.getMessage("March"),
                                i18n.getMessage("April"),
                                i18n.getMessage("May"),
                                i18n.getMessage("June"),
                                i18n.getMessage("July"),
                                i18n.getMessage("August"),
                                i18n.getMessage("September"),
                                i18n.getMessage("October"),
                                i18n.getMessage("November"),
                                i18n.getMessage("December")
                            ],
                            month_short: [i18n.getMessage("Jan"),
                                i18n.getMessage("Feb"),
                                i18n.getMessage("Mar"),
                                i18n.getMessage("Apr"),
                                i18n.getMessage("May"),
                                i18n.getMessage("Jun"),
                                i18n.getMessage("Jul"),
                                i18n.getMessage("Aug"),
                                i18n.getMessage("Sep"),
                                i18n.getMessage("Oct"),
                                i18n.getMessage("Nov"),
                                i18n.getMessage("Dec")
                            ],
                            day_full: [i18n.getMessage("Sunday"),
                                i18n.getMessage("Monday"),
                                i18n.getMessage("Tuesday"),
                                i18n.getMessage("Wednesday"),
                                i18n.getMessage("Thursday"),
                                i18n.getMessage("Friday"),
                                i18n.getMessage("Saturday")
                            ],
                            day_short: [i18n.getMessage("Sun"),
                                i18n.getMessage("Mon"),
                                i18n.getMessage("Tue"),
                                i18n.getMessage("Wed"),
                                i18n.getMessage("Thu"),
                                i18n.getMessage("Fri"),
                                i18n.getMessage("Sat")
                            ]
                        },
                        labels: {}
                    };

                    $scope.zoomIn = function() {
                        _handleDestroyPopover();
                        ganttScale.zoom(++$scope.ganttScale.level, urlService.socId);
                    };

                    $scope.zoomOut = function() {
                        _handleDestroyPopover();
                        ganttScale.zoom(--$scope.ganttScale.level, urlService.socId);
                    };

                    $scope.gantt.init($element[0]);
                }
            };
        }
    ])
    .controller("ChangeSoCCtrl", ["$scope", "$document", "$timeout", "$window", "$location", "ganttChart", "styleService", "configService", "shareService", "dataService", "urlService", "ganttScale", "getTemplateUrl", "i18n", "SOC", "TextSearchService", "socNotification",
        function($scope, $document, $timeout, $window, $location, ganttChart, styleService, configService, shareService, dataService, urlService, ganttScale, getTemplateUrl, i18n, SOC, TextSearchService, socNotification) {
            var changeSoCCtrl = this;

            changeSoCCtrl.share = {
                canWrite: false
            };

            changeSoCCtrl.closeFlyout = function() {
                $scope.$apply(function() {
                    $scope.$broadcast("sn.aside.change_soc_side.close");
                });
            };

            $scope.loadingElements = {};
            $scope.dataService = dataService;
            $scope.ganttScale = ganttScale;
            $scope.urlService = urlService;

            $scope.pageLeft = function($event) {
                if ($event && $event.keyCode !== SOC.KEYS.ENTER && $event.keyCode !== SOC.KEYS.SPACE)
                    return;
                var gantt = ganttChart.getGantt(urlService.socId);
                var left = gantt.getScrollState().x - angular.element("div.gantt_scale_cell").width();
                gantt.scrollTo(left < 0 ? 0 : left, null);
            };

            $scope.pageRight = function($event) {
                if ($event && $event.keyCode !== SOC.KEYS.ENTER && $event.keyCode !== SOC.KEYS.SPACE)
                    return;
                var gantt = ganttChart.getGantt(urlService.socId);
                var left = gantt.getScrollState().x + angular.element("div.gantt_scale_cell").width();
                var scrollLength = angular.element("div.gantt_hor_scroll > div").width();
                gantt.scrollTo(left > scrollLength ? scrollLength : left, null);
            };

            $scope.scrollToday = function() {
                var gantt = ganttChart.getGantt(urlService.socId);
                gantt.showDate(new Date());
            };

            $scope.openView = function(viewId, event) {
                // We already have something open, need to deal with that first
                if ($scope.activeAside === viewId) {
                    $scope.$broadcast("sn.aside.change_soc_side.close");
                    if (event)
                        event.target.blur();
                } else {
                    var view;
                    switch (viewId) {
                        case "share":
                            view = getView(viewId, "sn_chg_soc_aside_share.xml");
                            break;
                        case "style":
                            view = getView(viewId, "sn_chg_soc_aside_style.xml");
                            break;
                        case "style_def":
                            view = getView(viewId, "sn_chg_soc_aside_style_page.xml", true);
                            break;
                        case "config":
                            view = getView(viewId, "sn_chg_soc_aside_config.xml");
                            break;
                        case "keyboard":
                            view = getView(viewId, "sn_chg_soc_aside_keyboard.xml");
                            break;
                    }
                    if (view !== undefined) {
                        angular.element(".sn-aside_right").show();
                        $scope.activeAside = viewId;
                        $scope.$broadcast("sn.aside.change_soc_side.open", view, "320px");
                    }
                }
            };

            $scope.$on("sn.aside.change_soc_side.close", function() {
                switch ($scope.activeAside) {
                    case "share":
                        angular.element("#share_side").focus();
                        break;
                    case "style":
                        angular.element("#style_side").focus();
                        break;
                    case "style_def":
                        angular.element("#style_side").focus();
                        break;
                    case "config":
                        angular.element("#config_side").focus();
                        break;
                    case "keyboard":
                        angular.element("#keyboard_side").focus();
                        break;
                }
                $scope.activeAside = "";
                angular.element(".sn-aside_right").hide();
            });

            $scope.$on("sn.aside.change_soc_side.open_style", function(event, style) {
                styleService.selectedStyle = style;
                $scope.openView("style_def");
            });

            $scope.$on("sn.aside.change_soc_side.style_updated", function(event, result) {
                if (result.style_sheet) {
                    var socStyleSheet = $document[0].getElementById("soc_span_style");
                    socStyleSheet.innerHTML = result.style_sheet;
                }

                if (result.records) {
                    var gantt = ganttChart.getGantt(urlService.socId);
                    for (var i = 0; i < dataService.tasks.data.length; i++)
                        if (result.records[dataService.tasks.data[i].id].style_rule)
                            dataService.tasks.data[i].style_class = SOC.STYLE_PREFIX + result.records[dataService.tasks.data[i].id].style_rule.sys_id;
                    gantt.parse(dataService.tasks, "json");
                }
            });

            $scope.$on("sn.aside.change_soc_side.open_share", function(event, model) {
                shareService.model = model;
                $scope.openView("share");
            });

            $scope.$on("sn.aside.change_soc_side.open_share:closed", function(event, model) {
                $scope.openView("share");
            });

            $scope.$on("sn.aside.change_soc_side.historyBack.completed", function(e, view) {
                $scope.activeAside = view.title;
            });

            function getView(name, template, isChild) {
                return {
                    scope: $scope,
                    title: name,
                    templateUrl: getTemplateUrl(template),
                    isChild: isChild
                };
            }

            // Global keyboard shortcuts
            $document.on("keydown", function(event) {
                // Open keyboard help side
                if (event.shiftKey && event.which == SOC.KEYS.SLASH && event.originalEvent.target.tagName !== "INPUT") {
                    $scope.$apply(function() {
                        if ($scope.activeAside === "keyboard") {
                            $scope.$broadcast("sn.aside.change_soc_side.close");
                            if (event)
                                event.target.blur();
                        } else {
                            $scope.activeAside = "keyboard";
                            $scope.$broadcast("sn.aside.change_soc_side.open", getView("keyboard", "sn_chg_soc_aside_keyboard.xml"), "320px");
                        }
                    });
                }
            });

            var getChildTaskDividerClass = function(start, end, task) {
                if (!task.parent)
                    return "";

                var classStyle = " " + SOC.STYLE_CLASS_MAP.soc_row_child;

                var nextTask = this.ganttChart.getNext(task.id);
                nextTask = nextTask ? this.ganttChart.getTask(nextTask) : null;
                var previousTask = this.ganttChart.getPrev(task.id);
                previousTask = previousTask ? this.ganttChart.getTask(previousTask) : null;

                // Only child task for a parent
                if (previousTask && !previousTask.parent)
                    if (!nextTask || (nextTask && !nextTask.parent))
                        return classStyle += " " + SOC.STYLE_CLASS_MAP.soc_row_child_single;

                // First child task for their parent
                if (previousTask && !previousTask.parent && (nextTask && nextTask.parent))
                    return classStyle += " " + SOC.STYLE_CLASS_MAP.soc_row_child_start;

                // Last child task for their parent
                if (previousTask && previousTask.parent && ((nextTask && !nextTask.parent) || !nextTask))
                    return classStyle += " " + SOC.STYLE_CLASS_MAP.soc_row_child_end;

                return classStyle;
            };

            var defineClassTemplate = function(start, end, task) {
                var classStyle = "";

                if (this.type)
                    classStyle += SOC.STYLE_CLASS_MAP[this.type];

                classStyle += getChildTaskDividerClass.call({
                    ganttChart: this.ganttChart
                }, null, null, task);

                if (task.style_class)
                    classStyle += " " + task.style_class;

                return classStyle;
            };

            var dateToStr = gantt.date.date_to_str(gantt.config.task_date);

            function updateMarkerInterval(gantt, markerId) {
                var today = gantt.getMarker(markerId);
                today.start_date = new Date();
                today.title = dateToStr(today.start_date);
                gantt.updateMarker(markerId);
            }

            function addNowMarker(gantt) {
                var markerId = gantt.addMarker({
                    start_date: new Date(),
                    css: "today-marker",
                    title: dateToStr(new Date()),
                    text: " "
                });
                setInterval(updateMarkerInterval(gantt, markerId), 1000 * 60);
            }

            function addScheduleSpanStyle(definition) {
                var socStyleSheet = $document[0].createElement("style");
                socStyleSheet.id = "soc_schedule_style";
                $document[0].head.appendChild(socStyleSheet);

                var maintColor = definition.maintenance_span_color.value ? definition.maintenance_span_color.value : SOC.MAINT_SPAN_COLOR;
                var blackoutColor = definition.blackout_span_color.value ? definition.blackout_span_color.value : SOC.BLACKOUT_SPAN_COLOR;

                var spanStyleSheet;
                for (var i = 0; i < $document[0].styleSheets.length; i++)
                    if ($document[0].styleSheets[i].ownerNode.id === socStyleSheet.id) {
                        spanStyleSheet = $document[0].styleSheets[i];
                        break;
                    }

                if (!spanStyleSheet)
                    return;

                spanStyleSheet.insertRule("div.schedule-bar.maint {background-color: " + maintColor + ";}", 0);
                spanStyleSheet.insertRule("div.schedule-bar.blackout {background-color: " + blackoutColor + ";}", 0);
            }

            changeSoCCtrl.initPage = function() {
                dataService.initPage(urlService.socId).then(function() {
                    styleService.initStyle();

                    // Setup for share panel
                    changeSoCCtrl.share.canWrite = dataService.canWrite();

                    // Setup configuration panel
                    configService.showBlackoutOption = configService.showBlackoutSchedules = dataService.definition.show_blackout.value;
                    configService.showMaintOption = configService.showMaintSchedules = dataService.definition.show_maintenance.value;
                    configService.setChildRecords(dataService.child_table);

                    // Need to apply changes due to style info
                    var socStyleSheet = document.createElement("style");
                    socStyleSheet.id = "soc_span_style";
                    document.head.appendChild(socStyleSheet);
                    socStyleSheet.innerHTML = dataService.style.style_sheet;

                    addScheduleSpanStyle(dataService.definition);

                    var gantt = ganttChart.getGantt(urlService.socId);
                    gantt.templates.grid_row_class = defineClassTemplate.bind({
                        ganttChart: gantt,
                        type: "",
                    });
                    gantt.templates.task_row_class = getChildTaskDividerClass.bind({
                        ganttChart: gantt
                    });
                    gantt.templates.task_class = defineClassTemplate.bind({
                        ganttChart: gantt,
                        type: "soc_event_bar",
                    });
                    gantt.render();

                    // Need to provide the tasks so it can calc min/max
                    ganttScale.setDateRange(dataService.tasks.data);
                    ganttScale.configureScale();
                    gantt.clearAll();
                    addNowMarker(gantt);
                    // these are the created tasks that will be added to the gantt
                    gantt.parse(dataService.tasks, "json");
                    if (dataService.tasks.data.length > 0) {
                        gantt.showTask(dataService.tasks.data[0].id);
                        $scope.noResults = false;
                    } else
                        $scope.noResults = true;
                }).catch(function(response) {
                    socNotification.show("error", response.data.error.message);
                });
            };

            $scope.filter = {
                filterConditions: ["number", "config_item", "Short Description", "children.number", "children.config_item"],
                placeholderText: i18n.getMessage("Search Change Schedule")
            };

            function buildFilterData() {
                var augmentedData = dataService.tasks.data;
                dataService.tasks.data.forEach(function(obj, index) {
                    augmentedData[index].children = dataService.getChildren(obj.id);
                });
                return augmentedData;
            }

            $scope.$on("textSearch", function(event, textSearch) {
                var filteredRecords = TextSearchService.getFilteredArray(buildFilterData(), textSearch);
                ganttChart.updateGanttData(urlService.socId, filteredRecords);
                $scope.noResults = filteredRecords.length === 0;
            });

            $scope.isLoading = function() {
                return $scope.$parent.loading;
            };

            changeSoCCtrl.messages = {
                "No records to display": i18n.getMessage("No records to display"),
                "No records match the filter": i18n.getMessage("No records match the filter"),
                "Change Schedule": i18n.getMessage("Change Schedule"),
                "Close panel": i18n.getMessage("Close panel"),
                "Configuration": i18n.getMessage("Configuration"),
                "Share": i18n.getMessage("Share"),
                "Open context menu": i18n.getMessage("Open context menu"),
                "Filter": i18n.getMessage("Filter"),
                "Keyboard Shortcuts": i18n.getMessage("Keyboard Shortcuts"),
                "Search Change Schedule": i18n.getMessage("Search Change Schedule"),
                "Span Styles": i18n.getMessage("Span Styles"),
                "Today": i18n.getMessage("Today"),
                "Zoom in": i18n.getMessage("Zoom in"),
                "Zoom out": i18n.getMessage("Zoom out"),
                "Page left": i18n.getMessage("Page left"),
                "Page right": i18n.getMessage("Page right"),
                "Show today": i18n.getMessage("Show today")
            };

            $scope.noResults = false;
            var noResultsElem = "<div class='no-results' aria-live='polite' aria-label='" + changeSoCCtrl.messages["No records to display"] + "'>" + changeSoCCtrl.messages["No records to display"] + "</div>";

            function noResults(newValue, oldValue) {
                if (newValue === oldValue)
                    return;
                if (newValue) {
                    angular.element("div.gantt_marker.today-marker").hide();
                    angular.element("div.gantt_task_scale").after(noResultsElem);
                } else {
                    angular.element("div.gantt_marker.today-marker").show();
                    angular.element("div.no-results").remove();
                }
            }
            $scope.$watch("noResults", noResults);
        }
    ])
    .filter("objectKeys", [function() {
        return function(anObject) {
            if (!anObject)
                return null;
            return Object.keys(anObject);
        };
    }])
    .filter("objectKeysLength", [function() {
        return function(anObject) {
            if (!anObject)
                return null;
            return Object.keys(anObject).length;
        };
    }]);
