/**
* You can add this as clean-up script to a clone profile or run as fix script, background script etc. manually on the target instance after cloning.
*
*
* Prerequisites:
*
* 1) You need to have the target instance's banner image attached to a record on the source system,  
* e.g. have a knowledge article in production with the banner attached to it.
*
* 2) Make sure the table above mentioned table and record and included in your clone!
*
* 3) Set the source table name and the source record's sys_id as values for srcTbl and srcRec variables in the below section!
**/

/** MAKE SURE TO SET THESE 2 VARIABLES **/
var srcTbl = ''; // TABLE NAME, e.g. kb_knowledge
var srcRec = ''; // SYS ID of the record that you have attached the target instance's banner

// Copy attachment from KBA
GlideSysAttachment.copy(srcTbl,srcRec,'sys_properties','3458de2aff7102007729ffffffffff7c'); // glide.product.image.light
GlideSysAttachment.copy(srcTbl,srcRec,'sys_properties','71e1b8dac0a8016a01ea6a1ca634c46d'); // glide.product.image

// Get attachment sys_ids
var lightIMG = new GlideRecord('sys_attachment');
lightIMG.addQuery('table_sys_id','3458de2aff7102007729ffffffffff7c');
lightIMG.setLimit(1);
lightIMG.query();
var lightIMGID = '';
while(lightIMG.next()){
  lightIMGID = lightIMG.sys_id;
}

var IMG = new GlideRecord('sys_attachment');
IMG.addQuery('table_sys_id','71e1b8dac0a8016a01ea6a1ca634c46d ');
IMG.setLimit(1);
IMG.query();
var IMGID = '';
while(IMG.next()){
  IMGID = IMG.sys_id;
}

// Set attachment sys_id in respective properties
var propLightIMG = new GlideRecord('sys_properties');
propLightIMG.get('3458de2aff7102007729ffffffffff7c');
propLightIMG.setValue('value',lightIMGID + '.iix');
propLightIMG.update();

var propIMG = new GlideRecord('sys_properties');
propIMG.get('71e1b8dac0a8016a01ea6a1ca634c46d');
propIMG.setValue('value',IMGID + '.iix');
propIMG.update();
