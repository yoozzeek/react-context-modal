import { useEffect, useMemo, useRef } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

const ModalPortal = ({ children }: { children: ReactNode }) => {
  const el = useRef(document.createElement("div"));
  const portalRoot = useMemo<HTMLElement>(
    () => document.querySelector("#rcm-modal-portal") as HTMLElement,
    [],
  );

  useEffect(() => {
    // Use this in case CRA throws an error about react-hooks/exhaustive-deps
    const current = el.current;
    portalRoot!.appendChild(current); // Assume `modalRoot` exists with '!'
    return () => void portalRoot!.removeChild(current);
  }, []);

  return createPortal(children, portalRoot);
};

export default ModalPortal;
