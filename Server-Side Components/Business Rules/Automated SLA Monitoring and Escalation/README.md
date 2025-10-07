**Create a New Business Rule:**

    1. Navigate to System Definition > Business Rules in your ServiceNow instance.
    
    2. Click on New to create a new business rule.

**Configure the Business Rule:**

    1. Name: Set a descriptive name (e.g., "SLA Breach Check").
    
    2. Table: Set to Incident.
    
    3. When: Select Before.
    
    4. Insert: Check this box.
    
    5. Update: Check this box.
    
    6. Condition: You can set it to check if the state is "In Progress" and if the SLA is about to breach.
    
    Use the following condition script:
    
    '''current.state == 'In Progress' && current.sla_due <= gs.minutesAgo(30);'''
