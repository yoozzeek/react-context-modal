import React, { useState } from "react";
import { Modal } from "../lib";

const ExamplePage = () => {
  const [opened, setOpened] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setOpened(true)}>
        Open modal
      </button>
      {opened && (
        <Modal
          id="example-modal"
          title="Modal example"
          isPortal={false}
          onCloseModal={() => setOpened(false)}
        >
          CONTENT
        </Modal>
      )}
    </div>
  );
};

export default ExamplePage;
