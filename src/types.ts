import type { RefObject } from "react";
import type SimpleBarCore from "simplebar-core";

export type Size = "sm" | "md" | "lg" | "2xl" | "3xl";

export type ButtonSize = "xxs" | "xs" | "sm" | "md" | "lg" | "xl";

export type Variant =
  | "light"
  | "dark"
  | "outline-light"
  | "outline-green"
  | "outline-warning"
  | "success"
  | "danger"
  | "warning"
  | "gray"
  | "none";

export type ModalType = "menu" | "fullscreen" | "overlay-90" | "overlay-95" | "overlay-auto";

export type CssLength = `${number}px` | `${number}em` | `${number}rem`;

export type ModalLayout = {
  dialogFrom: CssLength;
  sheetCloseButton: boolean;
  defaultSize: Size;
};

export type OpenedModal = {
  key: string;
  modalRef: RefObject<HTMLDivElement>;
  containerRef: RefObject<HTMLDivElement>;
  scrollableContentRef: RefObject<HTMLDivElement>;
  simpleBarRef: RefObject<SimpleBarCore>;
  close: () => void;
};

export type StackCtx = {
  lastModal: OpenedModal | undefined;
  apply(modal: OpenedModal): void;
  remove(key: string): void;
  update(key: string, newData: Partial<Omit<OpenedModal, "key">>): void;
  getPositionInStack(key: string): [number, boolean];
};
