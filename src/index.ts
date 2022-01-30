const DELEG = Symbol('delegateEvent')
const LISTEN = Symbol('listenerState')

interface EventDelegHandler {
  (e: Event, ...args: unknown[]): unknown
  [DELEG]?: EventListenerOrEventListenerObject
  [LISTEN]?: boolean | null
}

type EventDelegOptions = boolean | AddEventListenerOptions | undefined

export function on(
  element: HTMLElement | Document | Window,
  eventName: string,
  selector: string | EventDelegHandler,
  handler?: EventDelegHandler | EventDelegOptions,
  options?: EventDelegOptions
) {
  if (!element || !eventName || !selector) return
  if (typeof selector === 'function') {
    selector[LISTEN] = true
    element.addEventListener(eventName, selector, (handler as EventDelegOptions))
  } else {
    const listener =  (e: Event) => {
      let el = e.target
      while (!(el as Element)?.matches(selector)) {
        if (element === el) {
          el = null
          break
        }
        el = (el as Node)?.parentNode
      }
      el && (handler as EventDelegHandler).call(el, e, el)
    }
    if (handler) {
      (handler as EventDelegHandler)[DELEG] = listener
      element.addEventListener(eventName, listener, options)
    }
  }
  return element
}

export function off(
  element: HTMLElement | Document | Window,
  eventName: string,
  handler: EventDelegHandler,
  options?: EventDelegOptions
) {
  if (!element || !eventName || !handler) return
  if (handler[LISTEN]) {
    handler[LISTEN] = null
    element.removeEventListener(eventName, handler, options)
  }
  const deleg = handler[DELEG]
  deleg && element.removeEventListener(eventName, deleg, options)
  return element
}
