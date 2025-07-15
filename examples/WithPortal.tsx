import React, { useState } from "react";
import { Modal } from "../lib";
import ModalProvider from "../lib/providers/ModalProvider";

const WithPortalExamplePage = () => {
  const [opened, setOpened] = useState(false);
  return (
    <ModalProvider>
      <h3>With portal</h3>
      <p>
        Portal is enabled by default, it will render modal outside the parent component where you
        use Modal component. All other modals in the stack will be rendered there as well. Check
        that you have dom node with #rcm-modal-portal id.
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
          onCloseModal={() => setOpened(false)}
        >
          Modal content
        </Modal>
      )}
    </ModalProvider>
  );
};

export default WithPortalExamplePage;
