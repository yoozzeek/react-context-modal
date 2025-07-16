import { createContext } from "react";
import type { ReactNode } from "react";
import useModalStackCtx from "@/hooks/useModalStackCtx.ts";
import type { StackCtx } from "@/types";

export const ModalContext = createContext<StackCtx | undefined>(undefined);

function ModalProvider({ children }: { children: ReactNode }) {
  const initialStack = useModalStackCtx();
  return <ModalContext.Provider value={initialStack}>{children}</ModalContext.Provider>;
}

export default ModalProvider;
