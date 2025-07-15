import type { RefObject } from "react";
import type SimpleBarCore from "simplebar-core";

export type Size = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

export type OpenedModal = {
  key: string;
  modalRef: RefObject<HTMLDivElement>;
  containerRef: RefObject<HTMLDivElement>;
  scrollableContentRef: RefObject<HTMLDivElement>;
  simpleBarRef: RefObject<SimpleBarCore>;
  close: () => void;
  enableScroll?: () => void;
};

export type ModalCtx = {
  lastModal: OpenedModal | null;
  apply(modal: OpenedModal): void;
  remove(key: string): void;
  update(key: string, newData: any): void;
  getPositionInStack(key: string): [number, boolean];
};
