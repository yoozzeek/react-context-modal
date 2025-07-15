import { createContext } from "react";
import type { ReactNode } from "react";
import useModal from "@/hooks/useModal";
import type { ModalCtx } from "@/types";

export const ModalContext = createContext<ModalCtx>({
  lastModal: null,
  apply: () => {},
  remove: () => {},
  update: () => {},
  getPositionInStack: () => [1, true],
});

function ModalProvider({ children }: { children: ReactNode }) {
  const initialStack = useModal();
  return <ModalContext.Provider value={initialStack}>{children}</ModalContext.Provider>;
}

export default ModalProvider;
