# Debugging Import Sets & Transform Maps

When you load data and execute the transform maps via the platform UI, it runs in the background which means it is not accessible to the Script Debugger.

Using this snippet you can pass the Import Set sys_id (in a state of Pending) and it will execute all the transform maps on that import set in the foreground, and be available to step through any code in the Script Debugger.
