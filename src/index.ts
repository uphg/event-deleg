export function on(
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false
) {
  element.addEventListener(event, handler, useCapture)
}

export function off(
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false
) {
  element.removeEventListener(event, handler, useCapture)
}
