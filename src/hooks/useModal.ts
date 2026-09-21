import { useContext } from "react";
import { ModalContext } from "@/providers/modalContext";
import type { StackCtx } from "@/types";

export default function useModal(fallbackCtx?: StackCtx) {
  const ctx = useContext(ModalContext);
  return ctx ?? fallbackCtx;
}
