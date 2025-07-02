//Once this is saved, it will show up in UI Builder as a Data Resource which can be selected if the user wants to fetch system property table values.
function transform(input){
//property_name is one of the properties that the UX Transform Data broker needs. It's a field name.
var property_name = input.property_name;
var objProp = {};
if(!property_name){
objProp.errorValue = 'Please provide the property name.';
return objProp;
}
var grSysProp = new GlideRecord('sys_properties');
grSysProp.addQuery('name',input.property_name);
grSysProp.query();
if(grSysProp.next()){
objProp.value = grSysProp.getValue('value');
}
if(!objProp.hasOwnProperty('value')){
objProp.noPropertyFound = `The property ${property_name} was not found.`;
return objProp;
}
return objProp;
}
