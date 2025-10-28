# iFrame Widget
A flexible and reusable widget to display content in an iFrame.

## Configurable Instance Options

The following instance options allow this widget to show external content in a variety of predefined sizes and can update the Service Portal navigation breadcrumb widget and Portal page title.

1. URL

The URL of the external page to embed

2. Size

A selectable list of available size and aspect ratios. These map to css classes defined in the widget.

3. Label

Description text used to support assistive readers and update the ServiceNow breadcrumb widget if it is present on the same page.

4. Set Page Title

A checkbox to override the page title with the Label field.


## Setup the widget

> The entire widget and a demo page has been provided in an update set, `Service Portal - iFrame Widget.xml`, but the follow the steps below to set up the widget from scratch

1. Create a new widget and set **Name** to **iFrame**
2. Copy the contents of `template.html` to the **Body HTML template** window
3. Copy the contents of `style.scss` to the **CSS** window
4. Copy the contents of `server.js` to the **Server script** window
5. Copy the contents of `client.js` to the **Client controller** window
6. Copy the contents of `optionSchema.json` to the **Option schema** window
7. Drag the newly created widget onto any Service Portal page
8. Add the URL of the external content to the Widget instance options

## External content requirements

Displaying an external site in an iFrame is subject to Cross Origin Resource Sharing (CORS) policies. These are enforced by the web browser and configured by the external site. You must ensure that the site you are trying to embed allows it.

You may test the iFrame widget using [Wikipedia](https://en.wikipedia.org/) which does allow embedding.