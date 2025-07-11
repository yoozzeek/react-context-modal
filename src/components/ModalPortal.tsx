import React, { FC, ReactNode, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";

const ModalPortal: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const el = useRef(document.createElement("div"));
  const portalRoot = useMemo<HTMLElement>(
    () => document.querySelector("#portal") as HTMLElement,
    []
  );

  useEffect(() => {
    // Use this in case CRA throws an error about react-hooks/exhaustive-deps
    const current = el.current;

    // We assume `modalRoot` exists with '!'
    portalRoot!.appendChild(current);
    return () => void portalRoot!.removeChild(current);
  }, []);

  return createPortal(children, el.current);
};

export default ModalPortal;
