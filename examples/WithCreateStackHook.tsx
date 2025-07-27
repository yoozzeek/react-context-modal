import React, { useState } from "react";
import { Modal, useModalStackCtx } from "../src";

const WithCreateStackHookExample = () => {
  const [opened, setOpened] = useState(false);
  const modalStackCtx = useModalStackCtx();
  return (
    <>
      <header>
        <h3>With stack context hook</h3>
        <a
          href="https://github.com/yoozzeek/react-context-modal/blob/main/examples/WithCreateStackHook.tsx"
          target="_blank"
        >
          Source code
        </a>
      </header>
      <p>
        In cases when your modal doesn't need to open another modals you can avoid using
        ModalProvider. Just create modal stack context at your component or hook level.
      </p>
      <button type="button" onClick={() => setOpened(true)}>
        Open
      </button>
      {opened && (
        <Modal
          id="example-modal"
          title="Modal example"
          isPortal={false}
          fallbackCtx={modalStackCtx}
          onClose={() => setOpened(false)}
        >
          Content
        </Modal>
      )}
    </>
  );
};

export default WithCreateStackHookExample;
