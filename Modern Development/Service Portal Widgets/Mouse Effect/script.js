api.controller=function($scope, $element) {
    var lightBall = $element.find('.light-ball');
    
    // Update the position of the light ball on mouse move
    document.addEventListener('mousemove', function(event) {
        var mouseX = event.pageX + 10; // Offset by 10px to the right
        var mouseY = event.pageY + 10; // Offset by 10px to the bottom
        
        // Apply the position to the light ball
        lightBall.css({
            transform: 'translate(' + (mouseX - 30) + 'px, ' + (mouseY - 30) + 'px)'
        });
    });
}
