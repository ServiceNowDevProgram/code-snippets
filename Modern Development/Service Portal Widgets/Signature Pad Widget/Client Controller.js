api.controller = function($scope) {
    var c = this;
    var canvas, ctx;
    var drawing = false;
    var lastPos = { x: 0, y: 0 };

    // Initialize after DOM is ready
    c.$onInit = function() {
        setTimeout(function() {
            canvas = document.getElementById('signature-pad');
            if (!canvas) return;

            // Get 2D drawing context
            ctx = canvas.getContext('2d');
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#000';

            // Mouse event listeners
            canvas.addEventListener('mousedown', startDraw);
            canvas.addEventListener('mousemove', draw);
            canvas.addEventListener('mouseup', endDraw);

            // Touch event listeners (for mobile/tablet)
            canvas.addEventListener('touchstart', startDraw);
            canvas.addEventListener('touchmove', draw);
            canvas.addEventListener('touchend', endDraw);
        }, 200);
    };

    // Get drawing position based on mouse or touch input
    function getPosition(event) {
        var rect = canvas.getBoundingClientRect();
        if (event.touches && event.touches[0]) {
            return {
                x: event.touches[0].clientX - rect.left,
                y: event.touches[0].clientY - rect.top
            };
        }
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    // Start drawing when mouse/touch pressed
    function startDraw(e) {
        drawing = true;
        lastPos = getPosition(e);
    }

    // Draw line on canvas while dragging
    function draw(e) {
        if (!drawing) return;
        e.preventDefault(); // Prevent page scrolling on touch
        var pos = getPosition(e);
        ctx.beginPath();
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        lastPos = pos;
    }

    // Stop drawing when mouse/touch released
    function endDraw() {
        drawing = false;
    }

    // Clear the canvas
    c.clearSignature = function() {
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawing = false;
    };

    // Convert signature to base64 image and attach
    c.attachSignature = function() {
        if (!ctx) return alert("Canvas not initialized.");
        var data = canvas.toDataURL('image/png'); // Get base64 encoded image
        alert("Signature captured successfully. It will be attached after submission.\n\n" + data);
    };
};
