import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

const ModalFooterPortal = ({ children }: { children: ReactNode }) => {
  const el = useRef(document.createElement("div"));

  useEffect(() => {
    let footerPortalRoot: HTMLElement | null = null;
    const current = el.current;
    const timeout = setTimeout(() => {
      footerPortalRoot = document.querySelector("#context-modal-footer-portal");
      if (footerPortalRoot) footerPortalRoot.appendChild(current);
    }, 0);

    return () => {
      clearTimeout(timeout);
      if (footerPortalRoot) footerPortalRoot.removeChild(current);
    };
  }, []);

  // eslint-disable-next-line react-hooks/refs -- el.current is a stable detached <div> created at init, never null
  return createPortal(children, el.current);
};

export default ModalFooterPortal;
