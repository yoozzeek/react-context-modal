import React, { FC, ReactNode, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";

const UIModalFooterPortal: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const el = useRef(document.createElement("div"));

  useEffect(() => {
    let footerPortalRoot: HTMLElement | null = null;
    const current = el.current;
    const timeout = setTimeout(() => {
      footerPortalRoot = document.querySelector("#modal-footer-container");
      if (footerPortalRoot) {
        footerPortalRoot.appendChild(current);
      }
    }, 0);

    return () => {
      clearTimeout(timeout);
      if (footerPortalRoot) {
        footerPortalRoot.removeChild(current);
      }
    };
  }, []);

  return createPortal(children, el.current);
};

export default UIModalFooterPortal;
