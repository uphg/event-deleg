# Event delegation

一个事件委托库。

## 用法

```js
const handleClick = () => {
  ...
}

// 事件监听
on(button, 'click', handleClick)
// 最后一个参数与，addEventListener 第三个参数作用相同
// 参考：https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener
// 捕获事件
on(button, 'click', handleClick, true)
off(button, 'click', handleClick)

// 事件委托
on(div, 'click', 'li', handleClick)
// 捕获事件
on(div, 'click', 'li', handleClick, true)
off(div, 'click', handleClick)
```
