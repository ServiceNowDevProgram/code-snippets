# sn-time-ago

`sn-time-ago` is a usefull directive that allows you to present the datetime fields in a localized relative date/time formatting. It automatically chooses the right units (seconds, minutes, days, month etc.) to format a time interval.

**Examples:**

- just now
- 15m ago
- about an hour ago
- 10h ago
- a day ago
- 12d ago
- about a month ago
- 10mo ago
- about a year ago
- 4y ago

## Usage example

You can render this relative time by just passing a datetime display value into a timestamp scope property.

**widget template**

```html
<sn-time-ago timestamp="data.now"></sn-time-ago>
```

**widget server script**

```javascript
(function () {
  data.now = new GlideDateTime().toString();
})();
```

## Localization

The following list display UI messages that allows you to further improve/modify translations:

- `%d ago`
- `%d from now`
- `just now`
- `less than a minute`
- `about a minute`,
- `%d minutes`
- `about an hour`
- `about %d hours`
- `today`
- `a day`
- `%d days`
- `about a month`
- `%d months`
- `about a year`
- `about a year`
- `%d years`

### Localization demo widget

In order to test all available variations of time ago, you can easily do that by importing the provided [demo widget](sp_widget_sn_timeago_demo.xml) and putting it on some demo page.
