formatter
---

[![](https://img.shields.io/github/issues/uiwjs/date-formatter.svg)](https://github.com/uiwjs/date-formatter/issues) [![](https://img.shields.io/github/forks/uiwjs/date-formatter.svg)](https://github.com/uiwjs/date-formatter/network) [![](https://img.shields.io/github/stars/uiwjs/date-formatter.svg)](https://github.com/uiwjs/date-formatter/stargazers) [![](https://img.shields.io/github/release/uiwjs/date-formatter.svg)](https://github.com/uiwjs/date-formatter/releases) [![](https://img.shields.io/npm/v/@uiw/formatter)](https://www.npmjs.com/package/@uiw/formatter) [![](https://img.shields.io/bundlephobia/min/@uiw/formatter)](https://www.npmjs.com/package/@uiw/formatter) ![](http://jaywcjlove.github.io/sb/status/no-dependencies.svg) [![Coverage Status](https://coveralls.io/repos/github/uiwjs/date-formatter/badge.svg?branch=master)](https://coveralls.io/github/uiwjs/date-formatter?branch=master)

Get a formatted date. [Demo preview](https://codepen.io/jaywcjlove/pen/zbZKmq).

### Install

```bash
$ npm install --save @uiw/formatter
```

### Usage

```js
import formatter from '@uiw/formatter';

console.log(formatter());
//=> 2019-03-07

console.log(formatter.utc());
//=> 2019-03-07

console.log(formatter('YYYY年MM月DD日', new Date(2019, 3, 7)))
//=> 2019年04月07日
console.log(formatter('YYYY年MM月DD日 16:30:29', new Date(2019, 3, 7, 16, 30, 29)))
//=> 2019年04月07日 16:30:29


console.log(formatter('YYYY'));
//=> 2019
console.log(formatter.utc('YYYY'));
//=> 2019
```

Or manually download and link **formatter.js** in your HTML, It can also be downloaded via [UNPKG](https://unpkg.com/@uiw/formatter):

```html
<div id="date"></div>
<script src="https://unpkg.com/@uiw/formatter/dist/formatter.min.js"></script>
<script>
  document.getElementById('date').innerHTML = formatter();
</script>
```

The above [example preview](https://codepen.io/jaywcjlove/pen/zbZKmq).

### timeZoneConverter

Resolve changes in time zone, resulting in inaccurate display server time

```js
function timeZoneConverter(date, timeZone) {
  const oldDate = new Date(date);
  const newDate = new Date();
  const stamp = oldDate.getTime();
  if (!timeZone) return oldDate;
  return (isNaN(timeZone) && !timeZone)
    ? oldDate :
    new Date(stamp + (newDate.getTimezoneOffset() * 60 * 1000) + (timeZone * 60 * 60 * 1000));
}
timeZoneConverter(new Date(1434701732*1000), 8)
```

## API

```js
formatter(rule: String, date: Date, utc: Boolean);
formatter.utc(rule: String, date: Date);
```

## Supported Patterns

| rule | Description | 中文说明 | E.g |
|--------- |-------- |--------- |-------- |
| `YYYY` | full year | 年 | `2019` |
| `MM` | month | 月 | `02` |
| `DD` | day | 天 | `05` |
| `HH` | hours | 时 | `12` |
| `mm` | minutes | 分钟 | `59` |
| `ss` | seconds | 秒 | `09` |
| `ms` | milliseconds | 毫秒 | `532` |
