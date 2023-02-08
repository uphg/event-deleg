# Event delegation

An event delegate library.

## Usage

```javascript
const handleClick = () => {
  ...
}

// listener
on(button, 'click', handleClick)

// stop
off(button, 'click', handleClick)

// The last parameter is the same as the third parameter of addEventListener
// See https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
on(button, 'click', handleClick, true)

// event delegation
on(div, 'click', 'li', handleClick)

// stop
off(div, 'click', handleClick)

// capture
on(div, 'click', 'li', handleClick, true)
```
