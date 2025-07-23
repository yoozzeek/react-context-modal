import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

const ModalFooterPortal = ({ children }: { children: ReactNode }) => {
  const el = useRef(document.createElement("div"));

  useEffect(() => {
    let footerPortalRoot: HTMLElement | null = null;
    const current = el.current;
    const timeout = setTimeout(() => {
      footerPortalRoot = document.querySelector("#rcm-modal-footer-portal");
      if (footerPortalRoot) footerPortalRoot.appendChild(current);
    }, 0);

    return () => {
      clearTimeout(timeout);
      if (footerPortalRoot) footerPortalRoot.removeChild(current);
    };
  }, []);

  return createPortal(children, el.current);
};

export default ModalFooterPortal;
