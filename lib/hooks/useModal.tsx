import { useContext } from "react";
import { ModalContext } from "../providers/ModalProvider";
import type { StackCtx } from "@/types.ts";

export default function useModal(fallbackCtx?: StackCtx) {
  const ctx = useContext(ModalContext);
  return ctx ?? fallbackCtx;
}
