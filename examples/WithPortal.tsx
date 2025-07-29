import { useState } from "react";
import { Modal } from "../src";
import ModalProvider from "../src/providers/ModalProvider";

const WithPortalExample = () => {
  const [opened, setOpened] = useState(false);
  return (
    <ModalProvider>
      <header>
        <h3>With portal</h3>
        <a
          href="https://github.com/yoozzeek/react-context-modal/blob/main/examples/WithPortal.tsx"
          target="_blank"
        >
          Source code
        </a>
      </header>
      <p>
        Portal is enabled by default, it will render modal outside the parent component where you
        use Modal component. All other modals in the stack will be rendered there as well. Check
        that you have dom node with <i>#context-modal-portal</i> id.
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
          Modal content
        </Modal>
      )}
    </ModalProvider>
  );
};

export default WithPortalExample;
