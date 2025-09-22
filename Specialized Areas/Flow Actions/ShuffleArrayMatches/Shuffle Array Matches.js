(function execute(inputs, outputs) {
 function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function createRandomPairs(array) {
    var shuffledArray = shuffleArray(array.slice()); // Make a copy of the array and shuffle it
    var pairs = [];
    for (var i = 0; i < shuffledArray.length; i += 2) {
        if (i + 1 < shuffledArray.length) {
            pairs.push([shuffledArray[i], shuffledArray[i + 1]]);
        } else {
            pairs.push([shuffledArray[i]]);
        }
    }
    return pairs;
}


var randomPairs = createRandomPairs(inputs.wheels);



    outputs.match = randomPairs;

})(inputs, outputs);
