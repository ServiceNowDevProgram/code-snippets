// Initialize new GlideRecord for rm_story table
var gr = new GlideRecord("rm_story");

// Copy description from current record (likely a Requested Item or similar)
gr.description = current.description;

// Set story type to 'Enhancement'
gr.type = "Enhancement";

// Assign requested_for user as tester
gr.u_tester = current.request.requested_for; //custom field-optional

// Link story to source record via u_created_from field
gr.u_created_from = current.sys_id; //optional custom field to link request to story

// Insert the new story and capture its sys_id
var sysID = gr.insert();

// Store the story sys_id in the source record for traceability
current.rm_story_id = sysID;

// Update the source record
var mySysID = current.update();

// Display confirmation message with story number
gs.addInfoMessage("Agile Story " + gr.number + " created");

// Redirect user to the newly created story
action.setRedirectURL(gr);

// Set return URL to the original source record
action.setReturnURL(current);
