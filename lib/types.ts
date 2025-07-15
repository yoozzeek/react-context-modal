import type { RefObject } from "react";
import type SimpleBarCore from "simplebar-core";

export type Size = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

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

export type ModalType =
  | "base"
  | "menu"
  | "fullscreen"
  | "overlay-90"
  | "overlay-95"
  | "overlay-auto";

export type OpenedModal = {
  key: string;
  modalRef: RefObject<HTMLDivElement>;
  containerRef: RefObject<HTMLDivElement>;
  scrollableContentRef: RefObject<HTMLDivElement>;
  simpleBarRef: RefObject<SimpleBarCore>;
  close: () => void;
  enableScroll?: () => void;
};

export type StackCtx = {
  lastModal: OpenedModal | null;
  apply(modal: OpenedModal): void;
  remove(key: string): void;
  update(key: string, newData: any): void;
  getPositionInStack(key: string): [number, boolean];
};
