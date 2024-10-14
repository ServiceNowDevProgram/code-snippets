(function executeInboundAction(current, previous) {
    // Define the spam keywords that make us roll our eyes
    var spamKeywords = ['spam', 'advertisement', 'promotion', 'free', 'offer'];

    // Check if the subject or body is dripping with spammy vibes
    var subjectContainsSpam = spamKeywords.some(keyword => current.subject.toLowerCase().includes(keyword));
    var bodyContainsSpam = spamKeywords.some(keyword => current.body_text.toLowerCase().includes(keyword));

    // If we catch any spammy words, it’s time to take action
    if (subjectContainsSpam || bodyContainsSpam) {
        // Log the details of this spam attack for future reference
        gs.info('Spam email detected from: ' + current.from + ' with subject: ' + current.subject);
        
        // Abort further processing like a boss
        current.setAbortAction(true);
        
        // Optional: Flag it if you’re feeling extra fancy
        // current.spam_flag = true; // Assuming you have a field for this
    }
})(current, previous);
