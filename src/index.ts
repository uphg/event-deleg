const DELEG = Symbol('delegateEvent')
const LISTEN = Symbol('listenerState')

interface ListenerCallback {
  (e: Event, ...args: unknown[]): unknown
  [DELEG]?: EventListenerOrEventListenerObject
  [LISTEN]?: boolean | null
}

export function on(
  element: HTMLElement | Document | Window,
  eventType: string,
  selector: string | ListenerCallback,
  callback?: ListenerCallback
) {
  if (!element || !eventType || !selector) return
  if (typeof selector === 'function') {
    (selector as ListenerCallback)[LISTEN] = true
    element.addEventListener(eventType, selector)
  } else {
    const listener =  (e: Event) => {
      let el = e.target
      while (!(el as Element)?.matches(selector)) {
        if (element === el) {
          el = null
          break
        }
        el = (el as Element)?.parentNode
      }
      el && (callback as ListenerCallback).call(el, e, el)
    }
    if (callback) {
      callback[DELEG] = listener
      element.addEventListener(eventType, listener)
    }
  }
  return element
}

export function off(
  element: HTMLElement | Document | Window,
  eventType: string,
  callback: ListenerCallback
) {
  if (!element || !eventType || !callback) return
  if (callback[LISTEN]) {
    callback[LISTEN] = null
    element.removeEventListener(eventType, callback)
  }
  const deleg = callback[DELEG]
  deleg && element.removeEventListener(eventType, deleg)
  return element
}
