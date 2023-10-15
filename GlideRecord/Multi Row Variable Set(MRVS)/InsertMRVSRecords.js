// Record Producer script to insert MRVS rows as records in the desired table:


var Ite = JSON.parse(producer.itinerary); // Enter MRVS NAME as producer.mrvs_name;
    if (Ite.length > 0) {
        for (j = 0; j < Ite.length; j++) {
            try {
                var gr_itr = new GlideRecord('itinerary_Table'); // Glide the required table 

                gr_itr.addQuery('u_number', producer.itinerary.getRow(j).itinerary_number);
                gr_itr.query();
                if (gr_itr.next()) {
                    // Update Functionality here
                } else {

                    gr_itr.initialize();
                    // Lets assume we have these variables 
                    gr_itr.setValue('u_mode_of_transport', producer.itinerary.getRow(j).mode_of_transport); //Write actual variable names: producer.mrvs_name.variable_Name.
                    gr_itr.setValue('u_flightnumber', producer.itinerary.getRow(j).FlightNumber);
                    gr_itr.setValue('u_origin_1', producer.itinerary.getRow(j).origin_1);
                    gr_itr.setValue('u_origin_2', producer.itinerary.getRow(j).origin_2);
                    gr_itr.setValue('u_arrivaldatetime', producer.itinerary.getRow(j).Adt);
                    gr_itr.setValue('u_class', producer.itinerary.getRow(j).tr_class);
                    gr_itr.setValue('u_carrier', producer.itinerary.getRow(j).Carrier);
                    //gr_itr.setValue('u_status', producer.itinerary.getRow(j).date_To);
                    gr_itr.setValue('u_destination_1', producer.itinerary.getRow(j).destination_1);
                    gr_itr.setValue('u_destination_2', producer.itinerary.getRow(j).destination_2);
                    gr_itr.setValue('u_missiondestination', producer.itinerary.getRow(j).mission_destination);
                    gr_itr.setValue('u_departuredatetime', producer.itinerary.getRow(j).DepartureDatetime);
					gr_itr.setValue('u_no_match_found_origin', producer.itinerary.getRow(j).no_match_found_origin);
					gr_itr.setValue('u_no_match_found_dest', producer.itinerary.getRow(j).no_match_found_dest);
					gr_itr.setValue('u_origin_missing_city', producer.itinerary.getRow(j).OriginMissingCity);
					gr_itr.setValue('u_destination_missing_city', producer.itinerary.getRow(j).DestinationMissingCity);

                    gr_itr.setValue('u_official', producer.itinerary.getRow(j).official);

                    gr_itr.setValue('u_travelrequest', current.sys_id);

                    gr_itr.insert(); // At Last simply insert the records.
                }

            } catch (e) {
                   gs.addErrorMessage('Error in Itr' + e);
            }
        }
