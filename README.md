# react-context-modal

There are already so many react modal packages; it would seem why another one, but because many of them do not support closing modal with down swipe, as well as blocking the parent scroll, and the most important reason why I started making my own - there is no support for a stack of open windows that can be closed by Esc one after another.

* Closing the window with swipe down or swipe right.
* Doesn't change the root window Y scroll position.
* Works well on all modern iOS, Android and desktop browsers.
* Full-height scroll for modal content with sticky header and footer.
* Modals can stack one above another and closed one by one.
* Can be rendered in your component node or as portal at the root level.
* Util for allowing horizontal scroll events for child nodes on iOS.

## Dependencies
* body-scroll-lock
* simplebar-core
* simplebar-react
* classnames