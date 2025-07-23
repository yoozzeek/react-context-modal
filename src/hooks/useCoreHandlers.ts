import { useState } from "react";
import type { RefObject } from "react";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import useGteSm from "@/hooks/useGteSm";
import { flushSync } from "react-dom";
import type { StackCtx, ModalType } from "@/types";

export default function useCoreHandlers({
  isLoading = false,
  id,
  type,
  horizontalSwipe,
  stackCtx,
  modalRef,
  modalHeaderRef,
  scrollAreaRef,
  onClose,
}: {
  id: string;
  type: ModalType;
  isLoading: boolean;
  horizontalSwipe: boolean;
  stackCtx?: StackCtx;
  modalRef: RefObject<HTMLDivElement>;
  modalHeaderRef: RefObject<HTMLDivElement>;
  scrollAreaRef: RefObject<HTMLDivElement>;
  onClose(): void;
}) {
  const gteSm = useGteSm();
  const [transformState, setTransformState] = useState({
    isMoving: false,
    scrollDisabled: false,
    transitionEnabled: true,
    transition: "none",
    transform: "none",
    opacity: 1,
  });
  const [closeAnimation, setCloseAnimation] = useState(false);

  /**
   * Modal touch and animation handlers initializer
   */
  useIsomorphicLayoutEffect(() => {
    const el = modalRef.current;
    if (!el) return;
    if (gteSm) return;

    // Right swipe allowed only on fullscreen and
    // base modals with horizontalSwipe prop
    const rSwipeAllowed = (type === "base" || type === "fullscreen") && horizontalSwipe;

    const headerEl = modalHeaderRef.current;

    // Set initial swipe state
    let currentY = 0;
    // let currentX = 0;
    let initialY = 0;
    let initialX = 0;
    let touchStart = 0;
    // let touchEnd = 0;
    let isLocked = false;
    let isMoving = false;
    let startedTime = 0;
    let initialPointWasAtTop = false;

    // Get direction and factor info from touch event
    const getTouchMeta = (
      e: TouchEvent,
    ): {
      directionX: number;
      directionY: number;
      factorX: number;
      factorY: number;
    } => {
      const deltaX = e.changedTouches[0].clientX - initialX;
      const deltaY = e.changedTouches[0].clientY - initialY;
      const directionX = Math.sign(deltaX);
      const directionY = Math.sign(deltaY);
      const factorX = Math.abs(deltaX / window.innerWidth);
      const factorY = Math.abs(deltaY / window.innerHeight);
      return {
        directionX,
        directionY,
        factorX,
        factorY,
      };
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      initialX = touch.clientX;
      initialY = touch.clientY;
      isLocked = true;
      isMoving = false;
      touchStart = new Date().getTime();
      startedTime = new Date().getTime();

      const { isTop } = getScrollMeta();
      initialPointWasAtTop = isTop;
    };

    function resetValues() {
      currentY = 0;
      // currentX = 0;
      initialY = 0;
      initialX = 0;
      touchStart = 0;
      // touchEnd = 0;
      isLocked = false;
      isMoving = false;
      startedTime = 0;
      initialPointWasAtTop = false;
    }

    function closeHelper() {
      setCloseAnimation(true);
      resetValues();

      // Close modal after animation is finished
      setTimeout(() => {
        stackCtx?.remove(id);
        onClose();
      }, 150);
    }

    function closeXWithTransition() {
      closeHelper();
      setTransformState((prevState) => ({
        ...prevState,
        transitionEnabled: true,
        transition: "transform 0.18s, opacity 0.18s",
        transform: `translateX(100%)`,
        opacity: 0,
      }));
    }

    function resetXWithTransition() {
      setTransformState((prevState) => ({
        ...prevState,
        isMoving: false,
        scrollDisabled: false,
        transitionEnabled: true,
        transition: "transform 0.15s, opacity 0.15s",
        transform: `translateX(0)`,
        opacity: 1,
      }));
    }

    function closeYWithTransition() {
      closeHelper();
      setTransformState((prevState) => ({
        ...prevState,
        transitionEnabled: true,
        transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
        transform: "translateY(100%)",
        opacity: 0,
      }));
    }

    function resetYWithTransition() {
      setTransformState((prevState) => ({
        ...prevState,
        transitionEnabled: true,
        transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
        transform: "translateY(0)",
        opacity: 1,
      }));
    }

    function preventResetX() {
      setTransformState((prevState) => ({
        ...prevState,
        isMoving: false,
        scrollDisabled: true,
        transitionEnabled: false,
        transition: "none",
        transform: `translateX(0)`,
        opacity: 1,
      }));
    }

    function preventResetY() {
      setTransformState((prevState) => ({
        ...prevState,
        isMoving: true,
        scrollDisabled: true,
        transitionEnabled: false,
        transition: "none",
        transform: `translateY(0)`,
        opacity: 1,
      }));
    }

    const handleTouchMove = (e: TouchEvent) => {
      const targetEl = e.target as HTMLElement;
      if (targetEl.closest("[horizontal-scroll-inside-modal]")) {
        return;
      }

      if (!isLocked) return;
      const { directionY, factorY, directionX, factorX } = getTouchMeta(e);

      currentY = e.touches[0].clientY;
      // currentX = e.touches[0].clientX;

      // ------------------------------------
      // Handle horizontal touch move if allowed
      if (rSwipeAllowed) {
        // Prevent if duration between touch start and move is too long
        if (!isMoving && new Date().getTime() - startedTime > 150) return;

        isMoving = true;

        // Don't allow swipe if direction is not right
        if (directionX === -1) {
          preventResetX();
          return;
        }

        // Detect horizontal swipe only and prevent vertical touchmove
        if (factorX > factorY) {
          const nextX = e.changedTouches[0].clientX - initialX;
          setTransformState({
            isMoving: true,
            scrollDisabled: true,
            transitionEnabled: false,
            transition: "none",
            transform: `translateX(${nextX}px)`,
            opacity: 1,
          });
          return;
        } else {
          // Otherwise prevent vertical touchmove and reset swipe state
          preventResetX();
        }

        return;
      }

      // -------------------------------
      // Handle vertical touch move
      if (type === "base" || type === "fullscreen") return;

      // Is it touch on modal header?
      const isTouchOnHeader = headerEl
        ? e.target === headerEl || headerEl.contains(e.target as Node)
        : false;

      // Prevent if duration between touch start and move is too long
      if (!isMoving && new Date().getTime() - startedTime > 150) return;
      isMoving = true;

      // Prevent swipe if gesture started from the scroll Y of the modal
      if (!initialPointWasAtTop && !isTouchOnHeader) {
        preventResetY();
        return;
      }

      // Prevent if direction is not down
      if (directionY === -1) {
        preventResetY();
        return;
      }

      // Change Y position if it is swipe down
      const nextY = e.changedTouches[0].clientY - initialY;
      setTransformState((state) => {
        return {
          ...state,
          transitionEnabled: false,
          transform: `translateY(${nextY}px)`,
          transition: "none",
        };
      });
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const { directionX, factorX, directionY, factorY } = getTouchMeta(e);

      // ------------------------------------
      // Handle horizontal swipe if allowed
      if (rSwipeAllowed) {
        // Close modal if swipe is right and factor is more than 0.25
        if (
          directionX === 1 &&
          factorX > 0.25 &&
          (new Date().getTime() - startedTime < 250 || factorX > 0.8)
        ) {
          closeXWithTransition();
        } else {
          // Otherwise reset swipe state
          resetXWithTransition();
        }

        resetValues();
        return;
      }

      // -------------------------------
      // Handle vertical swipe
      if (type === "base" || type === "fullscreen") return;

      if (!initialPointWasAtTop) {
        // Is it touch on modal header?
        const isTouchOnHeader = headerEl
          ? e.target === headerEl || headerEl.contains(e.target as Node)
          : false;

        // Close modal if header swiped down and factor is more than 0.25
        if (directionY === 1 && factorY > 0.25 && isTouchOnHeader) {
          closeYWithTransition();
        } else {
          // Otherwise reset swipe state to collapsed modal
          resetYWithTransition();
        }

        resetValues();
        return;
      }

      // Reset state when direction Y is not down
      if (directionY === -1) {
        resetYWithTransition();
        resetValues();
        return;
      }

      // Prevent close modal by swipe if content is scrolled
      const { isScrollable, isTop } = getScrollMeta();
      if (isScrollable && !isTop) {
        resetYWithTransition();
        resetValues();
        return;
      }

      // If initial Y is less than touch end Y then do not close modal
      if (initialY > currentY) {
        resetYWithTransition();
        resetValues();
        return;
      }

      // Hide modal if swipe factor is more than 0.2
      // and touch time is less than 300ms
      const endTime = new Date().getTime();
      const touchTime = endTime - touchStart;

      const swipedPercent = (currentY - initialY) / (modalRef.current?.clientHeight || 0);

      if (isTop && swipedPercent > 0.25 && touchTime < 250 && touchTime < 500) {
        closeYWithTransition();
        resetValues();
      } else if (touchTime > 500 && touchTime < 1200 && factorY > 0.2) {
        closeYWithTransition();
        resetValues();
      } else {
        // Otherwise reset state
        resetYWithTransition();
        resetValues();
      }
    };

    // Listen to whole scrollable area ref
    el.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    el.addEventListener("touchmove", handleTouchMove, { passive: true });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isLoading, type, gteSm, stackCtx?.lastModal]);

  function getScrollMeta() {
    let isScrollable = false;
    const sar = scrollAreaRef.current;
    if (sar) {
      isScrollable = sar.scrollHeight > sar.clientHeight;
    }
    let isTop = true;
    if (sar) isTop = sar.scrollTop === 0;
    let isBottom = true;
    if (sar) isBottom = sar.scrollTop + sar.clientHeight === sar.scrollHeight;
    return { isScrollable, isTop, isBottom };
  }

  function handleClose() {
    flushSync(() => {
      setCloseAnimation(true);
      setTransformState((state) => ({
        ...state,
        transitionEnabled: true,
        transform: "translateY(100%)",
        transition: "transform 0.12s ease-out, opacity 0.12s ease-out",
        opacity: 0,
      }));
    });

    setTimeout(
      () => {
        stackCtx?.remove(id);
        onClose();
      },
      gteSm ? 0 : 200,
    );
  }

  return {
    transformState,
    closeAnimation,
    handleClose,
  };
}
