function(spModal) {
    var c = this;
    console.log('Lol what are you doing here?');
    
    const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                         'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let inputSequence = [];
    let timeoutId;
    
    const handleKeyPress = (e) => {
        // Clear timeout to reset sequence if user pauses too long
        clearTimeout(timeoutId);
        
        // Add key to sequence
        inputSequence.push(e.key);
        
        // Keep only the last N keys (length of Konami code)
        if (inputSequence.length > KONAMI_CODE.length) {
            inputSequence.shift();
        }
        
        // Check if current sequence matches Konami code
        if (inputSequence.join(',') === KONAMI_CODE.join(',')) {
            activateCheats();
            inputSequence = []; // Reset after activation
        }
        
        // Reset sequence after 2 seconds of inactivity
        timeoutId = setTimeout(() => {
            inputSequence = [];
        }, 2000);
    };
    
    const activateCheats = () => {
        spModal.open({
            size: 'sm',
            title: 'Cheats activated',
            message: 'Konami code entered',
            buttons: [{ label: '${Close}', cancel: true }]
        });
    };
    
    document.addEventListener('keydown', handleKeyPress);
    
    // Cleanup listener when widget is destroyed
    c.$onDestroy = function() {
        document.removeEventListener('keydown', handleKeyPress);
        clearTimeout(timeoutId);
    };
}
