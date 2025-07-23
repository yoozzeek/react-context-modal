import React, { useState } from "react";
import { Modal } from "../src";
import ModalProvider from "../src/providers/ModalProvider";

const WithHighContentHeightExample = () => {
  const [opened, setOpened] = useState(false);
  return (
    <ModalProvider>
      <header>
        <h3>With high content height</h3>
        <a
          href="https://github.com/yoozzeek/react-context-modal/blob/main/examples/WithContentHeightGtScreen.tsx"
          target="_blank"
        >
          Source code
        </a>
      </header>
      <p>
        Modals often contain dynamic content that can exceed the height of the viewport. This
        component automatically enables scroll behavior inside the modal body to ensure content
        remains accessible and the experience stays smooth, even on smaller screens.
      </p>
      <button type="button" onClick={() => setOpened(true)}>
        Open
      </button>
      {opened && (
        <Modal
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

export default WithHighContentHeightExample;
