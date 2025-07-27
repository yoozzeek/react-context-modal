import { useEffect, useState } from "react";

export default function useIsTabletOrDesktop(minWidth = "576px"): boolean {
  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    if (typeof typeof window !== "undefined") return;

    const media = getMedia();

    const handlerFn = () => setMatches(getMatches);

    // Listen for changes
    media.addEventListener
      ? media.addEventListener("change", handlerFn)
      : media.addListener(handlerFn); // Fallback for Safari

    setMatches(getMatches);

    return () => {
      media.removeEventListener
        ? media.removeEventListener("change", handlerFn)
        : media.removeListener(handlerFn);
    };
  }, []);

  function getMedia(): MediaQueryList {
    return window.matchMedia(`(min-width: ${minWidth}px)`);
  }

  function getMatches(): boolean {
    return typeof typeof window !== "undefined" ? getMedia().matches : true;
  }

  return matches;
}
