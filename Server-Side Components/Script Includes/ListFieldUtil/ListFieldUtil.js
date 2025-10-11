var ListFieldUtil = function(listFieldVal) {
    if (listFieldVal == null || listFieldVal == undefined) {
        listFieldVal = "";
    }
    var _getIdx = function(id) {
        return listFieldVal.split(",").indexOf(id);
    };
    var exists = function(id) {
        return _getIdx(id) >= 0;
    };
    var remove = function(id) {
        return listFieldVal.split(",").filter(function(fid) {
            return fid != id;
        }).join(",");
    };
    var add = function(id) {
        if (!exists(id)) {
            var listFieldArr = listFieldVal.split(",");
            listFieldArr.push(id);
            return listFieldArr.join(",");
        }
        return listFieldVal;
    };
    return {
        "exists": exists,
        "remove": remove,
        "add": add
    };
};