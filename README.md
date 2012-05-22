# jQuery touch click

Version: 1.0, Last updated: 4/22/2012

This jQuery plugin makes a faster click event for touch screen devices.

## .touchClick( handler(eventObject) )

At first this jQuery plugin gives className called "active" when touchstart event occurred.
When touchmove event occurred on the way, I do not handle handler. But "active" className is deleted.
If touchend event occurs without touchmove event occurring, handler is handled.

## .touchClick( [addClassName], handler(eventObject) )

className to be given between touchClick events is modifiable by [addClassName].

## Test browser

- Chrome
- Safari
- Firefox
- Opera
- iOS 4.3.2

### Reason not to use the click event

Click event is slow.

## License

Copyright © 2012 "pesblog" Noritaka Baba   
Licensed under the MIT license.