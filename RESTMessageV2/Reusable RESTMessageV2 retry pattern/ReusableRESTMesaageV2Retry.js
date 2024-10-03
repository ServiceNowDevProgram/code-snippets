/**
 * Retries a given function multiple times with a delay between each attempt.
 *
 * @param {Function} func - The function to be executed and potentially retried on failure.
 * @param {number} retries - The number of times to retry the function if it fails or returns a null/undefined result.
 * @param {number} delayTime - The delay time between retries, in milliseconds.
 * 
 * @returns {any} - Returns the result of the function if successful within the allowed retries; 
 *                  otherwise, returns the last result (which may be null or undefined).
 *
 * The function attempts to execute the provided `func()` and checks for a non-null result. If the result is null
 * or an exception occurs, it retries the function up to the specified `retries`, with a delay of `delayTime`
 * milliseconds between each attempt.
 *
 * Example usage:
 * 
 * function getToken() {
 *     // Simulated operation that might fail
 *     var request = new sn_ws.RESTMessageV2("token", "GET");
 *     var response = request.execute();
 *     var statusCode = response.getStatusCode();
 *     var result = null;
 *     switch(statusCode) {
 *         case 200:
 *             result = JSON.parse(response.getBody());
 *             break;
 *         default:
 *             throw new Error("request failed, http status code: " + statusCode);
 *     }
 *     return result;
 * }
 * 
 * var result = retry(getToken, 3, 2000);  // Try 3 times, with a 2-second delay between each attempt
 * gs.info("Operation result: " + result);
 */
function retry(func, retires, delayTime) {
    var result = null;
    for(var i = 0; i < retires; i++) {
        try {
            result = func();
            //error handling could depending on the implementation of func
            if(!gs.nil(result)) return result;
        } catch (error) {
            gs.error(error);
        }
        gs.sleep(delayTime);
    }
    return result;
}


