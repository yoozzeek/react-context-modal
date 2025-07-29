import { useState } from "react";
import { Modal } from "../src";
import ModalProvider from "../src/providers/ModalProvider";

const WithChildrenPropsExample = () => {
  const [opened, setOpened] = useState(false);

  // If you want extra performance and minimize renderers
  // const contentRendererFn = useCallback(
  //   (onClose) => (
  //     <>
  //       Modal content
  //       <button type="button" onClick={onClose}>
  //         Close
  //       </button>
  //     </>
  //   ),
  //   [],
  // );

  return (
    <ModalProvider>
      <header>
        <h3>With children props</h3>
        <a
          href="https://github.com/yoozzeek/react-context-modal/blob/main/examples/WithPortal.tsx"
          target="_blank"
        >
          Source code
        </a>
      </header>
      <p>
        Sometimes, you may need to close a modal from within its child components. If you call the
        onClose callback directly (the one you passed to the Modal component), the modal will be
        removed from the DOM — but body scroll locking and modal stack state won’t be properly
        updated. To close the modal correctly, pass your children as a function that receives an
        onClose handler, and then call from inside your component when needed. This ensures the
        modal stack and scroll state are updated properly.
      </p>
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
          {(onClose) => (
            <>
              Modal content
              <button type="button" onClick={onClose}>
                Close
              </button>
            </>
          )}
        </Modal>
      )}
    </ModalProvider>
  );
};

export default WithChildrenPropsExample;
