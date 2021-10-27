function convertCsvToSpreadsheet()
{
  var mainFolder = DriveApp.getFolderById('<FOLDER ID>');
  var uploadFolder = mainFolder.getFoldersByName('Uploaded').next();
  var downloadFolder = mainFolder.getFoldersByName('Downloaded').next();
  var uploadFiles = uploadFolder.getFiles();
  while(uploadFiles.hasNext())
  {
    var file = uploadFiles.next();
    var shtId = Drive.Files.copy({}, file.getId(), {convert:true}).id;
    var url = "https://docs.google.com/feeds/download/spreadsheets/Export?key=" + shtId + "&exportFormat=xlsx";
    var params = {
      method      : "get",
      headers     : {"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
      muteHttpExceptions: true
    };
    var blob = UrlFetchApp.fetch(url, params).getBlob();
    blob.setName(file.getName() + ".xlsx");
    downloadFolder.createFile(blob);
  }
}
