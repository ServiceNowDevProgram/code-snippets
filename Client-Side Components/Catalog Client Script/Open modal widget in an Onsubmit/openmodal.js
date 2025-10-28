    function onSubmit() {

      
        if (g_scratchpad.isFormValid)
            return true;

      //We can do some check using a Client Callable script include
        var getAnswer = new GlideAjax('example');
        getAnswer.addParam('sysparm_name', 'checkFor');
        getAnswer.addParam('sysparm_input1', g_user.userID);
        getAnswer.addParam('sysparm_input2', g_form.getUniqueValue());

        getAnswer.getXML(parsing);

        function parsing(response) {

            var answer = response.responseXML.documentElement.getAttribute('answer');
            if (answer) {
                var data = JSON.parse(answer);
          
                if (data == true) {

                    spModal.open({
                        title: "Test title",
                        widget: "mywidget",
                        buttons: [{
                                label: 'Close',
                                value: 'close'
                            },
                            {
                                label: 'Create New Record',
                                value: 'create'
                            }
                        ],
                        size: 'md'
                    }).then(function(answer) {
                      //if button pressed is "create" then submit the form
                        if (answer.value == 'create') {
                            g_scratchpad.isFormValid = true;
                            g_form.submit();
                        }
                    });
                } else {
                    g_scratchpad.isFormValid = true;
                    g_form.submit();
                }

            }

        }
      //Dont submit the form
        return false;
    }
