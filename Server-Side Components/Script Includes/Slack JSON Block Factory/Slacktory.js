//Class def
var Slacktory = Class.create();
Slacktory.prototype = {
	
    initialize: function() {},
	
	/*
	innerText [String]: The text for the text.text property
		- if not supplied, defaults to an empty string
	*/
	sectionBlock: function(innerText){
		var facBlock = {};
        facBlock.type = 'section';
        facBlock.text = {};
        facBlock.text.type = 'plain_text';
        facBlock.text.text = innerText ? innerText : '';
		return facBlock;
	},
	
	/*
    innerText [String]: The text to be inserted into the block's text.text property.
        - if not supplied, defaults to an empty string.
	*/
	sectionMarkdownBlock: function(innerText){
		var facBlock = {};
		facBlock.type = 'section';
		facBlock.text = {};
		facBlock.text.type = 'mrkdwn';
		facBlock.text.text = innerText ? innerText : '';
		return facBlock;
	},

	/*
		innerTexts [Array]: An array of strings to be inserted into the block's text.text property.
	*/
	multiFieldSectionMarkdownBlock: function(innerTexts){
		var facBlock = {};
		facBlock.type = 'section';
		facBlock.fields = [];

        innerTexts.forEach(function(innerText){
            var field = {};
            field.type = 'mrkdwn';
            field.text = innerText;
            facBlock.fields.push(field);
        });
		return facBlock;
	},

	/*
		innerText [String]: The text to be inserted into the block's element's text.text property.
			- This is 100% required ( even if it's just an emoji... )

		ex: 

		block = contextMarkdownBlock(':blank:\n:sn-info: *Information*');
	*/
	contextMarkdownBlock: function(innerText){
		var facBlock = {};
		facBlock.type = 'context';
		facBlock.elements = [];
		if(Array.isArray(innerText)){
			innerText.forEach(function(t){
				element = {};
				element.type = 'mrkdwn';
				element.text = t;
				facBlock.elements.push(element);
			});
		}
		else{
			element = {};
			element.type = 'mrkdwn';
			element.text = innerText;
			facBlock.elements.push(element);
		}
		return facBlock;
	},

	/*
		headerText [String]: The text to be inserted into the block's text.text property.
		table [String]: The table that is being referenced (e.g. 'sys_user' or 'task')
		record [String]: The sys_id of the record that is being referenced

		record can be directly passed by name, as it is defined earlier.

		table can (sometimes) be passed by name as it is defined earlier.
		The only exception here is when the table name is not the way to directly reference the list.
		For example, INC, SCTASK, and RITM all live on the `task` table, but the table would be the
		corresponding `inc`, `sc_task`, etc.

		ex:

		block = headerBlockWithOpenInServiceNow('Record', table, record);

		If the table name does not mach the list name, you can pass the table name as a string:

		block = headerBlockWithOpenInServiceNow('Record', 'task', record);
	*/
	headerBlockWithOpenInServiceNow: function(headerText, table, record){
		var facBlock = this.sectionMarkdownBlock(headerText);
		this.buttonAdder(facBlock, 'Open in ServiceNow', (gs.getProperty('glide.servlet.uri') + 'nav_to.do?uri=' + table + '.do?sys_id=' + record));
		return facBlock;
	},

	/*
		Add a button that will open a specified URL on press. This should NOT be used to add Modals,
		as modal URLs will not play nice with block.accessory.url
	
		block [Object]: The block to add the button to.
		buttonText [String]: The text label for the button.
		buttonUrl [String]: The url that the button will link to.
	*/
	buttonAdder: function(block, buttonText, buttonUrl){
		block.accessory = {};
		block.accessory.type = 'button';
		block.accessory.style = 'primary';
		block.accessory.text = {};
		block.accessory.text.type = 'plain_text';
		block.accessory.text.text = buttonText;
		block.accessory.url = buttonUrl;
		return block;
	},
	/*
		Modal adder should be used for adding any non-url-explicit-redirect functionality (More Info, View Workflow, etc.)
		Modals must be added as block.accessory.value instead of block.acessory.url, hence the separate function.
	
		block [Object]: The block to add the button to.
		buttonText [String]: The text label for the button.
		buttonValue [String]: The value the modal will spit back to the modal info SRAPI. [eg: 'variables|' + gr.sys_id, 'workflow|' + gr.sys_id]
	*/
	modalAdder: function(block, buttonText, buttonValue){
		block.accessory = {};
		block.accessory.type = 'button';
		block.accessory.text = {};
		block.accessory.text.type = 'plain_text';
		block.accessory.text.text = buttonText;
		block.accessory.value = buttonValue;
		return block;
	},
	
	/*
		Switch adder should be used for adding any form-controlling switcher functionality (e.g., changing active from true to false, etc.)
		
		block [Object]: The block to add the switch to.
		placeholderText [String]: The text that will display intermittently in Slack when the provided choices do not.
		initialOptionIndex [Integer]: The integer index of the object that should be shown as selected originally, as is it located in objArray.
		objArray [Object Array]: Array of options that should be provided to define what the switch options will be. Form of the object:
			[
				{
					"text": "...", [String]: The label of the option
					"value": "...", [String]: The action that the modal will send back when the option is selected. Usually should be in the format: "descriptive_action_name|sys_id_of_record"
				},
				etc.
			]
	*/
	switchAdder: function(block, placeholderText, initialOptionIndex, objArray){
		block.accessory = {};
		block.accessory.type = 'static_select';
		block.accessory.placeholder = {};
		block.accessory.placeholder.type = 'plain_text';
		block.accessory.placeholder.text = placeholderText;
		block.accessory.options = [];

		objArray.forEach(function(e, index){
			var obj = {};
			obj.text = {};
			obj.text.type = 'plain_text';
			obj.text.text = e.text;
			obj.value = e.value;

			block.accessory.options.push(obj);

			if(index == initialOptionIndex) block.accessory.initial_option = obj;
		});
		
		return block;
	},

    type: 'Slacktory'
};