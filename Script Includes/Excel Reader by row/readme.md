# Excel attachment parser row by row
Iterates over each row in the worksheet and calls the provided callback function for each row. Assumes the first sheet has the data

# Example

```
    var excelReader = new ExcelReaderHelper("sys_id_of_attachment");
    excelReader.forEachRow(function(row){
        gs.log(JSON.stringify(row));
    });

```