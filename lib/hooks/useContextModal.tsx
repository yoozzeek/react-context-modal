import { useContext } from "react";
import { ModalContext } from "../providers/ModalProvider";

export default function useContextModal() {
  return useContext(ModalContext);
}
