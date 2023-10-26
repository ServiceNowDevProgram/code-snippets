
# Add box-shadow to a field

## problem statement

Adjust the box-shadow of a field

## CSS Explanation

```css
/* shadow 1 */
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

/* shadow 2 */
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

/* shadow 3 */
box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

/* shadow 4 */
box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;

/* shadow 5 */
box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

/* shadow 6 */
box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

/* shadow 7 */
box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;

/* shadow 8 */
box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;

/* shadow 9 */
box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;

/* shadow 10 */
box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
```


> showcase various box shadow effects by manipulating the color, position, blur radius, and spread radius of the shadows.
 

## Demo Example

HTML AND CSS

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body{
      display: flex;
      flex-wrap: wrap;
      padding: 100px;
      height: auto;
    }
    .shadow-example {
      width: 200px;
      height: 100px;
      margin: 20px;
      padding: 20px;
      color: #0a0a0a;
      font-weight: bold;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="shadow-example" style="box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">
    Shadow 1
  </div>
  <div class="shadow-example" style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;">
    Shadow 2
  </div>
  <div class="shadow-example" style="box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;">
    Shadow 3
  </div>
  <div class="shadow-example" style="box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;">
    Shadow 4
  </div>
  <div class="shadow-example" style="box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;">
    Shadow 5
  </div>
  <div class="shadow-example" style="box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;">
    Shadow 6
  </div>
  <div class="shadow-example" style="box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;">
    Shadow 7
  </div>
  <div class="shadow-example" style="box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;">
    Shadow 8
  </div>
  <div class="shadow-example" style="box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;">
    Shadow 9
  </div>
  <div class="shadow-example" style="box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;">
    Shadow 10
  </div>
</body>
</html>

```

## box-shadow display

![img](https://i.imgur.com/CkBt0ZE.png)