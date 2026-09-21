import { createContext } from "react";
import type { StackCtx } from "@/types";

export const ModalContext = createContext<StackCtx | undefined>(undefined);
