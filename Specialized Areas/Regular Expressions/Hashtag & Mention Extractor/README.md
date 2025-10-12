# Hashtag & Mention Extractor for ServiceNow

A simple yet useful **ServiceNow Background Script** that extracts all hashtags (`#example`) and mentions (`@user`) from any text input using regular expressions.

---

### 💡 Example Use Cases
- Automatically identify hashtags and mentions in **incident comments**, **knowledge articles**, or **survey feedback**.
- Extract tags or mentions from user input in **Catalog Items/Record Producers** to populate hidden variables or drive logic.

---
### 🚀 How to Run
1. In your ServiceNow instance, navigate to **System Definition → Scripts – Background**.  
2. Paste the script from this repository and adjust it according to your needs.  
3. Click **Run Script**.  

---

### 📦 Reusability
The logic is **self-contained** within a single function block - no dependencies or external calls.  
You can easily **copy and adjust it** to fit different contexts:
- Use it inside a **Business Rule**, **Script Include**, or **Flow Action Script** (see additional instructions below).  
- Replace the sample `demoData` with a field value (e.g., `current.description`) to analyze the data.  
- Adjust the regex to detect other patterns (emails, incident reference, etc.). See comments in the code for the additional examples.  

---

### 🔧 Possible Extensions
- Parse table data (`sys_journal_field`, `kb_knowledge`) instead of static text.  
- Store extracted tags in a custom table for analytics.  

---

### ℹ️ Additional Instructions:
#### Use in Script Include

1. Go to **Script Includes** in the Application Navigator.  
2. Click **New**, and name it (e.g., `TagExtractorUtils`).  
3. Set the following options:  
   - **Client Callable**: `false`  
   - **Accessible from**: `All application scopes`  
4. Paste this code:

```javascript
var TagExtractorUtils = Class.create();
TagExtractorUtils.prototype = {
    initialize: function () {},

    extract: function (text) {
        var result = {
            hashtags: text.match(/#[A-Za-z0-9_]+/g),
            mentions: text.match(/@[A-Za-z0-9_]+/g)
        };
        return result;
    },

    type: 'TagExtractorUtils'
};
```
5. Use it as any other script include.

#### Use in Business Rule with a couple of custom text fields and previously created script include

1. Go to **Business Rules** in the Application Navigator.  
2. Click **New**, choose a table (e.g., `sc_task`, `incident`).  
3. Set **When** to `before`, `after`, or `async` (usually `async`).  
4. In the **Script** section, call your tag-extracting logic:

```javascript
(function executeRule(current, previous /*null when async*/) {
    var text = current.short_description + ' ' + current.description;
    var tags = new TagExtractorUtils().extract(text);

    current.u_hashtags = tags.hashtags.join(', ');
    current.u_mentions = tags.mentions.join(', ');

})(current, previous);
```
#### Use in Flow Action Script and previously created script include

1. Go to **Flow Designer > Action** and click **New Action**.  
2. Give it a name like `Extract Tags from Text`.  
3. Add an **Input** (e.g., `input_text` of type String).  
4. Add a **Script step**, then paste the script there:

```javascript
(function execute(inputs, outputs) {
    var text = inputs.input_text || '';
    var tags = new TagExtractorUtils().extract(text);

    outputs.hashtags = tags.hashtags.join(', ');
    outputs.mentions = tags.mentions.join(', ');
})(inputs, outputs);
```
5. Use this **Action** in your flow to extract tags by passing the text to it as a parameter.

<sub>🤖 This contribution was partially created with the help of AI.</sub>
