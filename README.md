# react-context-modal

A simple React modal component and hooks designed to overcome limitations of existing modal libraries. Key features 
include horizontal and vertical swipe-to-close, scroll position preservation on iOS, and stacking multiple modals.

[View Demo](https://yoozzeek.github.io/react-context-modal/)

## Why Another Modal Library?

Although numerous modal libraries exist, few support intuitive swipe-to-close actions or maintain the parent scroll 
position effectively. This library addresses these specific gaps by providing:
* Vertical and horizontal swipe gestures for closing modals.
* Preservation of the page's vertical scroll (window.scrollY) position.
* Full compatibility with modern browsers on iOS, Android, and desktop.
* Full-height modal content scrolling with support for sticky headers and footers.
* Stacking capability, allowing multiple modals to open and close independently.
* Flexibility to render modals inline within a component or via a portal at the document root.
* Utility to enable horizontal scrolling within modal content on iOS.

This library is provided by the non-profit organization [Bitkind.org](https://bitkind.org/about) and adapted for public npm distribution.

## Installation
Install required peer dependencies first:
```bash
yarn add react react-dom react-responsive simplebar-react
```

This library isn't yet published to npm. To test and use it, install directly from GitHub:
```bash
yarn add https://github.com/yoozzeek/react-context-modal.git
```

Include the CSS in your app or SSR/SSG page:
<br />
```jsx
import "react-context-modal/lib/index.css"
```

### Basic usage
Wrap your application or specific components with `ModalProvider`. Modals can then be rendered anywhere within the 
wrapped context (including another modals):

```jsx
import { Modal } from "react-context-modal";

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

## Examples

Various use-case examples are provided in the [examples](./examples) directory. Contributions and additional examples are welcome.

* [Modal type](./examples/WithMobileType.tsx)
* [Horizontal swipe](./examples/WithMobileHorizontalSwipe.tsx)
* [High content height](./examples/WithHighContentHeight.tsx)
* [Sub modal](./examples/WithSubModal.tsx)
* [Custom header](./examples/WithCustomHeader.tsx)
* [Custom footer](./examples/WithCustomFooter.tsx)
* [Context provider](./examples/WithContextProvider.tsx)
* [React portal](./examples/WithPortal.tsx)
* [Without context](./examples/WithCreateStackHook.tsx)
* [Footer portal](./examples/WithFooterPortal.tsx)

## Configuration and props
```typescript
export type Size = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

type ModalType =
  | "base"
  | "menu"
  | "fullscreen"
  | "overlay-90"
  | "overlay-95"
  | "overlay-auto";

type ModalProps = {
  id: string; // Unique identifier for modal
  scrollAreaId?: string;
  children: ReactNode; // JSX content for modal
  isPortal?: boolean; // Render modal at root or inline
  isLoading?: boolean; // Loading state indicator
  loadingText?: string;

  horizontalSwipe?: boolean; // Enable horizontal swipe-to-close on mobile
  mobileSafeTop?: boolean; // deprecated
  ariaLabel?: string | null;

  title?: string | null;
  bgColorClass?: string;
  preventClose?: boolean;

  confirmClose?: boolean; // Prompt confirmation on close
  confirmTitle?: string;
  confirmDescription?: string;

  headerRenderer?: (onClose: () => void) => ReactElement;
  footerRenderer?: (onClose: () => void) => ReactElement;

  type?: ModalType; // Modal display type
  size?: Size; // Desktop width
  fallbackCtx?: StackCtx; // Context fallback for modals without global provider

  onClose(): void; // Handler called upon modal close
};
```

## Styles and customization
You can easily style and theme the modal by adjusting CSS variables or overriding specific class names.

### Theme variables
The package defines CSS variables for layout, spacing, colors, typography, and shadows. 
Override them in your global styles or scoped stylesheets to match your design system:
```css
:root {
    --context-modal-backdrop-background-color: #111827;
    --context-modal-main-background-color: #ffffff;

    --context-modal-indent-1: 0.4em;
    --context-modal-indent-2: 0.6em;
    --context-modal-indent-3: 0.8em;
    --context-modal-indent-4: 1em;
    --context-modal-indent-5: 1.2em;

    --context-modal-radius-xs: 0.4em;
    --context-modal-radius-sm: 0.6em;
    --context-modal-radius-md: 0.8em;
    --context-modal-radius-lg: 1em;
    --context-modal-radius-xl: 1.2em;
    
    --context-modal-box-shadow: 0 4px 32px rgba(0,0,0,0.22),
        0 4px 20px rgba(43, 52, 80, 0.04),
        0 0 4px rgba(43, 52, 80, 0.04);
}
```

### CSS Classes
All class names use the `context-modal-*` prefix. In most cases, you won’t need to touch internal layout classes 
like `context-modal-modal__container`. However, here are the most useful classes for customization:
```css
.context-modal-modal__main {}
.context-modal-modal__header {}
.context-modal-modal__header-title {}
.context-modal-modal__footer {}
.context-modal-modal__backdrop { }
```

## Bundle and dependencies
The modal component with hooks and provider is 26.22 KB (gzip: 7.30 KB) + styles 5.51 KB (gzip: 1.32 KB).

Based on two npm packages:
- [clsx](https://github.com/lukeed/clsx)
- [body-scroll-lock](https://github.com/yoozzeek/body-scroll-lock)

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
