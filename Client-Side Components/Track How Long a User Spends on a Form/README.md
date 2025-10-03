#  Form Timer – ServiceNow UX Tracker

Track how long users spend on a form before submitting it. Useful for UX analysis, training feedback, or identifying complex forms.

## 💡 Features

- Tracks time spent on form in seconds
- Displays message on submission

## 🛠 Setup

1. Add one Display BR and a Client Scripts:
   - `displayBR`: Starts timer
   - onLoad client script: set the start time
   - `onSubmit client script: Calculates and stores time
2. create a field u_spent_time to store the start time

## 🤝 Contributing

Ideas for improvement:
- Track time per section/tab
- Send data to analytics dashboard
- Visualize average time per user/form
