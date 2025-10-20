# Live Ticket Counter - Service Portal Widget.

## Use Case
The Live Ticket Counter widget displays a real-time count of incident tickets categorized by priority (Critical, High, Medium, Low). It visually updates with an animation to indicate refresh activity and allows users to click on any priority count to view a filtered list of tickets of that priority. This helps support teams monitor ticket load dynamically and quickly access relevant tickets for faster incident management.

## Why it's unique  
- Real-time ticket count updates without page refresh   
- Visual pulse animation highlights new critical tickets  
- Clickable cards open filtered ticket lists by priority  
- Beginner-friendly and easy to implement  

## How it is Useful in ServiceNow  
- Real-time updates keep support agents and managers instantly informed of critical ticket volume changes, helping prioritize work promptly.  
- Visible counts by priority enable supervision to redistribute workloads or escalate issues proactively.  
- Agents save time by accessing filtered ticket lists with a click instead of manually searching for tickets by priority.  
- The widget's last updated timestamp and auto-refresh toggle give users control and confidence in data freshness.  
- As a light, interactive component, it complements existing dashboards and pages without heavy customizations.  

## How to Use

1. Create Widget
   - Go to Service Portal > Widgets  
   - Click "New"  
   - Copy-paste HTML, Client Controller, Server Script, and CSS into appropriate sections  

2. Add to Page 
   - Place the widget on any Service Portal page where ticket monitoring is required  
   - Widget ID: `live_ticket_counter_sp`  

3. Test and Customize 
   - View tickets by clicking on priority cards  
   - Toggle auto-refresh and sound alerts  
   - Modify styling or priority levels as needed
  
## Compatibility
This Html , css , client , server code is compatible with all standard ServiceNow instances without requiring ES2021 features.

## Files
- `Live Ticket Counter.html`,`Live Ticket Counter .css`,`Server Script`,`Client Script`, — these are files.
