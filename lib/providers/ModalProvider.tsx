import { createContext } from "react";
import type { ReactNode } from "react";
import useModal from "@/hooks/useModal.tsx";
import type { ModalStack } from "@/types.ts";

export const ModalContext = createContext<ModalStack>({
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
