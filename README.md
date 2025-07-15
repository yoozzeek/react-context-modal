# react-context-modal

A flexible modal component and hooks for React providing features missing from most popular modal libs such as: close with horizontal/vertical swipe, doesn't affect document.scrollY on iOS and can stack sub modals.

## Motivation

There are already so many react modal packages; 
it would seem why another one, but because many of them 
do not support closing modal with down swipe, as well 
as blocking the parent scroll, and a few the most 
important goals why I started making my own:

* Close the window with vertical and horizontal swipe.
* Doesn't affect the document.window's Y scroll position.
* Works well on all modern iOS, Android and desktop browsers.
* Full-height scroll for modal content with sticky header and footer.
* Modals can stack one above another and closed one by one.
* Can be rendered in your component node or as portal at the root level.
* Util for allowing horizontal scroll events for child nodes on iOS.


## Installation
Install peer dependencies before using this package:
<br/>
`yarn add react react-dom react-responsive simplebar-react`

Lib hasn't published on npm yet, but you can test and play with it:
<br />
`yarn add https://github.com/yoozzeek/react-context-modal.git`


## Examples
Lots of use cases are available in [examples](./examples) directory. Feel free to add more and contribute.

### Basic usage
```jsx
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
          onCloseModal={() => setOpened(false)}
        >
          Modal content
        </Modal>
      )}
    </ModalProvider>
  );
};
```

### Alternative (without context)
You can use simple modals (no stacking, no sub modals) without wrapping your app into `ModalProvider`.
```jsx
const YourComponent = () => {
  const [opened, setOpened] = useState(false);
  const modalStackCtx = useModalStackCtx();
  return (
    <>
      <button type="button" onClick={() => setOpened(true)}>
        Open
      </button>
      {opened && (
        <Modal
          id="example-modal"
          title="Modal example"
          isPortal={false}
          stackFallbackCtx={modalStackCtx}
          onCloseModal={() => setOpened(false)}
        >
          Content
        </Modal>
      )}
    </>
  );
};
```

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
  id: string; // modal id, should be unique
  scrollAreaId?: string;
  children: ReactNode; // Any jsx that will be rendered in modal content container
  isPortal?: boolean; // Should be rendered in #rcm-modal-portal dom node or inline
  isLoading?: boolean; // Parent data loading state
  loadingText?: string;
  
  // If enabled, on mobile will allow close 
  // modal with horizontal swipe to right
  horizontalSwipe?: boolean;
  mobileSafeTop?: boolean; // deprecated
  ariaLabel?: string | null;

  // Base title, will be rendered if no custom headerEl provided
  title?: string | null;
  bgColorClass?: string;
  preventClose?: boolean;
  
  confirmClose?: boolean; // If enabled, will ask confirmation before close
  confirmCloseModalTitle?: string;
  confirmCloseModalDescription?: string;
  
  // Usually, you will use own header and footer elements
  headerEl?: JSX.Element | boolean | null;
  footerEl?: JSX.Element | boolean | null;

  // Modal type affects the content height on mobile and desktop.
  // There's special 'fullscreen' type for full screen modals.
  type?: ModalType;
  size?: Size; // Width size (only for desktop)
  stackFallbackCtx?: StackCtx; // If no global modal context

  // Parent handler that will be called after the close animation 
  // finished or Esc event fired. Parent should hide the modal
  // from dom if it was closed.
  onCloseModal(): void;
}
```

## Bundle size and dependencies
The size of the modal component with all its hooks and provider is about 25.07 KB (gzip: 7.25 KB).

Based on two npm packages:
- clsx
- [body-scroll-lock](https://github.com/yoozzeek/body-scroll-lock)

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
