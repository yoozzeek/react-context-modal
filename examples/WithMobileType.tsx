import React, { useState } from "react";
import { Modal, useModalStackCtx } from "../src";
import type { ModalType } from "../src";
import ModalHeader1 from "../src/components/ModalHeader1";

const WithMobileTypeExamplePage = () => {
  const modalStackCtx = useModalStackCtx();
  const [opened, setOpened] = useState(false);
  const [type, setType] = useState<ModalType>("overlay-auto");

  function openModal(type: ModalType) {
    setType(type);
    setOpened(true);
  }

  return (
    <>
      <header>
        <h3>With modal type</h3>
        <a
          href="https://github.com/yoozzeek/react-context-modal/blob/main/examples/WithMobileType.tsx"
          target="_blank"
        >
          Source code
        </a>
      </header>
      <p>The max height of these modals on mobile devices varies depending on type.</p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.4em",
        }}
      >
        <button type="button" onClick={() => openModal("fullscreen")}>
          Fullscreen
        </button>
        <button type="button" onClick={() => openModal("overlay-95")}>
          Overlay auto
        </button>
        <button type="button" onClick={() => openModal("overlay-90")}>
          Overlay 90
        </button>
        <button type="button" onClick={() => openModal("overlay-95")}>
          Overlay 95
        </button>
        <button type="button" onClick={() => openModal("menu")}>
          Menu
        </button>
      </div>
      {opened && (
        <Modal
          id="example-modal"
          title="Modal example"
          type={type}
          isPortal={false}
          fallbackCtx={modalStackCtx}
          headerRenderer={(onClose) =>
            type === "fullscreen" ? (
              <ModalHeader1 title="Modal example" onClose={onClose} />
            ) : undefined
          }
          footerRenderer={(onClose) => (
            <footer>
              <button type="button" onClick={onClose}>
                Close
              </button>
            </footer>
          )}
          onClose={() => setOpened(false)}
        >
          Modal content
        </Modal>
      )}
    </>
  );
};

export default WithMobileTypeExamplePage;
