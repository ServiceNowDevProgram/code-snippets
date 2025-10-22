function calculateHash(attachmentId){
    var attachmentStream = new GlideSysAttachment().getContentStream(attachmentId);
    var gDigest = new GlideDigest();
    var sha256Hash = gDigest.getSHA256HexFromInputStream(attachmentStream);
    if (sha256Hash) {
        gs.info("Hash code of the attachment file: " + sha256Hash);
    }
}

