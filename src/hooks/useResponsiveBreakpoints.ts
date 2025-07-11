import { UIResponsiveContext } from "../providers/ResponsiveProvider";
import { useContext } from "react";

export default function useResponsiveBreakpoints() {
  return useContext(UIResponsiveContext);
}
