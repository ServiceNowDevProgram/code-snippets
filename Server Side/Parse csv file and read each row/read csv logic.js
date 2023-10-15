//read the file
  var gsa = new GlideSysAttachment(); //attachment api to read the attachment 
  var bytesInFile = gsa.getBytes('sys_email', table_sys_id); // tablename, table sysID from the attachment table
  var originalContentsInFile = Packages.java.lang.String(bytesInFile); // java package get bytes in the file
  originalContentsInFile = String(originalContentsInFile);
  var fileData = originalContentsInFile.split('\n');
  var csvHeaders = fileData[0] ; //get header(first row from the CSV file)
 var arrOfarr =[]; //array to store
for(i=1 ; i<fileData.length -1 ; i++){ //loop through each row
    var rowDetails = fileData[i] ;
    var rowValues = rowDetails.split(',');
    var firstColumn = rowValues[0] //first row , first column after headers
    var firstColumn = rowValues[2] //2nd column
    //we can get all the columns, rows in the same way and can store as an array or validate/update to tables if required.
}
