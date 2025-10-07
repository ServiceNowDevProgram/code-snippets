function arrayElementsToNumber(array) {
    return array.map(Number);
}

function arrayElementsToString(array) {
    return array.map(String);
}

arrayElementsToNumber(['1', '2', '3'])
arrayElementsToString([1, 2, 3])
