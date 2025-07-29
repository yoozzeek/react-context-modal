import { useState } from "react";
import { Modal } from "../src";
import ModalProvider from "../src/providers/ModalProvider";

const ComponentWithSubModal = () => {
  const [opened, setOpened] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setOpened(true)}>
        Open sub modal
      </button>
      {opened && (
        <Modal
          id="sub-modal-example"
          title="Sub modal example"
          type="overlay-90"
          onClose={() => setOpened(false)}
        >
          Sub modal content
        </Modal>
      )}
    </div>
  );
};

const WithSubModalExample = () => {
  const [opened, setOpened] = useState(false);
  return (
    <ModalProvider>
      <header>
        <h3>With sub modal</h3>
        <a
          href="https://github.com/yoozzeek/react-context-modal/blob/main/examples/WithSubModal.tsx"
          target="_blank"
        >
          Source code
        </a>
      </header>
      <p>
        Sometimes you need to open sub modals from your modal, and you probably doesn't want to
        close all opened modals by Esc or have touch events enabled for all them at once.
        Fortunately, if you wrap app with ModalProvider all opened windows will be stacked, and Esc
        or swipe listeners enabled only for the top one.
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
          Parent modal content
          <ComponentWithSubModal />
        </Modal>
      )}
    </ModalProvider>
  );
};

export default WithSubModalExample;
