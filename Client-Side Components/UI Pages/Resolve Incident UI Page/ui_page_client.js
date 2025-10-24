// Below code will be used in client script of UI page as mentioned in README.md file

function ResolveIncidentOnsubmit(sysId) {     //This function is called in UI page HTML section When user clicks the Submit button
      var rejectionReason = document.getElementById('resolution_reason').value.trim();
      var resolutionCode = document.getElementById('resolution_code').value.trim();
      if (!rejectionReason || rejectionReason === ' ') {
          alert('Resolution Notes is a mandatory field.');
          return false;
      }
      if (resolutionCode == 'None') {
          alert('Resolution Code is a mandatory field.');
          return false;
      }
      var ga = new GlideAjax('ResolutionProcessor');
      ga.addParam('sysparm_name', 'updateRecord');
      ga.addParam('sysparm_record_id', sysId);
      ga.addParam('sysparm_reason', rejectionReason);
      ga.addParam('sysparm_resolution', resolutionCode);
      ga.getXML(handleSuccessfulSubmit);
      GlideDialogWindow.get().destroy();
      return false;
      function handleSuccessfulSubmit(answer) {
          window.location.reload();
      }
  }
  function closeDialog() {
      GlideDialogWindow.get().destroy();
      return false;
  }
