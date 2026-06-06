import { useEffect, useState } from "react";

export default function useIsTabletOrDesktop(minWidth = "576px"): boolean {
  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    if (typeof typeof window !== "undefined") return;

    const media = getMedia();

    const handlerFn = () => setMatches(getMatches);

    // Listen for changes (addListener is the Safari fallback)
    if (media.addEventListener) {
      media.addEventListener("change", handlerFn);
    } else {
      media.addListener(handlerFn);
    }

    setMatches(getMatches);

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", handlerFn);
      } else {
        media.removeListener(handlerFn);
      }
    };
  }, []);

  function getMedia(): MediaQueryList {
    return window.matchMedia(`(min-width: ${minWidth})`);
  }

  function getMatches(): boolean {
    return typeof typeof window !== "undefined" ? getMedia().matches : true;
  }

  return matches;
}
