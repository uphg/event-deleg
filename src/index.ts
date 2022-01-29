const DELEG = Symbol('delegateEvent')
const LISTEN = Symbol('listenerState')

interface ListenerCallback {
  (e: Event, ...args: unknown[]): unknown
  [DELEG]?: EventListenerOrEventListenerObject
  [LISTEN]?: boolean | null
}

export function on(
  element: HTMLElement | Document | Window,
  eventName: string,
  selector: string | ListenerCallback,
  handler?: ListenerCallback
) {
  if (!element || !eventName || !selector) return
  if (typeof selector === 'function') {
    (selector as ListenerCallback)[LISTEN] = true
    element.addEventListener(eventName, selector)
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
      el && (handler as ListenerCallback).call(el, e, el)
    }
    if (handler) {
      handler[DELEG] = listener
      element.addEventListener(eventName, listener)
    }
  }
  return element
}

export function off(
  element: HTMLElement | Document | Window,
  eventName: string,
  handler: ListenerCallback
) {
  if (!element || !eventName || !handler) return
  if (handler[LISTEN]) {
    handler[LISTEN] = null
    element.removeEventListener(eventName, handler)
  }
  const deleg = handler[DELEG]
  deleg && element.removeEventListener(eventName, deleg)
  return element
}
