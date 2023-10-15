# JSX cheat sheet

## Setting the **`class`** attribute

Trying to directly use `class` attribute in JSX syntax can yield some unexpected results since you need to provide an object with properties. Each property represents a class you want to add to the element and it will be added only if the assigned value will be truthy.

```jsx
/* will be transpiled into <div class="0 1 2 3 4 5 6"></div> */
const view = () => <div class="awesome"></div>

/* this will automatically add visible/enabled classes based on the provided expressions */
const classObject = {
	visible: isVisible
	enabled: isEnabled
}
const view = () => <div class={classObject}></div>

```

If you need to specify static class or assign multiple classes you can set the `className` property of the element. In case you need multiple classes you need to separate them by space. e.g.:

```jsx

<div className="awesome"></div>
<div className="awesome list"></div>
```

Another example is by using a `class-` prefix to the name of class you want to add:

```jsx
/* will generate <div class="visible enabled"></div> if both variables are true */
<div class-visible={isVisible} class-enabled={isEnabled}></div>
```

Trying to use multiple styles of class definitions doesn't seem to work as expected:

```jsx
/* will generate only the awesome class, the second one will be ignored */
<div className="awesome" class-visible={isVisible}></div>
```

## Using inline styles

Trying to assign inline style in JSX requires to pass an object with properties representing individual style props.

Notice that instead of `font-size` I used `fontSize` .

```jsx
/* This will lead to an error when browser will try to parse it */
<div style="font-size: 1.5rem; background-color: #2bb673;"></div>

<div style={{ fontSize: "1.5rem", backgroundColor: "#2bb673" }}></div>
```

## JSX components

Similar to the React, snabbdom also allows for creation of functional components that are just functions returning JSX elements. You can pass arbitrary properties and also access children.

Don't forget to use capital letter for your functional component. Otherwise it would be treated as a standard DOM element name.

```jsx
const Greetings = (props, children) => {
  return (
    <h2>
      {props.message} {children}
    </h2>
  );
};

const view = () => {
  return (
    <div>
      <Greetings message="Hello">Tomas 👋</Greetings>
    </div>
  );
};
```

## Using "inline" SVG

Trying to render SVG inline might give you some headaches since you will run into an issue when the browser will try to assign values to the read only properties of SVG elements. Instead you will need to prefix attributes with `attr-` prefix or use an `attrs={someObject}` notation.

```jsx
/* THIS DOESNT WORK */
<svg
  width="46"
  height="77"
  viewBox="0 0 46 77"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M12.5627 33.0787C12.5627 36.1551 13.4422 38.644 15.201 40.5447C16.9601 42.4467 19.4308 43.397 22.6135 43.397C25.7955 43.397 28.2664 42.4467 30.0252 40.5447C31.784 38.644 32.6635 36.1551 32.6635 33.0787C32.6635 30.003 31.784 27.5142 30.0252 25.6119C28.2664 23.7115 25.7955 22.7603 22.6135 22.7603C19.4308 22.7603 16.9601 23.7115 15.201 25.6119C13.4422 27.5142 12.5627 30.003 12.5627 33.0787ZM0 33.0787C0 29.8353 0.58653 26.8994 1.75876 24.27C2.93118 21.6422 4.5357 19.3913 6.57506 17.5171C8.61192 15.6439 11.0135 14.2036 13.7772 13.1963C16.5409 12.1899 19.4854 11.6866 22.6135 11.6866C25.7394 11.6866 28.6854 12.1899 31.4493 13.1963C34.2128 14.2036 36.6126 15.6439 38.652 17.5171C40.6889 19.3913 42.2952 21.6422 43.4674 24.27C44.6398 26.8994 45.2262 29.8353 45.2262 33.0787C45.2262 36.3228 44.6398 39.2589 43.4674 41.8865C42.2952 44.5159 40.6889 46.7668 38.652 48.6401C36.6126 50.5141 34.2128 51.9538 31.4493 52.9602C28.6854 53.9667 25.7394 54.4698 22.6135 54.4698C19.4854 54.4698 16.5409 53.9667 13.7772 52.9602C11.0135 51.9538 8.61192 50.5141 6.57506 48.6401C4.5357 46.7668 2.93118 44.5159 1.75876 41.8865C0.58653 39.2589 0 36.3228 0 33.0787Z"
    fill="#2bb673"
  />
  <path
    d="M45.2262 55.3193C45.2262 58.5626 44.6398 61.4987 43.4674 64.1279C42.2951 66.7557 40.6905 69.0066 38.6512 70.8808C36.6143 72.7541 34.2128 74.1944 31.4491 75.2016C28.6852 76.208 25.7411 76.7113 22.6127 76.7113C19.4869 76.7113 16.5407 76.208 13.7772 75.2016C11.0135 74.1944 8.61358 72.7541 6.57423 70.8808C4.5373 69.0066 2.93118 66.7557 1.75876 64.1279C0.58653 61.4987 0 58.5626 0 55.3193H12.5627C12.5627 58.3949 13.4422 60.8838 15.201 62.7861C16.9601 64.6866 19.4308 65.6378 22.6127 65.6378C25.7955 65.6378 28.2662 64.6866 30.0252 62.7861C31.784 60.8838 32.6635 58.3949 32.6635 55.3193H45.2262Z"
    fill="#2bb673"
  />
  <path
    d="M38.9128 -1.04359e-05C40.6545 -1.04359e-05 42.1417 0.618073 43.376 1.8526C44.6091 3.08876 45.2262 4.57934 45.2262 6.32385C45.2262 8.06852 44.6091 9.55877 43.376 10.7951C42.1417 12.0313 40.6545 12.6477 38.9128 12.6477C37.171 12.6477 35.6822 12.0313 34.4489 10.7951C33.2147 9.55877 32.5983 8.06852 32.5983 6.32385C32.5983 4.57934 33.2147 3.08876 34.4489 1.8526C35.6822 0.618073 37.171 -1.04359e-05 38.9128 -1.04359e-05Z"
    fill="#2bb673"
  />
</svg>
```

```jsx
/* THIS WORKS FLAWLESSLY */
<svg
  attrs={{
    width: "46",
    height: "77",
    viewBox: "0 0 46 77",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  }}
>
  <path
    attr-d="M12.5627 33.0787C12.5627 36.1551 13.4422 38.644 15.201 40.5447C16.9601 42.4467 19.4308 43.397 22.6135 43.397C25.7955 43.397 28.2664 42.4467 30.0252 40.5447C31.784 38.644 32.6635 36.1551 32.6635 33.0787C32.6635 30.003 31.784 27.5142 30.0252 25.6119C28.2664 23.7115 25.7955 22.7603 22.6135 22.7603C19.4308 22.7603 16.9601 23.7115 15.201 25.6119C13.4422 27.5142 12.5627 30.003 12.5627 33.0787ZM0 33.0787C0 29.8353 0.58653 26.8994 1.75876 24.27C2.93118 21.6422 4.5357 19.3913 6.57506 17.5171C8.61192 15.6439 11.0135 14.2036 13.7772 13.1963C16.5409 12.1899 19.4854 11.6866 22.6135 11.6866C25.7394 11.6866 28.6854 12.1899 31.4493 13.1963C34.2128 14.2036 36.6126 15.6439 38.652 17.5171C40.6889 19.3913 42.2952 21.6422 43.4674 24.27C44.6398 26.8994 45.2262 29.8353 45.2262 33.0787C45.2262 36.3228 44.6398 39.2589 43.4674 41.8865C42.2952 44.5159 40.6889 46.7668 38.652 48.6401C36.6126 50.5141 34.2128 51.9538 31.4493 52.9602C28.6854 53.9667 25.7394 54.4698 22.6135 54.4698C19.4854 54.4698 16.5409 53.9667 13.7772 52.9602C11.0135 51.9538 8.61192 50.5141 6.57506 48.6401C4.5357 46.7668 2.93118 44.5159 1.75876 41.8865C0.58653 39.2589 0 36.3228 0 33.0787Z"
    attr-fill="#2bb673"
  />
  <path
    attr-d="M45.2262 55.3193C45.2262 58.5626 44.6398 61.4987 43.4674 64.1279C42.2951 66.7557 40.6905 69.0066 38.6512 70.8808C36.6143 72.7541 34.2128 74.1944 31.4491 75.2016C28.6852 76.208 25.7411 76.7113 22.6127 76.7113C19.4869 76.7113 16.5407 76.208 13.7772 75.2016C11.0135 74.1944 8.61358 72.7541 6.57423 70.8808C4.5373 69.0066 2.93118 66.7557 1.75876 64.1279C0.58653 61.4987 0 58.5626 0 55.3193H12.5627C12.5627 58.3949 13.4422 60.8838 15.201 62.7861C16.9601 64.6866 19.4308 65.6378 22.6127 65.6378C25.7955 65.6378 28.2662 64.6866 30.0252 62.7861C31.784 60.8838 32.6635 58.3949 32.6635 55.3193H45.2262Z"
    attr-fill="#2bb673"
  />
  <path
    attr-d="M38.9128 -1.04359e-05C40.6545 -1.04359e-05 42.1417 0.618073 43.376 1.8526C44.6091 3.08876 45.2262 4.57934 45.2262 6.32385C45.2262 8.06852 44.6091 9.55877 43.376 10.7951C42.1417 12.0313 40.6545 12.6477 38.9128 12.6477C37.171 12.6477 35.6822 12.0313 34.4489 10.7951C33.2147 9.55877 32.5983 8.06852 32.5983 6.32385C32.5983 4.57934 33.2147 3.08876 34.4489 1.8526C35.6822 0.618073 37.171 -1.04359e-05 38.9128 -1.04359e-05Z"
    attr-fill="#2bb673"
  />
</svg>
```

## Dynamic element

If you need to render the element based on some property you can do that by creating a variable and assigning the desired element name to that.

The variable name need to start with a **capital letter**

```jsx
/* will render h1-h6 based on properties.size value */

const view = ({properties}) => {
	const Heading = `h${properties.size}`;
	<Heading>Hello world<Heading>
}
```

## Event listeners

Event listeners are normal DOM events triggered by user interaction. To attach an event handler you need to prefix the name of an event with `on-` prefix. For an overview of all standard events browse the following link: [https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events](https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events)

```jsx
const view = () => (
  <button on-click={(event) => console.log("clicked", event)}>Submit</button>
);
```

## Conditional rendering

Sometimes you might need to render specific section in HTML only under specific condition, typically a loading indicator. For that case a ternary operator might come handy.

Trying to use **if** **statement** inside of JSX doesn't work and the compilation will fail. You can only use **expressions** inside.

```jsx
const view = (state) => (
  <div>
    /* only render now-loader when isLoading == true */
    {state.isLoading ? <now-loader></now-loader> : null}
  </div>
);
```

## Repeating element n times

If we have some results stored in the array and would like to render them, we can easily utilize the map array method like this:

```jsx
const users = [
  { name: "John", id: 1 },
  { name: "Fred", id: 2 },
  { name: "Admin", id: 3 },
];

<ul>
  {users.map((user) => (
    <li key={user.id}>{user.name}</li>
  ))}
</ul>;
```

Usage of key property is highly recommended for optimizing DOM operations such as reordering or re-rendering.

## Multiple nodes

The view method can only render a single root node. If adding an extra HTML element (such as a div or span) is not ideal or possible, we can use `Fragment` element instead. Fragment fulfills the parent element requirement but does not render any HTML element. Another approach is to return an array of elements.

```jsx
/* Leads to an error */
const view = () => {
	return (
		<div>Content A</div>
		<div>Content B</div>
	);
};

/* Fragment element to the rescue */
import snabbdom, { Fragment } from '@servicenow/ui-renderer-snabbdom';

const view = () => {
	return (
		<Fragment>
			<div>Content A</div>
			<div>Content B</div>
		</Fragment>
	);
};

/* returning an array of JSX elements can solve the issue as well */
const view = () => {
	return (
		[
			<div>Content A</div>,
			<div>Content B</div>
		]
	);
};
```
