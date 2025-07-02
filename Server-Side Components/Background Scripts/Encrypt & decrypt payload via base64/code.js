var obj ={};
obj.name = 'Mohit Kaushik';
obj.email ='Mohit.1@abc.com';
obj.contact = '1234567890';

var str = JSON.stringify(obj,null,4);

var encryption = GlideStringUtil.base64Encode(str);
gs.info(encryption);

var decrypt = GlideStringUtil.base64Decode(encryption);
gs.info(JSON.stringify(decrypt,null,2));
