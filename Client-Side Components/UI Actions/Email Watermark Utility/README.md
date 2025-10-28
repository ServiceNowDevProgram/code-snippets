# Outlook Email Watermark Utility for ServiceNow

# Overview
This reusable utility allows users to send emails **outside ServiceNow** (e.g., using Outlook or any default mail client) while still  maintaining the conversation within ServiceNow.  
By embedding a unique watermark reference, any replies to the email will automatically append to the original record's activity feed.

This helps teams collaborate externally without losing internal record visibility — ideal for customers or vendors who communicate via Outlook.

---

# Objective
- Enable ServiceNow users to send Outlook emails directly from a record.  
- Maintain conversation history in ServiceNow using watermark tracking.  
- Make the solution **generic**, reusable across tables (Incident, Change, Request, etc.).  
- Prevent dependency on outbound mail scripts or custom integrations.  

# Components

## 1. Script Include: GenericEmailUtility
Handles the logic for:
- Constructing the mailto: link.  
- Fetching recipient and instance email addresses.  
- Generating or retrieving the watermark ID.  
- Returning a formatted Outlook link to the client script.

## Key Methods
1. get_Outlook_link() - Builds the full Outlook mail link with subject, body, and watermark.
2. getWatermark(record_id, table_name) - Ensures a watermark exists for the record.
3. getEmail(user_id) - Fetches the email address for the target user.

## 2. UI Action (Client Script)
Executes on the record form when the button/link is clicked.  
It gathers record data, constructs a payload, calls the Script Include using GlideAjax, and opens Outlook.

## Key Steps
1. Collect field data like requestor, short description, and description.  
2. Pass record details to the Script Include (GenericEmailUtility).  
3. Receive a ready-to-use Outlook link.  
4. Open the mail client with prefilled details and watermark reference.  

## How It Works
1. User clicks "Send Outlook Email" UI Action on a record.
2. Script gathers record data and passes it to GenericEmailUtility.
3. The utility builds a 'mailto:' link including the watermark.
4. Outlook (or default mail client) opens with pre-filled To, CC, Subject, and Body fields.
5. When the recipient replies, ServiceNow uses the watermark to append comments to the correct record.

## Example Usage
**User clicks “Send Outlook Email”** on a Request record:  
Outlook opens prefilled like this:

<img width="288" height="65" alt="image" src="https://github.com/user-attachments/assets/b58c5e0a-d80a-40ca-9ab5-f188a1203169" />


<img width="710" height="496" alt="image" src="https://github.com/user-attachments/assets/5cbc7645-4233-4826-99f7-e2948bb5ab78" />

