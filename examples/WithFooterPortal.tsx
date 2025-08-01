import React, { useState } from "react";
import { Modal } from "../src";
import ModalProvider from "../src/providers/ModalProvider";
import ModalFooterPortal from "../src/components/ModalFooterPortal";

const WithPortalExample = () => {
  const [opened, setOpened] = useState(false);
  return (
    <ModalProvider>
      <header>
        <h3>With footer portal</h3>
        <a
          href="https://github.com/yoozzeek/react-context-modal/blob/main/examples/WithFooterPortal.tsx"
          target="_blank"
        >
          Source code
        </a>
      </header>
      <p>
        You can append dynamic elements, such as action buttons, to the modal footer from child
        components using a footer portal. Pass a footer element containing a DOM node with the id{" "}
        <i>#context-modal-footer-portal</i>. Then use <i>ModalFooterPortal</i> to render content
        directly into the footer. Note that form submission will not work if the button with type{" "}
        <i>submit</i> is rendered outside the form via a portal. To handle form actions, set the
        button type to <i>button</i> or choose another method.
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
          footerRenderer={() => <footer id="context-modal-footer-portal"></footer>}
          onClose={() => setOpened(false)}
        >
          Modal content
          <ModalFooterPortal>
            <button
              type="button"
              onClick={() => {
                alert("Button clicked");
              }}
            >
              Click me
            </button>
          </ModalFooterPortal>
        </Modal>
      )}
    </ModalProvider>
  );
};

export default WithPortalExample;
