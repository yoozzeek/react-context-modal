import { createContext } from "react";
import type { ModalLayout, StackCtx } from "@/types";

export const ModalContext = createContext<StackCtx | undefined>(undefined);

export const DEFAULT_MODAL_LAYOUT: ModalLayout = {
  dialogFrom: "576px",
  sheetCloseButton: false,
  defaultSize: "md",
};

export const ModalLayoutContext = createContext<ModalLayout>(DEFAULT_MODAL_LAYOUT);
