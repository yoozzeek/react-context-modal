import React, { useState } from "react";
import { Modal, useModalStackCtx } from "../lib";
import type { ModalType } from "../lib";

const WithMobileTypeExamplePage = () => {
  const modalStackCtx = useModalStackCtx();
  const [opened, setOpened] = useState(false);
  const [type, setType] = useState<ModalType>("overlay-auto");

  function openModal(type: ModalType) {
    setType(type);
    setOpened(true);
  }

  return (
    <div>
      <h3>With overlay</h3>
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
        <button type="button" onClick={() => openModal("overlay-auto")}>
          Overlay auto
        </button>
        <button type="button" onClick={() => openModal("overlay-90")}>
          Overlay 90
        </button>
        <button type="button" onClick={() => openModal("overlay-95")}>
          Overlay 95
        </button>
        <button type="button" onClick={() => openModal("overlay-90")}>
          Overlay 90
        </button>
        <button type="button" onClick={() => openModal("menu")}>
          Menu
        </button>
        <button type="button" onClick={() => openModal("base")}>
          Base
        </button>
      </div>
      {opened && (
        <Modal
          id="example-modal"
          title="Modal example"
          type={type}
          isPortal={false}
          fallbackCtx={modalStackCtx}
          onClose={() => setOpened(false)}
        >
          Modal content
        </Modal>
      )}
    </div>
  );
};

export default WithMobileTypeExamplePage;
