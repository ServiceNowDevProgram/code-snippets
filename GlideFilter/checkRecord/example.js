var cond='short_description=certificate: Fingerprint: - Certificate Expired';
var emalert = new GlideRecord('em_alert');
emalert.query();

var bool = true;
 
while(emalert.next())
{
   bool = GlideFilter.checkRecord(emalert, cond);
   gs.info("Source "+ emalert.source + " is " + bool);
}
