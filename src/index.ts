const delegateHandler = Symbol('delegateHandler')

export interface EventDelegHandler {
  (e: Event, ...args: unknown[]): unknown
  [delegateHandler]?: EventListenerOrEventListenerObject
}

export type EventDelegOptions = boolean | EventListenerOptions | undefined
export type EventDelegElement = HTMLElement | Document | Window

export function on(
  el: EventDelegElement,
  eventName: string,
  selector: string | EventDelegHandler,
  handler?: EventDelegHandler | EventDelegOptions,
  options?: EventDelegOptions
) {
  if (!el || !eventName || !selector) return

  if (isFunction(selector)) {
    el.addEventListener(eventName, selector, handler as EventDelegOptions)
  } else if (isFunction(handler)) {
    const listener = (event: Event) => {
      let { target } = event
      while (!(target as Element)?.matches(selector)) {
        if (el === target) {
          target = null
          break
        }
        target = (target as Node)?.parentNode
      }
      target && handler.call(target, event, target)
    }
    handler[delegateHandler] = listener
    el.addEventListener(eventName, listener, options)
  }

  return el
}

export function off(
  el: EventDelegElement,
  eventName: string,
  handler: EventDelegHandler,
  options?: EventDelegOptions
) {
  if (!el || !eventName || !handler) return

  el.removeEventListener(eventName, handler, options)
  const deleg = handler[delegateHandler]
  deleg && el.removeEventListener(eventName, deleg, options)

  return el
}

function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}
