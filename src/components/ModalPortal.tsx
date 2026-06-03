import { useEffect, useMemo, useRef } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

const PORTAL_ROOT_ID = "context-modal-portal";

function resolvePortalRoot(): HTMLElement {
  const existing = document.getElementById(PORTAL_ROOT_ID);
  if (existing) {
    return existing;
  }

  const root = document.createElement("div");
  root.id = PORTAL_ROOT_ID;

  document.body.appendChild(root);

  return root;
}

const ModalPortal = ({ children }: { children: ReactNode }) => {
  const el = useRef(document.createElement("div"));
  const portalRoot = useMemo(() => resolvePortalRoot(), []);

  useEffect(() => {
    const current = el.current;
    portalRoot.appendChild(current);

    return () => void portalRoot.removeChild(current);
  }, [portalRoot]);

  return createPortal(children, portalRoot);
};

export default ModalPortal;
