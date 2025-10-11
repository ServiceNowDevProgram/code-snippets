function onLoad() {
    setTimeout(function() {
        var referenceElement = top.document.getElementsByClassName('btn btn-default bg-white lookup')[0];

        if (referenceElement != undefined || referenceElement != null)
            referenceElement.remove();
        
    }, 500);
}