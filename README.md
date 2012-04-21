# jQuery touch click

Version: 1.0, Last updated: 4/22/2012

This jQuery plugin makes a faster click event for touch screen devices.

## Unuse click event why?

Click event is slow.

## Examples

### .touchClick( handler(eventObject) )

At first this jQuery plugin gives className called "active" when touchstart event occurred.
When touchmove event occurred on the way, I do not handle handler. But "active" className is deleted.
If touchend event occurs without touchmove event occurring, handler is handled.

### .touchClick( [addClassName], handler(eventObject) )

className to be given between touchClick events is modifiable by [addClassName].