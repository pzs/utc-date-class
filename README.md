# UTC Date

> JavaScript Date class in UTC mode.

*** This library is not for everybody! ***


## What is it?

This package consists of two parts:

- A `UtcDate` class, which works in UTC mode, like `moment.utc(...)`. Ambiguous input is assumed to be UTC. Unambiguous input is adjusted to UTC. It has the same interface as the built-in JavaScript global [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) class.

- A short script, which optionally replace the built-in JavaScript global [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) class, so you (and any other libraries/frameworks) can use the `Date` class and it will work in UTC mode.


## Why?

Do you know DST (Daylight Saving Time)? Because of this certain times don't exist in different time zones. Thus if you have to parse and display UTC dates, you have to use special libraries, like `moment.utc()` or you will face some bugs.

However using external libraries may not be an option, if your application is built on different frameworks and components (eg. Scheduling or Gantt components) which are internally using the native JavaScript `Date` object. Here you can use this package, which will replace the original `Date` object with this `UtcDate` one.

## Installation

```bash
npm install --save utc-date-class
```

## How to use?

If you want to just replace the built-in `Date` object and "switch" your application in UTC mode, then include this line at the _top_ of your application, before any other `import` scripts:

```js
import 'utc-date-class/enable';
```

If you want to use the `UtcDate` class on your own without overriding the built-in `Date`, you can import this class itself:

```js
import UtcDate from 'utc-date-class';
```


## Notes

- `new UtcDate()` without any parameters creates a new Date object with the current local time in UTC.
- `UtcDate.OriginalDate` refers to the original `Date` object.
- Certain localized methods are not implemented (`toLocaleDateString()`, `toLocaleFormat()`, `toLocaleString()` and `toLocaleTimeString()`).


## License

[MIT](http://opensource.org/licenses/MIT)
