Incident Sentiment Detector (No AI, Pure JavaScript)

A lightweight ServiceNow utility that detects sentiment (Positive / Negative / Neutral) of an Incident’s short description or comments using simple keyword matching — no AI APIs or external libraries required.

Useful for support teams to auto-tag sentiment and analyze user frustration or satisfaction trends without expensive integrations.

🚀 Features

✅ Detects sentiment directly inside ServiceNow ✅ Works without external APIs or ML models ✅ Instant classification on form update ✅ Adds detected sentiment to a custom field (u_sentiment) ✅ Simple to extend — just add more positive/negative keywords

🧩 Architecture Overview

The solution consists of two main scripts:

Component Type Purpose SentimentAnalyzer Script Include Processes text and returns sentiment Client Script (onChange) Client Script Calls SentimentAnalyzer via GlideAjax on short description change 🧱 Setup Instructions 1️⃣ Create Custom Field

Create a new field on the Incident table:

Name: u_sentiment

Type: Choice

Choices: Positive, Neutral, Negative
