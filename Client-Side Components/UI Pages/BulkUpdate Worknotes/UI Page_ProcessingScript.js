// gs.info("Ticket List :"+ticket_list);

// Sepetation of ticket based on the comma.
var ticketlist = ticket_list;
var formatted_ticket_list = ticketlist.split(/[ ,]+/).filter(Boolean);
            var valid_ticket_list = [];
            var invalid_ticket_list = [];


		// Checks the first ten Incident ticket into an array which start with INC 
            for (var i = 0; i < formatted_ticket_list.length; i++) {
                if (formatted_ticket_list[i].startsWith('INC')) {
                    if (formatted_ticket_list[i].length == 10)
                        valid_ticket_list.push(formatted_ticket_list[i]);
                    else {
                        invalid_ticket_list.push(formatted_ticket_list[i]);
                    }
                } else {
                    invalid_ticket_list.push(formatted_ticket_list[i]);
                }
            }

	// Looping into each ticket to update the worknotes based on the table
			for (var k = 0; k < valid_ticket_list.length; k++) {
                var gr_inc = new GlideRecordSecure('incident');
                gr_inc.addQuery('number', valid_ticket_list[k]);
                gr_inc.query();

                if (gr_inc._next()) {
                    gr_inc['work_notes'] = work_note_to_apply;
                    gr_inc.update();
                } else {
                    //If the ticket number was not found, add to Invalid Ticket List 
                    invalid_ticket_list.push(valid_ticket_list[k]);
                }
            }
			
