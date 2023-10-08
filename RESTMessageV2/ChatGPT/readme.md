# ServiceNow GPT-4 Assistant

This script include allows you to interact with OpenAI's GPT-4 model to generate JavaScript code for ServiceNow. It's a handy tool for quickly generating code snippets based on your requirements.

## Getting Started

Before you can use this script, you'll need your own API key from OpenAI. Follow these steps to get started:

1. Sign up for an account on the [OpenAI platform](https://beta.openai.com/signup/).

2. Once you're logged in, go to the API settings to generate your API key.

3. Copy your API key, as you'll need it for configuring the script.

## Installation

1. Create a new Script Include in your ServiceNow instance.

2. Copy and paste the contents of the `ChatGPTClient` script include into the new script include you created.

3. Replace `'YOUR_API_KEY'` with the API key you obtained from OpenAI.

## Usage

Now that you have the script include set up, you can use it to generate JavaScript code based on your prompts. Here's an example of how to use it:

```javascript
// Create a new ChatGPTClient instance
var gptClient = new ChatGPTClient();

// Define the prompt for the GPT-4 model
var prompt = "In ServiceNow, I need a JavaScript business rule that triggers when a record is either inserted or updated in the 'incident' table. The rule should first check if the 'active' field is set to true. If it is true, the rule should then update the 'state' field to 1. Additionally, please ensure that the script adheres to ServiceNow best practices, includes necessary error handling, and covers the entire script. Your response should provide the complete code for this business rule.";

// Get a response from the GPT-4 model using the defined prompt
var response = gptClient.getChatGPTResponse(prompt);

// Log the JSON response with proper formatting
gs.info(JSON.stringify(response, null, '\t'));
```

This example demonstrates how to create an instance of `ChatGPTClient`, define a prompt, get a response from the GPT-4 model, and log the response.

## Note

Remember that this tool is designed to assist in generating code snippets and should be used as a starting point. Always review and test the generated code thoroughly in your ServiceNow instance before deploying it to production.