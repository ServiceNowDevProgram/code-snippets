Script include is  created as translationUtil for dynamic language translation.  for example english to French

This script include for language translation will invoke flow designer action and sublfow to complete the real time language transaltion for instance suppose group table is updated with new group record having english as description text that can't be translated using OOTB translation tables in such scenario this UTIL will be a saviour

The properties referred in this translation util is DUMMY name that needs to be replaced with actual property name 

You need to Identify the AI translator for your language and update accordingly. 

More details....

This PR created for script include that contain TranslationUtil script and readme file that descrive 'How it server the purpose for Dynamic field translation using specific translator'

It will Fetches and calculates runtime limits for translation requests from system properties. Further it will dynamically retrieves the translation API key using getSubscriptionKey().

The scope of this utility ranges from multilingual support based on the user's preferred language to dynamic field translation through integration with Flows and Actions.

The scope of this PR & SI to provide a translationUtil, the custom flow action and subflow is not within the scope of this Util, if anyone wants to use it they need to create there own subflow that detect and translate the language by using this SI.

Details of Utils

TranslationUtils is a custom Script Include, created to manage dynamic text translation and language detection without depending on ServiceNow’s Out-of-the-box (OOTB) Translation plugin (like Dynamic Translation or Localization framework).
How it Works?

It will look for Custom REST connections (via http_connection and api_key_credentials)
Flow actions / subflows for actual translation and detection (global.detect_language, global.hhfksjhd__translate_text)
Custom batching, size limits, and buffer logic to optimize translation requests and avoid API overflows.
This SI will do the translation & detection of texts & give the translated data as JSON output
HOPE THIS HELPS TO CLARIFY.
