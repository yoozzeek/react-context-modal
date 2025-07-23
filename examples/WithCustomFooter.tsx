import React, { useState } from "react";
import { Modal } from "../src";
import ModalProvider from "../src/providers/ModalProvider";

const WithPortalExamplePage = () => {
  const [opened, setOpened] = useState(false);
  return (
    <ModalProvider>
      <header>
        <h3>With custom footer</h3>
        <a
          href="https://github.com/yoozzeek/react-context-modal/blob/main/examples/WithCustomFooter.tsx"
          target="_blank"
        >
          Source code
        </a>
      </header>
      <p>
        Create a custom footer element and pass it through the <i>footerEl</i> prop. You can add
        action buttons or other content to the footer. If you want to add a form submit or action
        button to the modal footer from a child component, see the <strong>Footer Portal</strong>{" "}
        example.
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
          footerRenderer={(onClose) => (
            <footer>
              <button type="button" onClick={() => alert("Confirmed")}>
                Confirm action
              </button>
              <button type="button" onClick={onClose}>
                Close modal
              </button>
            </footer>
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
