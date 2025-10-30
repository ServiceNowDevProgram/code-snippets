(function() {
    var BANNER_TEXT = ' **SYSTEM ALERT:** Scheduled maintenance for all services will occur this Saturday from 1 AM to 4 AM UTC. Expect minor downtime. 🚨';
    var BANNER_BG_COLOR = '#ffcc00'; // Warning yellow
    var BANNER_TEXT_COLOR = '#333333';

    // Check if the user has already dismissed this version of the banner
    var isDismissed = (g_preference.get(PREF_KEY) === 'true');

    if (isDismissed) {
        return;
    }
    var banner = document.createElement('div');
    banner.setAttribute('id', 'global_announcement_banner');
    banner.innerHTML = BANNER_TEXT;
    banner.style.cssText = [
        'position: fixed;',
        'top: 0;',
        'left: 0;',
        'width: 100%;',
        'padding: 10px 40px 10px 15px;', // Added padding on the right for the close button
        'background-color: ' + BANNER_BG_COLOR + ';',
        'color: ' + BANNER_TEXT_COLOR + ';',
        'z-index: 10000;', // High z-index to ensure it sits on top of everything
        'text-align: center;',
        'font-weight: bold;',
        'box-shadow: 0 2px 5px rgba(0,0,0,0.2);'
    ].join('');
    var closeButton = document.createElement('span');
    closeButton.innerHTML = '×'; // Times symbol
    closeButton.style.cssText = [
        'position: absolute;',
        'top: 50%;',
        'right: 15px;',
        'transform: translateY(-50%);',
        'font-size: 20px;',
        'cursor: pointer;',
        'font-weight: normal;',
        'line-height: 1;'
    ].join('');

    closeButton.onclick = function() {
        // Remove the banner from the DOM
        banner.remove(); 
        
        // Set the User Preference so the banner stays dismissed across sessions
        g_preference.set(PREF_KEY, 'true');
    };
    banner.appendChild(closeButton);
    document.body.appendChild(banner);

})();
