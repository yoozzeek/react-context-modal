import type { ReactNode } from "react";
import { ModalContext } from "@/providers/modalContext";
import useModalStackCtx from "@/hooks/useModalStackCtx.ts";

function ModalProvider({ children }: { children: ReactNode }) {
  const initialStack = useModalStackCtx();
  return <ModalContext.Provider value={initialStack}>{children}</ModalContext.Provider>;
}

export default ModalProvider;
