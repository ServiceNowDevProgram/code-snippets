# Smart Incident Categorizer using AI

## Description
Automatically categorizes incidents using OpenAI GPT-3.5 based on description content.

## Use Case
- Auto-assigns category when incidents are created without category
- Reduces manual categorization effort
- Improves consistency in incident classification

## Setup
1. Create system property: `openai.api.key` with your OpenAI API key
2. Create Business Rule on `incident` table
3. Set to run `before insert` when category is empty

## Categories
Returns one of: network, hardware, software, database, security, email

## Testing
Create incident without category - verify auto-assignment in work notes.
