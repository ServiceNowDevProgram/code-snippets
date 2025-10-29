function onClickQR() {
    generateQRCodeForAsset(g_sysId);//get the sysid of selected record
}

function generateQRCodeForAsset(sys_id) {
    var ga = new GlideAjax('GenerateAssetQR');//Script Include which stores data to be presented when QR-Code is Scanned
    ga.addParam('sysparm_name', 'getAssetQRData');
    ga.addParam('sysparm_sys_id', sys_id);

    ga.getXMLAnswer(function(response) {
        var qrData = response;
        var qrURL = 'https://qrickit.com/api/qr.php?d=' + encodeURIComponent(qrData) + '&addtext=Get Asset Data';
         //QrIckit is a tool using which Customized QR-Codes can be generated
        var modalHTML = `
            <div style="text-align:center">
                <img id="qrCodeImage" src="${qrURL}" alt="QR Code" style="margin-bottom:10px;" />
                <p>Scan to view asset details</p>
            </div>
        `;

        var gModal = new GlideModal("QR Code");
        gModal.setTitle('Asset QR Code');
        gModal.setWidth(500);
        gModal.renderWithContent(modalHTML);
    });
}
