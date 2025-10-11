# Generate QRCode on Service Portal
This example widget is a quick demonstration of what can be create a QRCode on portal

# Steps to add external dependencies to widget

1 - Go to widget > Dependencies

2 - Click New

3 - I named mine qrcode for both "name" and "angular module name"

4 - Click Save

5 - Click new under JS Includes

6 - Select URL for Source

7 - Input https://github.com/davidshimjs/qrcodejs/blob/master/qrcode.min.js

8 - Click Submit

9 - So now the external dependency will be added to your component

10 - Now to use the library you can use the code in your widget's client script

   - basic usage 

    ```javascript
    <div id="qrcode"></div>
    <script type="text/javascript">
        new QRCode(document.getElementById("qrcode"), "http://jindo.dev.naver.com/collie");
    </script> 
    ```

   - or with some options

    ```javascript 
    var qrcode = new QRCode("test", {
        text: "http://jindo.dev.naver.com/collie",
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    }); 
    ```

    - and you can use some methods
    ```javascript 
    qrcode.clear(); // clear the code.
    qrcode.makeCode("http://naver.com"); // make another code.  
    ```
# Oficial qrcodejs docs and lib https://www.npmjs.com/package/qrcodejs