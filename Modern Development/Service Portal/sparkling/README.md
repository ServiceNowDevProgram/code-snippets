# Sparkling text effect
Simple directive that provides a visually sparkling effect on an element with class `sparkling`.

e.g. `<span class="sparkling">Hello world</span>`

![sparkling animation](sparkling.gif)

## Installation
1. create an angular provider with the following code
```javascript
function sparkling($timeout) {
  return {
    restrict: "C",
    link: function (scope, element) {
      var color = "#FFC700";
      var svgPath =
        "M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 36.9884 50.7065 44.5 43.5C51.6431 36.647 68 34 68 34C68 34 51.6947 32.0939 44.5 25.5C36.5605 18.2235 34 0 34 0C34 0 33.6591 17.9837 26.5 25.5Z";

      function sparkling() {
        var sparklingElement = element;
        var stars = sparklingElement.find(".star");

        // remove the first star when more than 6 stars existing
        if (stars.length > 5) {
          stars.each(function (index) {
            if (index === 0) {
              $(this).remove();
            }
          });
        }
        // add a new star
        sparklingElement.append(addStar());

        var rand = Math.round(Math.random() * 700) + 300;
        scope.timer = $timeout(sparkling, rand);
      }

      scope.$on("$destroy", function () {
        $timeout.cancel(scope.timer);
      });

      sparkling();

      function addStar() {
        var size = Math.floor(Math.random() * 20) + 10;
        var top = Math.floor(Math.random() * 100) - 50;
        var left = Math.floor(Math.random() * 100);

        return (
          '<span class="star" style="top:' +
          top +
          "%; left:" +
          left +
          '%;">' +
          '<svg width="' +
          size +
          '" height="' +
          size +
          '" viewBox="0 0 68 68" fill="none">' +
          '<path d="' +
          svgPath +
          '" fill="' +
          color +
          '" /></svg></span>'
        );
      }
    },
  };
}

```
2. attach the provider to any widget that might be using that class
3. provide the following code to your portal theme
```css
/* sparkling stars */
/*******************/
@-webkit-keyframes comeInOut {
    0% { transform: scale(0); }
    50% { transform: scale(1); }
    100% { transform: scale(0); }
}
@-moz-keyframes comeInOut {
    0% { transform: scale(0); }
    50% { transform: scale(1); }
    100% { transform: scale(0); }
}
@-o-keyframes comeInOut {
    0% { transform: scale(0); }
    50% { transform: scale(1); }
    100% { transform: scale(0); }
}
@keyframes comeInOut {
    0% { transform: scale(0); }
    50% { transform: scale(1); }
    100% { transform: scale(0); }
}

@-webkit-keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(180deg); }
}
@-moz-keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(180deg); }
}
@-o-keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(180deg); }
}
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(180deg); }
}

.sparkling {
    position: relative;    
    z-index: 0;        
}

.sparkling > span {
    z-index: -1;
    position: absolute;
    display: block;
    animation: comeInOut 700ms forwards;
}

.sparkling > span > svg {
    display: block;
    animation: spin 1000ms linear;
}

```


