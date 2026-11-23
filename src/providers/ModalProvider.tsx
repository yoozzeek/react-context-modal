import { useMemo } from "react";
import type { ReactNode } from "react";
import { DEFAULT_MODAL_LAYOUT, ModalContext, ModalLayoutContext } from "@/providers/modalContext";
import useModalStackCtx from "@/hooks/useModalStackCtx.ts";
import type { CssLength, Size } from "@/types";

const CSS_LENGTH = /^(?:\d+(?:\.\d+)?|\.\d+)(?:px|em|rem)$/;

type ModalProviderProps = {
  children: ReactNode;
  dialogFrom?: CssLength;
  sheetCloseButton?: boolean;
  defaultSize?: Size;
};

function ModalProvider({
  children,
  dialogFrom = DEFAULT_MODAL_LAYOUT.dialogFrom,
  sheetCloseButton = DEFAULT_MODAL_LAYOUT.sheetCloseButton,
  defaultSize = DEFAULT_MODAL_LAYOUT.defaultSize,
}: ModalProviderProps) {
  const initialStack = useModalStackCtx();
  const layout = useMemo(() => {
    if (!CSS_LENGTH.test(dialogFrom)) {
      throw new Error(
        `react-context-modal: ModalProvider dialogFrom must be a non-negative length ` +
          `in px, em or rem, such as "768px"; received ${JSON.stringify(dialogFrom)}.`,
      );
    }

    return { dialogFrom, sheetCloseButton, defaultSize };
  }, [dialogFrom, sheetCloseButton, defaultSize]);

  return (
    <ModalLayoutContext.Provider value={layout}>
      <ModalContext.Provider value={initialStack}>{children}</ModalContext.Provider>
    </ModalLayoutContext.Provider>
  );
}

export default ModalProvider;
