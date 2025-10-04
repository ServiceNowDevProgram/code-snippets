********** HTML CODE ************
<? xml version = "1.0" encoding = "utf-8" ?>
    <j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">
        <body>
            <div id="source-html">
                <h1>Heading</h1>
                <h2>Heading 1</h2>
                <h3>Heading 2</h3>
                <button id="btn-export" onclick="exportHTML();">Export to
                    word doc</button>
            </div>
        </body>
    </j:jelly>
********* End of HTML *************

********* Client Script ************
    function exportHTML() {
        var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
            "xmlns:w='urn:schemas-microsoft-com:office:word' " +
            "xmlns='http://www.w3.org/TR/REC-html40'>" +
            "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
        var footer = "</body></html>";
        var sourceHTML = header + document.getElementById("source-html").innerHTML + footer;

        var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        var fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = 'document.doc';
        fileDownload.click();
        document.body.removeChild(fileDownload);
    }
    ********* End of Client Script ************
