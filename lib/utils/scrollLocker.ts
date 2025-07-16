import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

export default function disableScroll(
  element: HTMLElement | null,
  isFirstInStack = true,
): () => void {
  if (!element) return () => null;

  const storedScrollY = window.scrollY;
  isFirstInStack && document.body.style.setProperty("top", `${storedScrollY * -1}px`);

  // When disabling body scrolling
  disableBodyScroll(element, {
    // @ts-ignore
    allowTouchMove: (el) => {
      while (el && el !== document.body) {
        if (el.getAttribute("body-scroll-lock-ignore") !== null) {
          return true;
        }

        // @ts-ignore
        el = el.parentElement;
      }
    },
  });
  return () => {
    // When enabling body scrolling
    enableBodyScroll(element);

    if (isFirstInStack) {
      document.body.style.setProperty("top", "");
      document.body.scrollTo(0, storedScrollY);
    }

    // Patch for modal stacking:
    // body-scroll-lock clears overflow hidden on the body after enabling.
    // We prevent this behavior and restore overflow hidden from the body
    // if this is not the first element in the stack.
    if (!isFirstInStack) {
      document.body.style.overflow = "hidden";
      return;
    }

    document.body.style.overflow = "";
  };
}
