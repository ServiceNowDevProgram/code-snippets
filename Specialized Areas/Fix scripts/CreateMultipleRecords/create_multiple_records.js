var count = 0; 
var number = NUMBER_OF_RECORDS; //Enter the number of records to be created here


while (count< number) {
var gRec = new GlideRecord('NAME_OF_THE_TABLE'); //Enter the Glide Record Table name here
gRec.initialize(); //Create an empty glide record or use gRec.newRecord();// create records with default values
//gRec.<fieldName> = ""; //Optinal set Field values 
gRec.insert(); // insert the glide record into the table.
count++; // continue till number of record is met.
}


gs.print(number  + "records inserted");
