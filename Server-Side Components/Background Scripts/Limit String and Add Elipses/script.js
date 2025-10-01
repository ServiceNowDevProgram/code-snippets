function addElipses(string, maxLength) {
    var maxLength = Number(maxLength);
    
        if (string.length > maxLength) {
            return string.substr(0, maxLength) + '...';
        }
    
    return string;
};

var StringName = 'hafsa asif razzak';
gs.info(addElipses(StringName, 5));