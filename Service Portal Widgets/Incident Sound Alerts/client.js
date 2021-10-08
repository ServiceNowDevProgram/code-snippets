//Client Script for the widget
api.controller = function (spUtil, $scope) {
    /* widget controller */
    var c = this;

    spUtil.recordWatch($scope, "incident", "active=true^major_incident_state=accepted", function (name) {
        c.server.refresh();
        var audio = new Audio('Audio File Name.mp3'); //Add any audio file to the audio files module in the instance or use exisiting one.
        audio.play();
    });
};