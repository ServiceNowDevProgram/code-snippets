function CountdownController($interval) {
  /* widget controller */
  var c = this;
  c.state = '';

  c.upgrade = function () {
    c.state = 'upgradeCountdown';
    c.countDown = 10;

    var timer = $interval(function (count) {
      c.countDown--;
      if (c.countDown == 0) {
        $interval.cancel(timer);
        c.state = '';
      }
    }, 1000);
  };

}
