/* Secnario :
Whenever a record (for example, an Incident) is created or updated,
ServiceNow will automatically send a text prompt (like short description or work notes)
to OpenAI ChatGPT API, get the response, and save it back to a field (like u_ai_summary)*/

-----
//Business Rule Script (After Insert)
    try {
        // Build the prompt dynamically from the record
        var userPrompt = "Summarize this issue in one sentence: " + current.short_description;
        if (!userPrompt) return;

        // Prepare REST Message
        var rest = new sn_ws.RESTMessageV2('OpenAI ChatGPT', 'POST'); // name & method
        rest.setStringParameter('prompt', userPrompt); // replaces ${prompt} in body

        // Execute API call
        var response = rest.execute();
        var responseBody = response.getBody();
        var status = response.getStatusCode();

        if (status != 200) {
            gs.error("OpenAI API error: " + responseBody);
            return;
        }

        // Parse and store response
        var data = new global.JSON().decode(responseBody);
        var aiResponse = data.choices[0].message.content;

        // Save to custom field (u_ai_summary)
        current.u_ai_summary = aiResponse;
        current.update();

        gs.info("AI Summary added for incident: " + current.number);

    } catch (e) {
        gs.error("Error calling OpenAI ChatGPT: " + e.message);
    }


