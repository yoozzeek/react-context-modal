import React, { useState } from "react";
import { Modal } from "../src";
import ModalProvider from "../src/providers/ModalProvider";

const WithMobileHorizontalSwipeExamplePage = () => {
  const [opened, setOpened] = useState(false);

  return (
    <ModalProvider>
      <header>
        <h3>With horizontal swipe</h3>
        <a
          href="https://github.com/yoozzeek/react-context-modal/blob/main/examples/WithMobileHorizontalSwipe.tsx"
          target="_blank"
        >
          Source code
        </a>
      </header>
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
          Swipe me to the right
        </Modal>
      )}
    </ModalProvider>
  );
};

export default WithMobileHorizontalSwipeExamplePage;
