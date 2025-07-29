import { useState } from "react";
import { Modal } from "../src";
import ModalProvider from "../src/providers/ModalProvider";

const WithContextProviderExample = () => {
  const [opened, setOpened] = useState(false);
  return (
    <ModalProvider>
      <header>
        <h3>With context provider</h3>
        <a
          href="https://github.com/yoozzeek/react-context-modal/blob/main/examples/WithContextProvider.tsx"
          target="_blank"
        >
          Source code
        </a>
      </header>
      <p>Basic usage supports modal stack global for all your app.</p>
      <button type="button" onClick={() => setOpened(true)}>
        Open
      </button>
      {opened && (
        <Modal
          id="example-modal"
          title="Modal example"
          isPortal={false}
          onClose={() => setOpened(false)}
        >
          Content
        </Modal>
      )}
    </ModalProvider>
  );
};

export default WithContextProviderExample;
