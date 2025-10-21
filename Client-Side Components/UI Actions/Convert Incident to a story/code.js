// Get caller ID from the incident record
var callerID = current.caller.id;

// Initialize new story record
var gr = new GlideRecord("rm_story");
gr.short_description = current.short_description; // Copy short description
gr.description = current.description;       // Copy full description
gr.type = "Fix";                                  // Set story type to 'Fix'

// Assign caller as both requirements owner and tester
gr.u_tester = current.caller_id;

// Link story to originating incident
gr.u_created_from = current.sys_id; //cutom field to populate incident record or request -not required

// Insert story and capture its sys_id
var sysID = gr.insert();

// Store story sys_id on incident for traceability
current.rm_story_id = sysID;

// Update incident record
var mySysID = current.update();

// Display confirmation message with story number
gs.addInfoMessage("Agile Story " + gr.number + " created");

// Redirect user to newly created story
action.setRedirectURL(gr);

// Set return URL to original incident
action.setReturnURL(current);
