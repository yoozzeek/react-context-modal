import { useCallback, useSyncExternalStore } from "react";
import type { CssLength } from "@/types";

export default function useMediaMinWidth(minWidth: CssLength): boolean {
  const query = `(min-width: ${minWidth})`;

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const media = window.matchMedia(query);

      if (media.addEventListener) {
        media.addEventListener("change", onStoreChange);
        return () => media.removeEventListener("change", onStoreChange);
      }

      media.addListener(onStoreChange);
      return () => media.removeListener(onStoreChange);
    },
    [query],
  );

  const getSnapshot = () => window.matchMedia(query).matches;
  const getServerSnapshot = () => true;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
