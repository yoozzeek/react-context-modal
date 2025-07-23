import React, { useState } from "react";
import { Modal } from "../src";
import ModalProvider from "../src/providers/ModalProvider";

const WithPortalExamplePage = () => {
  const [opened, setOpened] = useState(false);
  return (
    <ModalProvider>
      <header>
        <h3>With custom header</h3>
        <a
          href="https://github.com/yoozzeek/react-context-modal/blob/main/examples/WithCustomHeader.tsx"
          target="_blank"
        >
          Source code
        </a>
      </header>
      <p>
        Create a custom header element and pass it through the <i>headerEl</i> prop. In this case,
        you must manually trigger the onClose callback from your custom header.
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
          headerRenderer={(onClose) => (
            <header>
              <h3>Custom header</h3>
              <button type="button" onClick={onClose}>
                Close
              </button>
            </header>
          )}
          onClose={() => setOpened(false)}
        >
          Modal content
        </Modal>
      )}
    </ModalProvider>
  );
};

export default WithPortalExamplePage;
