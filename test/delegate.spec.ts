import { on, off } from "../src/index"

// "bubbles"，可选，Boolean类型，默认值为 false，表示该事件是否冒泡。
const click = () => new Event('click', { bubbles: true })

describe('委托事件', () => {
  let outer: HTMLDivElement
  let inner: HTMLDivElement
  beforeEach(() => {
    document.body.innerHTML = `<div class="outer"><div class="inner"></div></div>`
    outer = document.querySelector('.outer') as HTMLDivElement
    inner = document.querySelector('.inner') as HTMLDivElement
  })

  afterEach(() => {
    document.body.innerHTML = ''
    outer = null
    inner = null
  })

  it('once 选项可用', () => {
    [window, document, outer].forEach((el) => {
      [true, false].forEach((capture) => {
        const fn = jest.fn()
        on(el, 'click', fn, { once: false, capture })
        el.dispatchEvent(click())
        expect(fn).toHaveBeenCalledTimes(1)
        el.dispatchEvent(click())
        expect(fn).toHaveBeenCalledTimes(2)

        const onceFn = jest.fn()
        on(el, 'click', onceFn, { once: true, capture })
        el.dispatchEvent(click())
        expect(onceFn).toHaveBeenCalledTimes(1)
        el.dispatchEvent(click())
        expect(onceFn).toHaveBeenCalledTimes(1)
      })
    })
  })

  it('触发 window', () => {
    const fn = jest.fn()
    on(window, 'click', fn)
    window.dispatchEvent(click())
    expect(fn).toHaveBeenCalledTimes(1)
    off(window, 'click', fn)
    window.dispatchEvent(click())
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('触发 outer', () => {
    const fn = jest.fn()
    on(window, 'click', fn)
    outer.dispatchEvent(click())
    expect(fn).toHaveBeenCalledTimes(1)
    off(window, 'click', fn)
    outer.dispatchEvent(click())
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('触发 inner', () => {
    const fn = jest.fn()
    on(outer, 'click', fn)
    inner.dispatchEvent(click())
    expect(fn).toHaveBeenCalledTimes(1)
    off(outer, 'click', fn)
    inner.dispatchEvent(click())
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('添加重复的事件监听', () => {
    const fn = jest.fn()
    on(window, 'click', fn)
    on(window, 'click', fn)
    window.dispatchEvent(click())
    expect(fn).toHaveBeenCalledTimes(1)
    off(window, 'click', fn)
    window.dispatchEvent(click())
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('删除未监听的函数', () => {
    const fn = jest.fn()
    on(window, 'click', fn)
    on(window, 'click', fn)
    window.dispatchEvent(click())
    expect(fn).toHaveBeenCalledTimes(1)
    off(window, 'click', () => {})
    window.dispatchEvent(click())
    expect(fn).toHaveBeenCalledTimes(2)
    off(window, 'click', fn)
  })

  it('在捕获模式下安正确顺序运行（1）', () => {
    const array: number[] = []
    on(outer, 'click', () => {
      array.push(1)
    }, true)
    on(outer, 'click', () => {
      array.push(2)
    })
    outer.addEventListener('click', () => {
      array.push(3)
    })

    inner.dispatchEvent(click())
    expect(array).toEqual([1, 2, 3])
  })

  it('在捕获模式下安正确顺序运行（2）', () => {
    const array: number[] = []
    on(outer, 'click', () => {
      array.push(1)
    }, true)
    on(outer, 'click', () => {
      array.push(2)
    })
    outer.addEventListener('click', () => {
      array.push(3)
    })

    outer.dispatchEvent(click())
    expect(array).toEqual([1, 2, 3])
  })
})