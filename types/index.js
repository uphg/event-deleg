function on(element, event, handler, useCapture = false) {
    element.addEventListener(event, handler, useCapture);
}
function off(element, event, handler, useCapture = false) {
    element.removeEventListener(event, handler, useCapture);
}

export { off, on };
