# ServiceNow ↔ OpenAI ChatGPT Integration  
**Connect ServiceNow with ChatGPT using REST Message and Business Rule**

---

## Overview
This project demonstrates how to integrate **ServiceNow** directly with **OpenAI’s ChatGPT** platform using only native features - 
no Scripted REST APIs, no IntegrationHub, and no plugins required.  

The integration leverages:
- A **REST Message** (calling OpenAI’s API endpoint)  
- A **Business Rule** (triggering automatically on record updates)  

Once configured, ServiceNow can send ticket details (like short descriptions or work notes) to ChatGPT  
and store AI-generated responses back in the record — such as incident summaries, resolution hints, or category suggestions.

---

## Key Highlights

100% Native - Uses **RESTMessageV2** and **Business Rule** only  
Generates AI-based summaries, causes, or recommendations  
Works with **GPT-3.5-Turbo**, **GPT-4-Turbo**, or **GPT-4o-Mini** models  
Real-time execution after record creation or update  
No external plugin dependencies  

---

## Use Case Example
Whenever a new **Incident** is created or updated, ServiceNow automatically:
1. Sends the incident’s short description and work notes to **ChatGPT**.  
2. Receives an AI-generated summary or root cause statement.  
3. Saves the response in a custom field (`u_ai_summary`).  

This automation reduces manual summarization and speeds up triage.

---

## Prerequisites

| Requirement | Description |
|--------------|-------------|
| **OpenAI API Key** | Obtain from [https://platform.openai.com](https://platform.openai.com) |
| **Model** | Any `gpt-4o-mini`, `gpt-4-turbo`, or `gpt-3.5-turbo` |
| **ServiceNow Role** | admin / developer |
| **Custom Field** | Add a field `u_ai_summary` (String or HTML) on `incident` table |

---

## Step 1 — Create REST Message

**Name:** `OpenAI ChatGPT`  
**Endpoint:** `https://api.openai.com/v1/chat/completions`  
**HTTP Method:** `POST`

### Headers
| Name | Value |
|------|--------|
| Content-Type | application/json |
| Authorization | Bearer `YOUR_OPENAI_API_KEY` |

### Request Body
```json
{
  "model": "gpt-4o-mini",
  "messages": [
    { "role": "system", "content": "You are a helpful ITSM assistant." },
    { "role": "user", "content": "${prompt}" }
  ]
}
## — Create Business Rule

Table: incident
When: after insert or after update
Condition: short_description changes OR work_notes changes

Example Input (Incident Data)
| Field             | Value                                                  |
| ----------------- | ------------------------------------------------------ |
| Short Description | VPN not connecting for remote users                    |
| Work Notes        | User reports frequent disconnections during peak hours |

Example Response (from ChatGPT)
{
  "choices": [
    {
      "message": {
        "content": "Remote employees are unable to connect to the VPN consistently, possibly due to gateway timeout or bandwidth issues."
      }
    }
  ]
}
