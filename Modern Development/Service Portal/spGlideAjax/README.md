# spGlideAjax

This is a demo of promise like service which allows to make a GlideAjax call directly from the controller function.
The service has a single method called `getAnswer` which returns a promise, which is then resolved directly to the answer attribute from the XML response.
The method accepts 3 parameters:
* `processor` - name of the client callable script include
* `name` - method name you would like to execute
* `params` - object containing additional parameters

## Installation

1. create an angular provider with the name `spGlideAjax`
2. paste the content of `spGlideAjaxService.js` into the client script field
3. associate the angular provider with the widget where you would like to use it
4. you can now use it as described within [example usage](#example-usage)

> :information_source: for more info visit [docs](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/build/service-portal/task/angular-providers.html)

## Example usage

```javascript
api.controller = function (spGlideAjax) {
  /* widget controller */
  var c = this;

  c.getGlideDateTime = function (ms) {
    spGlideAjax
      .getAnswer("DateTimeUtils", "msToGlideDateTime", {
        sysparm_value: ms,
      })
      .then(
        function (resp) {
          console.log(resp);
        },
        function (error) {
          console.error(error);
        }
      );
  };
};
```
