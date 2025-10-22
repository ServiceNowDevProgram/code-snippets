
function include({
    imports
}) {
    return {
      
        //Function for executing create record data broker with the required arguments
        
      createRecord: (api, dataResource, table, templateFields, useSetDisplayValue) => {
            try {
                api.data[dataResource].execute({
                    table: table,
                    templateFields: templateFields,
                    useSetDisplayValue: useSetDisplayValue

                });
            } catch (ex) {
                console.log(`Create Operation error: ${ex}`);
            }
        },
        // Function for executing update record data broker with the required arguments
        updateRecord: (api, dataResource, table, recordId, templateFields, useSetDisplayValue) => {
            try {
                api.data[dataResource].execute({
                    table: table,
                    recordId: recordId,
                    templateFields: templateFields,
                    useSetDisplayValue: useSetDisplayValue

                });
            } catch (ex) {
                console.log(`Update Operation error: ${ex}`);
            }
        },
        
        //Function for executing delete record data broker with the required arguments
        deleteRecord: (api, dataResource, table, recordId) => {
            try {
            api.data[dataResource].execute({
                table: table,
                recordId: recordId

            });
            }
            catch(ex) {
                console.log(`Delete Operation error: ${ex}`);
            }
        },



    };

}
