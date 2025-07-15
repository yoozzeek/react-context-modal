import React, { useState } from "react";
import { Modal } from "../lib";
import ModalProvider from "../lib/providers/ModalProvider";

const WithMobileHorizontalSwipeExamplePage = () => {
  const [opened, setOpened] = useState(false);

  return (
    <ModalProvider>
      <h3>With horizontal swipe</h3>
      <p>Can be closed by horizontal swipe on mobile.</p>
      <button type="button" onClick={() => setOpened(true)}>
        Open
      </button>
      {opened && (
        <Modal
          horizontalSwipe
          id="example-modal"
          title="Modal example"
          isPortal={false}
          type="fullscreen"
          onClose={() => setOpened(false)}
        >
          Modal content
        </Modal>
      )}
    </ModalProvider>
  );
};

export default WithMobileHorizontalSwipeExamplePage;
