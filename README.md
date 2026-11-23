# react-context-modal

React modal that actually feels native. Solves pain from existing libs: horizontal & vertical swipe-to-close (near‑native), keeps scroll position on iOS, supports stacking multiple modals.

[View Demo](https://yoozzeek.github.io/react-context-modal/)

## Why Another Modal Library?

Although numerous modal libraries exist, few support intuitive swipe-to-close actions or maintain the parent scroll
position effectively. This library addresses these specific gaps by providing:

- Vertical and horizontal swipe gestures for closing modals.
- Preservation of the page's vertical scroll (window.scrollY) position.
- Full compatibility with modern browsers on iOS, Android, and desktop.
- Full-height modal content scrolling with support for sticky headers and footers.
- Stacking capability, allowing multiple modals to open and close independently.
- Flexibility to render modals inline within a component or via a portal at the document root.
- Utility to enable horizontal scrolling within modal content on iOS.

This library is provided by the non-profit organization [Bitkind.org](https://bitkind.org/about) and adapted for public npm distribution.

## Installation

Install the context modal with required peer dependencies:

```bash
yarn add @yoozzeek/react-context-modal simplebar-react
```

Include the CSS in your app or SSR/SSG page:
<br />

```jsx
import "@yoozzeek/react-context-modal/dist/index.css";
```

### Basic usage

Wrap your application or specific components with `ModalProvider`. Modals can then be rendered anywhere within the
wrapped context (including another modals):

```jsx
import { Modal } from "@yoozzeek/react-context-modal";

const YourComponent = () => {
  const [opened, setOpened] = useState(false);
  return (
    <ModalProvider>
      <button type="button" onClick={() => setOpened(true)}>
        Open
      </button>
      {opened && (
        <Modal
          isPortal
          id="example-modal"
          title="Modal example"
          type="overlay-95"
          onClose={() => setOpened(false)}
        >
          Modal content
        </Modal>
      )}
    </ModalProvider>
  );
};
```

### Sheet or dialog

Overlay and menu modals render as bottom sheets on narrow viewports and as centred dialogs from `dialogFrom` up. The
switch is set once, on the provider, and drives the layout, the swipe gestures and the close timing together:

```jsx
<ModalProvider dialogFrom="768px" sheetCloseButton>
  <App />
</ModalProvider>
```

| Prop               | Type                              | Default   | Effect                                               |
| ------------------ | --------------------------------- | --------- | ---------------------------------------------------- |
| `dialogFrom`       | `CssLength` (`px`, `em` or `rem`) | `"576px"` | Viewport width from which modals render as dialogs   |
| `sheetCloseButton` | `boolean`                         | `false`   | Sheets show the close button instead of the drag bar |
| `defaultSize`      | `Size`                            | `"md"`    | Dialog size for every modal without its own `size`   |

The modal container carries `data-layout="sheet"` or `data-layout="dialog"`. Custom headers and content target either
layout with an attribute selector instead of a media query.

## Todos

- [x] Core helpers, hooks and component;
- [x] Vite configuration: build and dev;
- [x] Beta is available as npm package;
- [ ] Clear and friednly customization system, default theme + CSS vars and class names refactor;
- [ ] Update styles of demo and examples; change colors and make UI more attractive;

## Examples

Various use-case examples are provided in the [examples](./examples) directory. Contributions and additional examples are welcome.

- [Modal type](./examples/WithMobileType.tsx)
- [Horizontal swipe](./examples/WithMobileHorizontalSwipe.tsx)
- [High content height](./examples/WithHighContentHeight.tsx)
- [Sub modal](./examples/WithSubModal.tsx)
- [Custom header](./examples/WithCustomHeader.tsx)
- [Custom footer](./examples/WithCustomFooter.tsx)
- [Context provider](./examples/WithContextProvider.tsx)
- [React portal](./examples/WithPortal.tsx)
- [Without context](./examples/WithCreateStackHook.tsx)
- [With children props](./examples/WithChildrenProps.tsx)
- [Footer portal](./examples/WithFooterPortal.tsx)

## Styles and customization

You can easily style and theme the modal by adjusting CSS variables or overriding specific class names.

Dialog dimensions:

| Variable                            | Default                          |
| ----------------------------------- | -------------------------------- |
| `--context-modal-dialog-max-width`  | `none`                           |
| `--context-modal-dialog-max-height` | `95%`                            |
| `--context-modal-dialog-radius`     | `var(--context-modal-radius-xl)` |

A dialog's `size` sets its width, capped at the viewport width; `--context-modal-dialog-max-width` caps it further.

TODO: Complete customization guide

## Bundle and dependencies

The modal component with hooks and provider is 29.31 KB (gzip: 8.42 KB) + styles 9.33 KB (gzip: 1.98 KB).

Based on two npm packages:

- [body-scroll-lock](https://github.com/yoozzeek/body-scroll-lock)
- [clsx](https://github.com/lukeed/clsx)

### Peer dependencies

- react
- react-dom
- [simplebar-react](https://github.com/Grsmto/simplebar)

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
