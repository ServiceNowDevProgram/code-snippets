### Overview
The **Emotion-Aware Ticket Prioritizer** is an AI-driven innovation for ServiceNow that automatically analyzes the tone and emotion of user-submitted tickets (Incidents, HR Cases, etc.) to determine the urgency and emotional state of the user.  
If frustration or urgency is detected, the system dynamically increases the **priority**, adds contextual **work notes**, and routes the ticket to the right team — ensuring faster resolution and better user experience.

---

## How It Works
1. When a ticket is created, a **Business Rule** triggers a **Script Include** (`EmotionAnalyzer`).
2. The Script Include analyzes the short description and description text.
3. It detects emotional tone — *positive*, *neutral*, or *negative*.
4. Based on sentiment, the system:
   - Adjusts **priority** automatically  
   - Adds a **work note** with detected emotion  
   - Optionally, notifies the support team for urgent or frustrated cases  

---
