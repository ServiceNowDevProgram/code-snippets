# Stopwatch
A script include that can be used as a stop watch when measuring the performance of a script or when want to show the elapsed time of an operation.


## Example Script
```javascript
	var watch = new Stopwatch();
	watch.start();
	gs.sleep(1000); // Do something
	watch.stop();
	gs.log(watch.getElapsedTimeMilliseconds());
```