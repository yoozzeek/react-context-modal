import React, { useState } from "react";
import { Modal, useModalStackCtx } from "../lib";

const WithCreateStackHookExamplePage = () => {
  const [opened, setOpened] = useState(false);
  const modalStackCtx = useModalStackCtx();
  return (
    <div>
      <h3>With stack context hook</h3>
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
          stackFallbackCtx={modalStackCtx}
          onCloseModal={() => setOpened(false)}
        >
          Content
        </Modal>
      )}
    </div>
  );
};

export default WithCreateStackHookExamplePage;
