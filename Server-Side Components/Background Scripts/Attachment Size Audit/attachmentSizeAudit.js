// Background Script: Attachment Size Audit
// Purpose: Analyzes your ServiceNow instance's attachment storage to identify which tables and individual files consume the most space. 
//Helps you understand storage usage patterns, locate oversized files, and plan cleanup or archival strategies. 
//Provides a read-only audit report without modifying any data.
//
// Author: Masthan Sharif Shaik
// Date: October 2025
// Tested on: Zurich, Yokohama
//
// IMPORTANT: Test in non-production environment first

(function attachmentSizeAudit() {

    // ================= CONFIGURATION =================
    var TOP_N_ATTACHMENTS = 25;        // Number of largest attachments to list
    var MIN_SIZE_MB = 5;              // Only list attachments larger than this (MB)
    var USE_COMPRESSED_SIZE = true;   // true = use size_compressed, false = use size_bytes
    // =================================================

    var sizeField = USE_COMPRESSED_SIZE ? "size_compressed" : "size_bytes";
    var totalSizeBytes = 0;

    gs.info("=== Attachment Size Audit Started ===");
    gs.info("Using size field: " + sizeField.toUpperCase());

    // ----------------- TOTAL SIZE --------------------
    var totalAgg = new GlideAggregate("sys_attachment");
    totalAgg.addAggregate("SUM", sizeField);
    totalAgg.query();
    if (totalAgg.next()) {
        totalSizeBytes = totalAgg.getAggregate("SUM", sizeField);
    }

    gs.info("Total Attachment Storage: " +
        formatBytes(totalSizeBytes));

    // ------------- SIZE PER TABLE (AGGREGATED) --------------
    gs.info("\n=== Storage Usage by Table (Descending) ===");

    var tableAgg = new GlideAggregate("sys_attachment");
    tableAgg.groupBy("table_name");
    tableAgg.addAggregate("SUM", sizeField);
    tableAgg.orderByAggregate("SUM", sizeField);
    tableAgg.query();

    while (tableAgg.next()) {
        var table = tableAgg.getValue("table_name") || "<no table>";
        var tableSize = tableAgg.getAggregate("SUM", sizeField);
        gs.info(table.padEnd(40) + " : " + formatBytes(tableSize));
    }

    // --------------- TOP N BIGGEST ATTACHMENTS ---------------
    gs.info("\n=== Top " + TOP_N_ATTACHMENTS + " Largest Attachments (>" + MIN_SIZE_MB + " MB) ===");

    var attGR = new GlideRecord("sys_attachment");
    attGR.addQuery(sizeField, ">", MIN_SIZE_MB * 1024 * 1024); 
    attGR.orderByDesc(sizeField);
    attGR.setLimit(TOP_N_ATTACHMENTS);
    attGR.query();

    while (attGR.next()) {
        gs.info(
            "[ " + formatBytes(attGR[sizeField]) + " ] " +
            attGR.getValue("file_name") +
            "  |  Table: " + attGR.getValue("table_name") +
            "  |  Record: " + attGR.getValue("table_sys_id")
        );
    }

    gs.info("\n=== Attachment Size Audit Complete ===");

    // ------------- FORMATTER ----------------
    function formatBytes(bytes) {
        bytes = parseInt(bytes, 10) || 0;
        if (bytes < 1024) return bytes + " B";
        var i = Math.floor(Math.log(bytes) / Math.log(1024));
        var sizes = ["B", "KB", "MB", "GB", "TB"];
        var value = (bytes / Math.pow(1024, i)).toFixed(2);
        return value + " " + sizes[i];
    }

})();
