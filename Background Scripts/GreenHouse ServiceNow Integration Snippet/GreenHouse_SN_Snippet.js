  var instanceName = gs.getProperty('instance_name');
  var hr = new GlideRecord('sn_hr_core_profile');
  hr.addEncodedQuery('user.active=true^user.u_worker_idISNOTEMPTY^u_worker_type=EE^u_greenhouse_idISNOTEMPTY');
  hr.query();
  while (hr.next()) {

      var workerID = hr.user.u_worker_id + '';
      var greenhouseID = hr.getValue('u_greenhouse_id');
      var userSys = hr.user.sys_id.toString();

      var key = 'Basic ' + gs.getProperty('sn_hr_core.greenhouseApiKey');

      var r = new sn_ws.RESTMessageV2('Greenhouse', 'Retrieve Candidate');
      r.setStringParameterNoEscape('id', greenhouseID);
      r.setStringParameterNoEscape('Authorization', key);

      var response = r.execute();
      var responseBody = response.getBody();
      var httpStatus = response.getStatusCode();

      var rBody = JSON.parse(responseBody);

      var attachments = rBody.attachments;

      for (var i = 0; i < attachments.length; i++) {

          var type = attachments[i].type + '';
          var fileName = attachments[i].filename + '';
          var docType = '';
          var encodedUri = attachments[i].url;
          //var decodedUrl = decodeURI(encodedUri);
          //var url = decodedUrl.replace(/ /g, '%20');

          if (type == 'offer_packet' || type == 'signed_offer_letter' || type == 'offer_letter') {

              docType = '3a4a029adb3bac9444c5ebd8489619d1';

          } else if (type == 'resume') {

              docType = '9af9ca5adb3bac9444c5ebd8489619a3';

          } else if (type == 'form_attachment' || type == 'cover_letter' || type == 'other') {

              docType = '696549a3dbbfe41044c5ebd8489619c5';

          }

          var newDoc = new GlideRecord('sn_hr_ef_employee_document');
          newDoc.newRecord();
          newDoc.employee = userSys;
          newDoc.document_type = docType;
          newDoc.u_title = fileName;
          newDoc.insert();

          var request = new sn_ws.RESTMessageV2();
          request.setHttpMethod('get');
          request.setEndpoint(encodedUri);
          request.saveResponseBodyAsAttachment('sn_hr_ef_employee_document', newDoc.sys_id, fileName);
          var response1 = request.execute();

      }
  }
