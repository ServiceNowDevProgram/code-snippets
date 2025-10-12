# Hashtag & Mention Extractor for ServiceNow

A simple yet useful **ServiceNow Background Script** that extracts all hashtags (`#example`) and mentions (`@user`) from any text input using regular expressions.

This script demonstrates how to apply JavaScript RegEx in server-side ServiceNow logic to parse, analyze, or extend user-generated text - ideal for text-analysis demos or lightweight automation projects.

---

## 💡 Example Use Cases
- Automatically identify hashtags and mentions in **incident comments**, **knowledge articles**, or **survey feedback**.  
- Build internal analytics to track trending topics like `#VPN`, `#email`, or `#network`.  

---
## 🚀 How to Run
1. In your ServiceNow instance, navigate to **System Definition → Scripts – Background**.  
2. Paste the script from this repository.  
3. Click **Run Script**.  

---

## 📦 Reusability
The logic is **self-contained** within a single function block — no dependencies or external calls.  
You can easily **copy and adjust it** to fit different contexts:
- Use it inside a **Business Rule**, **Script Include**, or **Flow Action Script**.  
- Replace the sample `demoData` with a field value (e.g., `current.comments`) to analyze live data.  
- Adjust the regex to detect other patterns (emails, keywords, etc.).  

This makes it a **plug-and-play snippet** for any ServiceNow application or table that requires quick text pattern recognition.

---

## 🔧 Possible Extensions
- Parse live table data (`sys_journal_field`, `kb_knowledge`) instead of static text.  
- Store extracted tags in a custom table for analytics.  
- Schedule a nightly “Top Tags” report with **Flow Designer** or **PA Widgets**.  
