/**
 * Dynamic Report Builder for ServiceNow
 * 
 * Advanced utility for programmatic report creation, configuration, and automation.
 * Provides flexible reporting capabilities with dynamic field selection, filtering,
 * and visualization generation.
 * 
 * Features:
 * - Programmatic report creation and configuration
 * - Dynamic field selection and filtering
 * - Advanced aggregation and grouping
 * - Custom chart and visualization generation
 * - Scheduled report automation
 * 
 * @author ServiceNow Developer Community
 * @version 1.0.0
 * @requires ServiceNow Madrid+, Reporting Plugin
 */

/**
 * Dynamic Report Builder Class
 */
var DynamicReportBuilder = Class.create();
DynamicReportBuilder.prototype = {
    
    initialize: function() {
        this.config = {
            maxRecords: 10000,
            defaultTimeout: 300000, // 5 minutes
            enableCaching: true,
            cacheExpiration: 3600000, // 1 hour
            supportedChartTypes: ['line', 'bar', 'pie', 'column', 'area', 'scatter'],
            supportedFormats: ['html', 'pdf', 'excel', 'csv', 'json']
        };
        
        this.reportDefinition = {
            title: '',
            description: '',
            table: '',
            fields: [],
            filters: [],
            groupBy: [],
            orderBy: [],
            aggregations: [],
            chartConfig: null,
            formatting: {},
            scheduling: null
        };
    },
    
    /**
     * Create new report definition
     */
    createReport: function(title, table, description) {
        this.reportDefinition.title = title || 'Dynamic Report';
        this.reportDefinition.table = table;
        this.reportDefinition.description = description || '';
        
        // Validate table exists
        if (!this._validateTable(table)) {
            throw new Error('Invalid table: ' + table);
        }
        
        return this;
    },
    
    /**
     * Add fields to report
     */
    addFields: function(fieldConfig) {
        if (Array.isArray(fieldConfig)) {
            fieldConfig.forEach(field => this._addField(field));
        } else {
            this._addField(fieldConfig);
        }
        return this;
    },
    
    /**
     * Add single field with configuration
     */
    _addField: function(fieldConfig) {
        const field = {
            name: fieldConfig.name || fieldConfig,
            label: fieldConfig.label || this._getFieldLabel(fieldConfig.name || fieldConfig),
            type: fieldConfig.type || this._getFieldType(fieldConfig.name || fieldConfig),
            aggregation: fieldConfig.aggregation || null,
            format: fieldConfig.format || null,
            sortable: fieldConfig.sortable !== false,
            visible: fieldConfig.visible !== false,
            width: fieldConfig.width || null
        };
        
        this.reportDefinition.fields.push(field);
    },
    
    /**
     * Add filters to report
     */
    addFilters: function(filterConfig) {
        if (Array.isArray(filterConfig)) {
            filterConfig.forEach(filter => this._addFilter(filter));
        } else {
            this._addFilter(filterConfig);
        }
        return this;
    },
    
    /**
     * Add single filter
     */
    _addFilter: function(filterConfig) {
        const filter = {
            field: filterConfig.field,
            operator: filterConfig.operator || '=',
            value: filterConfig.value,
            condition: filterConfig.condition || 'AND',
            dynamic: filterConfig.dynamic || false,
            userSelectable: filterConfig.userSelectable || false
        };
        
        this.reportDefinition.filters.push(filter);
    },
    
    /**
     * Add grouping configuration
     */
    addGrouping: function(groupConfig) {
        if (Array.isArray(groupConfig)) {
            this.reportDefinition.groupBy = groupConfig;
        } else {
            this.reportDefinition.groupBy.push(groupConfig);
        }
        return this;
    },
    
    /**
     * Add sorting configuration
     */
    addSorting: function(sortConfig) {
        if (Array.isArray(sortConfig)) {
            this.reportDefinition.orderBy = sortConfig;
        } else {
            this.reportDefinition.orderBy.push(sortConfig);
        }
        return this;
    },
    
    /**
     * Add aggregations
     */
    addAggregations: function(aggConfig) {
        if (Array.isArray(aggConfig)) {
            aggConfig.forEach(agg => this._addAggregation(agg));
        } else {
            this._addAggregation(aggConfig);
        }
        return this;
    },
    
    /**
     * Add single aggregation
     */
    _addAggregation: function(aggConfig) {
        const aggregation = {
            field: aggConfig.field,
            function: aggConfig.function, // SUM, COUNT, AVG, MIN, MAX
            label: aggConfig.label || (aggConfig.function + '(' + aggConfig.field + ')'),
            format: aggConfig.format || null
        };
        
        this.reportDefinition.aggregations.push(aggregation);
    },
    
    /**
     * Configure chart visualization
     */
    addChart: function(chartConfig) {
        if (!this.config.supportedChartTypes.includes(chartConfig.type)) {
            throw new Error('Unsupported chart type: ' + chartConfig.type);
        }
        
        this.reportDefinition.chartConfig = {
            type: chartConfig.type,
            title: chartConfig.title || this.reportDefinition.title,
            xAxis: chartConfig.xAxis,
            yAxis: chartConfig.yAxis,
            series: chartConfig.series || [],
            options: chartConfig.options || {},
            colors: chartConfig.colors || null,
            width: chartConfig.width || 800,
            height: chartConfig.height || 400
        };
        
        return this;
    },
    
    /**
     * Configure report formatting
     */
    setFormatting: function(formatConfig) {
        this.reportDefinition.formatting = {
            theme: formatConfig.theme || 'default',
            fontFamily: formatConfig.fontFamily || 'Arial',
            fontSize: formatConfig.fontSize || 12,
            headerColor: formatConfig.headerColor || '#f5f5f5',
            alternateRows: formatConfig.alternateRows !== false,
            showBorders: formatConfig.showBorders !== false,
            showGridlines: formatConfig.showGridlines !== false,
            pageOrientation: formatConfig.pageOrientation || 'portrait',
            margins: formatConfig.margins || { top: 20, right: 20, bottom: 20, left: 20 }
        };
        
        return this;
    },
    
    /**
     * Configure report scheduling
     */
    setScheduling: function(scheduleConfig) {
        this.reportDefinition.scheduling = {
            enabled: scheduleConfig.enabled || false,
            frequency: scheduleConfig.frequency || 'daily',
            time: scheduleConfig.time || '08:00',
            timezone: scheduleConfig.timezone || gs.getUser().getTimezone(),
            recipients: scheduleConfig.recipients || [],
            format: scheduleConfig.format || 'pdf',
            conditions: scheduleConfig.conditions || [],
            subject: scheduleConfig.subject || 'Scheduled Report: ' + this.reportDefinition.title,
            body: scheduleConfig.body || 'Please find the attached report.'
        };
        
        return this;
    },
    
    /**
     * Execute report and return data
     */
    execute: function(options) {
        options = options || {};
        
        try {
            // Build query
            const query = this._buildQuery(options);
            
            // Execute query with caching
            const data = this._executeQuery(query, options);
            
            // Process data
            const processedData = this._processData(data, options);
            
            // Generate output
            return this._generateOutput(processedData, options);
            
        } catch (error) {
            gs.error('DynamicReportBuilder: Error executing report: ' + error.message);
            throw error;
        }
    },
    
    /**
     * Build GlideRecord query from definition
     */
    _buildQuery: function(options) {
        const gr = new GlideRecord(this.reportDefinition.table);
        
        // Apply filters
        this.reportDefinition.filters.forEach(filter => {
            if (filter.dynamic) {
                // Handle dynamic filters (e.g., relative dates)
                const dynamicValue = this._resolveDynamicValue(filter.value);
                gr.addQuery(filter.field, filter.operator, dynamicValue);
            } else {
                gr.addQuery(filter.field, filter.operator, filter.value);
            }
        });
        
        // Apply additional filters from options
        if (options.additionalFilters) {
            options.additionalFilters.forEach(filter => {
                gr.addQuery(filter.field, filter.operator, filter.value);
            });
        }
        
        // Apply ordering
        if (this.reportDefinition.orderBy.length > 0) {
            this.reportDefinition.orderBy.forEach(order => {
                if (typeof order === 'string') {
                    gr.orderBy(order);
                } else {
                    gr.orderBy(order.field);
                    if (order.direction === 'desc') {
                        gr.orderByDesc(order.field);
                    }
                }
            });
        }
        
        // Set limits
        const maxRecords = options.maxRecords || this.config.maxRecords;
        gr.setLimit(maxRecords);
        
        return gr;
    },
    
    /**
     * Execute query with caching support
     */
    _executeQuery: function(gr, options) {
        const cacheKey = this._generateCacheKey(gr, options);
        
        // Check cache if enabled
        if (this.config.enableCaching && !options.bypassCache) {
            const cachedData = this._getCachedData(cacheKey);
            if (cachedData) {
                return cachedData;
            }
        }
        
        // Execute query
        const startTime = new Date();
        gr.query();
        
        const data = [];
        while (gr.next()) {
            const record = {};
            
            // Extract specified fields
            this.reportDefinition.fields.forEach(field => {
                record[field.name] = this._getFieldValue(gr, field);
            });
            
            // Add system fields if needed
            record.sys_id = gr.getUniqueValue();
            record.sys_created_on = gr.getValue('sys_created_on');
            record.sys_updated_on = gr.getValue('sys_updated_on');
            
            data.push(record);
        }
        
        const executionTime = new Date() - startTime;
        gs.info('DynamicReportBuilder: Query executed in ' + executionTime + 'ms, returned ' + data.length + ' records');
        
        // Cache results
        if (this.config.enableCaching) {
            this._setCachedData(cacheKey, data);
        }
        
        return data;
    },
    
    /**
     * Process raw data with aggregations and grouping
     */
    _processData: function(data, options) {
        let processedData = data;
        
        // Apply grouping if specified
        if (this.reportDefinition.groupBy.length > 0) {
            processedData = this._groupData(processedData);
        }
        
        // Apply aggregations
        if (this.reportDefinition.aggregations.length > 0) {
            processedData = this._aggregateData(processedData);
        }
        
        // Apply formatting
        processedData = this._formatData(processedData);
        
        return processedData;
    },
    
    /**
     * Group data by specified fields
     */
    _groupData: function(data) {
        const grouped = {};
        
        data.forEach(record => {
            const groupKey = this.reportDefinition.groupBy
                .map(field => record[field] || 'NULL')
                .join('|');
            
            if (!grouped[groupKey]) {
                grouped[groupKey] = {
                    groupValues: {},
                    records: []
                };
                
                // Store group values
                this.reportDefinition.groupBy.forEach(field => {
                    grouped[groupKey].groupValues[field] = record[field];
                });
            }
            
            grouped[groupKey].records.push(record);
        });
        
        return grouped;
    },
    
    /**
     * Apply aggregations to data
     */
    _aggregateData: function(data) {
        if (typeof data === 'object' && !Array.isArray(data)) {
            // Grouped data
            Object.keys(data).forEach(groupKey => {
                const group = data[groupKey];
                group.aggregations = this._calculateAggregations(group.records);
            });
        } else {
            // Non-grouped data
            const aggregations = this._calculateAggregations(data);
            return {
                records: data,
                aggregations: aggregations
            };
        }
        
        return data;
    },
    
    /**
     * Calculate aggregations for a set of records
     */
    _calculateAggregations: function(records) {
        const results = {};
        
        this.reportDefinition.aggregations.forEach(agg => {
            const values = records.map(record => parseFloat(record[agg.field]) || 0);
            
            switch (agg.function.toUpperCase()) {
                case 'SUM':
                    results[agg.label] = values.reduce((a, b) => a + b, 0);
                    break;
                case 'AVG':
                    results[agg.label] = values.reduce((a, b) => a + b, 0) / values.length;
                    break;
                case 'MIN':
                    results[agg.label] = Math.min(...values);
                    break;
                case 'MAX':
                    results[agg.label] = Math.max(...values);
                    break;
                case 'COUNT':
                    results[agg.label] = records.length;
                    break;
                case 'COUNT_DISTINCT':
                    const uniqueValues = [...new Set(records.map(r => r[agg.field]))];
                    results[agg.label] = uniqueValues.length;
                    break;
            }
            
            // Apply formatting if specified
            if (agg.format) {
                results[agg.label] = this._formatValue(results[agg.label], agg.format);
            }
        });
        
        return results;
    },
    
    /**
     * Format data values
     */
    _formatData: function(data) {
        const formatData = (records) => {
            return records.map(record => {
                const formatted = {};
                
                this.reportDefinition.fields.forEach(field => {
                    let value = record[field.name];
                    
                    if (field.format) {
                        value = this._formatValue(value, field.format);
                    }
                    
                    formatted[field.name] = value;
                });
                
                return formatted;
            });
        };
        
        if (Array.isArray(data)) {
            return formatData(data);
        } else if (data.records) {
            data.records = formatData(data.records);
            return data;
        } else {
            // Grouped data
            Object.keys(data).forEach(groupKey => {
                data[groupKey].records = formatData(data[groupKey].records);
            });
            return data;
        }
    },
    
    /**
     * Generate output in specified format
     */
    _generateOutput: function(data, options) {
        const format = options.format || 'json';
        
        const output = {
            metadata: {
                title: this.reportDefinition.title,
                description: this.reportDefinition.description,
                table: this.reportDefinition.table,
                generatedAt: new Date().toISOString(),
                recordCount: this._getRecordCount(data),
                fields: this.reportDefinition.fields,
                chartConfig: this.reportDefinition.chartConfig
            },
            data: data
        };
        
        switch (format.toLowerCase()) {
            case 'json':
                return output;
            case 'html':
                return this._generateHTML(output);
            case 'csv':
                return this._generateCSV(output);
            case 'excel':
                return this._generateExcel(output);
            default:
                return output;
        }
    },
    
    /**
     * Generate HTML output
     */
    _generateHTML: function(output) {
        let html = '<html><head><title>' + output.metadata.title + '</title>';
        html += '<style>' + this._generateCSS() + '</style></head><body>';
        html += '<h1>' + output.metadata.title + '</h1>';
        
        if (output.metadata.description) {
            html += '<p>' + output.metadata.description + '</p>';
        }
        
        // Generate table
        html += this._generateHTMLTable(output.data);
        
        // Generate chart if configured
        if (this.reportDefinition.chartConfig) {
            html += this._generateHTMLChart(output.data);
        }
        
        html += '</body></html>';
        return html;
    },
    
    /**
     * Generate CSV output
     */
    _generateCSV: function(output) {
        const headers = this.reportDefinition.fields.map(field => field.label).join(',');
        const rows = [];
        
        const processRecords = (records) => {
            records.forEach(record => {
                const row = this.reportDefinition.fields.map(field => {
                    let value = record[field.name] || '';
                    if (typeof value === 'string' && value.includes(',')) {
                        value = '"' + value.replace(/"/g, '""') + '"';
                    }
                    return value;
                }).join(',');
                rows.push(row);
            });
        };
        
        if (Array.isArray(output.data)) {
            processRecords(output.data);
        } else if (output.data.records) {
            processRecords(output.data.records);
        }
        
        return headers + '\n' + rows.join('\n');
    },
    
    /**
     * Utility methods
     */
    
    _validateTable: function(tableName) {
        try {
            const gr = new GlideRecord(tableName);
            return gr.isValid();
        } catch (error) {
            return false;
        }
    },
    
    _getFieldLabel: function(fieldName) {
        try {
            const ge = new GlideElement();
            ge.setTableName(this.reportDefinition.table);
            ge.setColumnName(fieldName);
            return ge.getLabel() || fieldName;
        } catch (error) {
            return fieldName;
        }
    },
    
    _getFieldType: function(fieldName) {
        try {
            const ge = new GlideElement();
            ge.setTableName(this.reportDefinition.table);
            ge.setColumnName(fieldName);
            return ge.getType() || 'string';
        } catch (error) {
            return 'string';
        }
    },
    
    _getFieldValue: function(gr, field) {
        let value = gr.getValue(field.name);
        
        // Handle reference fields
        if (field.type === 'reference') {
            return {
                value: value,
                display_value: gr.getDisplayValue(field.name)
            };
        }
        
        return value;
    },
    
    _formatValue: function(value, format) {
        switch (format.type) {
            case 'currency':
                return this._formatCurrency(value, format.currency || 'USD');
            case 'percent':
                return (parseFloat(value) * 100).toFixed(format.decimals || 2) + '%';
            case 'date':
                return new GlideDateTime(value).getDisplayValue();
            case 'number':
                return parseFloat(value).toFixed(format.decimals || 2);
            default:
                return value;
        }
    },
    
    _formatCurrency: function(value, currency) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(parseFloat(value));
    },
    
    _resolveDynamicValue: function(value) {
        // Handle relative dates and other dynamic values
        if (typeof value === 'string') {
            if (value.startsWith('DAYS_AGO:')) {
                const days = parseInt(value.split(':')[1]);
                const date = new GlideDateTime();
                date.addDaysLocalTime(-days);
                return date.getValue();
            }
            // Add more dynamic value handlers as needed
        }
        return value;
    },
    
    _generateCacheKey: function(gr, options) {
        const query = gr.getEncodedQuery();
        return 'report_cache_' + gs.getUser().getID() + '_' + 
               GlideChecksum.getMD5CheckSum(query + JSON.stringify(options));
    },
    
    _getCachedData: function(key) {
        // Implementation would use actual caching mechanism
        return null;
    },
    
    _setCachedData: function(key, data) {
        // Implementation would use actual caching mechanism
    },
    
    _getRecordCount: function(data) {
        if (Array.isArray(data)) {
            return data.length;
        } else if (data.records) {
            return data.records.length;
        } else {
            // Grouped data
            let count = 0;
            Object.keys(data).forEach(key => {
                count += data[key].records.length;
            });
            return count;
        }
    },
    
    type: 'DynamicReportBuilder'
};
