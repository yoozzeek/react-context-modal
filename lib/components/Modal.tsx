import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ReactNode, JSX } from "react";
import type SimpleBarCore from "simplebar-core";
import SimpleBar from "simplebar-react";
import { clsx } from "clsx";
import ModalPortal from "./ModalPortal";
import type { Size } from "@/types";
import UIModalDefaultHeader from "./ModalHeader.tsx";
import useContextModal from "@/hooks/useContextModal";
import UILoader from "@/components/Loader";
import { flushSync } from "react-dom";
import UIModalConfirmAction from "./ModalConfirmAction";
import useGteSm from "@/hooks/useGteSm.ts";

export type ModalType =
  | "base"
  | "menu"
  | "fullscreen"
  | "overlay-90"
  | "overlay-95"
  | "overlay-auto";

type ModalProps = {
  id: string;
  scrollAreaId?: string;
  children: ReactNode;
  isPortal?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  confirmClose?: boolean;
  horizontalSwipe?: boolean;
  mobileSafeTop?: boolean;
  ariaLabel?: string | null;
  title?: string | null;
  bgColorClass?: string;
  preventClose?: boolean;
  confirmCloseModalTitle?: string;
  confirmCloseModalDescription?: string;
  headerEl?: JSX.Element | boolean | null;
  footerEl?: JSX.Element | boolean | null;
  type?: ModalType;
  size?: Size;
  onCloseModal(): void;
};

const useIsomorphicLayoutEffect = typeof document !== "undefined" ? useLayoutEffect : useEffect;

function Modal({
  id,
  scrollAreaId,
  children,
  ariaLabel,
  title,
  onCloseModal,
  loadingText,
  horizontalSwipe = false,
  confirmClose = false,
  isLoading = false,
  isPortal = true,
  mobileSafeTop = true,
  preventClose = false,
  bgColorClass,
  confirmCloseModalTitle = "Are you sure?",
  confirmCloseModalDescription = "Are you sure you want to close this dialog?",
  headerEl = true,
  footerEl,
  type = "base",
  size = "md",
}: ModalProps): JSX.Element {
  const modalCtx = useContextModal();
  const containerRef = useRef<HTMLDivElement>(null!);
  const modalRef = useRef<HTMLDivElement>(null!);
  const modalHeaderRef = useRef<HTMLDivElement>(null!);
  const contentRef = useRef<HTMLDivElement>(null!);
  const scrollAreaRef = useRef<HTMLDivElement>(null!);
  const simpleBarRef = useRef<SimpleBarCore>(null!);
  const gteSm = useGteSm();

  const isRightSwipeAllowed = horizontalSwipe && (type === "base" || type === "fullscreen");

  const [confirmCloseModal, setConfirmCloseModal] = useState(false);
  const [scrollableHeight, setScrollableHeight] = useState(contentRef.current?.clientHeight);

  // Touch and animation state
  const [closeAnimation, setCloseAnimation] = useState(false);
  const [transformState, setTransformState] = useState({
    isMoving: false,
    scrollDisabled: false,
    transitionEnabled: true,
    transition: "none",
    transform: "none",
    opacity: 1,
  });

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

    const closeHelper = () => {
      setCloseAnimation(true);
      setTransformState((state) => ({
        ...state,
        transitionEnabled: true,
        transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
        transform: "translateY(100%)",
        opacity: 0,
      }));

      // Close modal after animation is finished
      setTimeout(() => {
        onCloseModal();
      }, 150);

      initialPointWasAtTop = false;
      initialX = 0;
      initialY = 0;
      isLocked = false;
      isMoving = false;
      touchStart = 0;
      startedTime = 0;
    };

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
        const resetXTranslateSetter = (prevState: any) => ({
          ...prevState,
          isMoving: false,
          scrollDisabled: true,
          transitionEnabled: false,
          transition: "none",
          transform: `translateX(0)`,
          opacity: 1,
        });

        // Prevent if duration between touch start and move is too long
        if (!isMoving && new Date().getTime() - startedTime > 150) return;

        isMoving = true;

        // Don't allow swipe if direction is not right
        if (directionX === -1) {
          setTransformState(resetXTranslateSetter);
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
          setTransformState(resetXTranslateSetter);
        }

        return;
      }

      // -------------------------------
      // Handle vertical touch move
      if (type === "base" || type === "fullscreen") return;

      // Is it touch on modal header?
      const resetYStateSetter = (prevState: any) => ({
        ...prevState,
        isMoving: true,
        scrollDisabled: true,
        transitionEnabled: false,
        transition: "none",
        transform: `translateY(0)`,
        opacity: 1,
      });
      const isTouchOnHeader = headerEl
        ? e.target === headerEl || headerEl.contains(e.target as Node)
        : false;

      // Prevent if duration between touch start and move is too long
      if (!isMoving && new Date().getTime() - startedTime > 150) {
        return;
      }

      isMoving = true;

      // Prevent swipe if gesture started from the scroll Y of the modal
      if (!initialPointWasAtTop && !isTouchOnHeader) {
        setTransformState(resetYStateSetter);
        return;
      }

      // Prevent if direction is not down
      if (directionY === -1) {
        setTransformState(resetYStateSetter);
        return;
      }

      // Change Y position if user is swiping down
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

    function resetYTransform() {
      setTransformState((state) => ({
        ...state,
        transitionEnabled: true,
        transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
        transform: "translateY(0)",
        opacity: 1,
      }));
    }

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
          setCloseAnimation(true);
          setTransformState((prevState) => ({
            ...prevState,
            transitionEnabled: true,
            transition: "transform 0.18s, opacity 0.18s",
            transform: `translateX(100%)`,
            opacity: 0,
          }));

          // Close modal after animation is finished
          setTimeout(() => {
            onCloseModal();
          }, 180);
        } else {
          // Otherwise reset swipe state
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
          closeHelper();
        } else {
          // Otherwise reset swipe state to collapsed modal
          resetYTransform();
        }

        resetValues();
        return;
      }

      // Reset state when direction Y is not down
      if (directionY === -1) {
        resetYTransform();
        resetValues();
        return;
      }

      // Prevent close modal by swipe if content is scrolled
      const { isScrollable, isTop } = getScrollMeta();
      if (isScrollable && !isTop) {
        resetYTransform();
        resetValues();
        return;
      }

      // If initial Y is less than touch end Y then do not close modal
      if (initialY > currentY) {
        resetYTransform();
        resetValues();
        return;
      }

      // Hide modal if swipe factor is more than 0.2
      // and touch time is less than 300ms
      const endTime = new Date().getTime();
      const touchTime = endTime - touchStart;

      const swipedPercent = (currentY - initialY) / (modalRef.current?.clientHeight || 0);

      if (isTop && swipedPercent > 0.25 && touchTime < 250 && touchTime < 500) {
        closeHelper();
        resetValues();
      } else if (touchTime > 500 && touchTime < 1200 && factorY > 0.2) {
        closeHelper();
        resetValues();
      } else {
        // Otherwise reset state
        resetYTransform();
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
  }, [isLoading, type, gteSm]);

  const onCloseModalHandler = useCallback(() => {
    if (preventClose) return;
    if (confirmClose) {
      setConfirmCloseModal(true);
      return;
    }

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

    setTimeout(() => onCloseModal(), gteSm ? 0 : 200);
  }, [confirmClose, onCloseModal, gteSm]);

  const onConfirmCloseModalHandler = useCallback(() => {
    setConfirmCloseModal(false);

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

    setTimeout(() => onCloseModal(), gteSm ? 0 : 200);
  }, [onCloseModal, gteSm]);

  // Add modal to modal context on mount
  useLayoutEffect(() => {
    const key = id;
    modalCtx.apply({
      key,
      simpleBarRef,
      containerRef,
      modalRef: modalRef,
      scrollableContentRef: scrollAreaRef,
      close: onCloseModalHandler,
    });

    // To remove the modal from the context the
    // modal.close() method must be called in parent component.
    return () => modalCtx.remove(key);
  }, []);

  // Listen to scrollable area height changes
  useLayoutEffect(() => {
    if (!scrollAreaRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setScrollableHeight(scrollAreaRef.current?.clientHeight);
    });

    resizeObserver.observe(scrollAreaRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  /**
   * Renderers callbacks
   */
  const headerWrapperEl = useMemo(() => {
    // Don't render header during loading
    if (isLoading) return <></>;
    if (!isRightSwipeAllowed && typeof headerEl === "boolean" && headerEl) {
      return (
        <div ref={modalHeaderRef}>
          <UIModalDefaultHeader label={title} onClose={onCloseModalHandler} />
        </div>
      );
    }

    return (
      <div ref={modalHeaderRef} className="relative z-20">
        {headerEl}
      </div>
    );
  }, [headerEl, isLoading, title, type]);

  const alignmentClasses = useMemo<string>(() => {
    switch (type) {
      case "fullscreen":
        return "flex justify-center items-start";
      case "menu":
        return "flex justify-center items-end sm:items-center";
      case "overlay-90":
      case "overlay-95":
      case "overlay-auto":
        return "flex justify-center items-end sm:items-center";
      default:
        return "flex justify-center items-center";
    }
  }, [type]);

  const sizeClasses = useMemo<string>(() => {
    if (type === "fullscreen") {
      return "";
    }
    switch (size) {
      case "sm":
        return "sm:w-[300px]";
      case "md":
        return "sm:w-[400px]";
      case "lg":
        return "sm:w-[480px]";
      case "2xl":
        return "sm:w-[550px]";
      case "3xl":
        return "sm:w-[940px]";
      default:
        return "";
    }
  }, [size, type]);

  const modalClasses = useMemo<string>(() => {
    switch (type) {
      case "fullscreen":
        return "w-screen max-w-full h-full max-h-screen";
      case "menu":
        return "rounded-t-2xl w-screen max-w-full h-auto max-h-[93%] sm:max-h-[95%] sm:rounded-2xl";
      case "overlay-90":
        return "rounded-t-2xl w-screen max-w-full h-full max-h-[93%] sm:h-auto sm:max-h-[95%] sm:rounded-2xl";
      case "overlay-95":
        return "rounded-t-2xl w-screen max-w-full h-full max-h-[98%] sm:h-auto sm:max-h-[95%] sm:rounded-2xl";
      case "overlay-auto":
        return "rounded-t-2xl w-screen max-w-full h-auto max-h-[93%] sm:max-h-[95%] sm:rounded-2xl";
      default:
        return "w-screen max-w-full h-full max-h-[100%] sm:h-auto sm:max-h-[95%] sm:rounded-2xl";
    }
  }, [type]);

  const animationClasses = useMemo<string>(() => {
    if (closeAnimation) return "";
    switch (type) {
      case "menu":
      case "overlay-90":
      case "overlay-auto":
        return "animate-slide-up-90 sm:animate-none";
      case "overlay-95":
        return "animate-slide-up-95 sm:animate-none";
      case "fullscreen":
      default:
        return "animate-slide-right sm:animate-none";
    }
  }, [type, closeAnimation]);

  function renderModal(content: React.ReactElement) {
    return isPortal ? <ModalPortal>{content}</ModalPortal> : content;
  }

  return renderModal(
    <div
      id={id}
      ref={containerRef}
      role="dialog"
      aria-labelledby={ariaLabel || id}
      aria-modal="true"
      className={clsx("fixed inset-0 right-0 left-0 z-50 mx-auto touch-none", {
        [alignmentClasses]: alignmentClasses,
        "safe-top": type !== "fullscreen" && typeof type !== "undefined" && mobileSafeTop,
      })}
    >
      {/*<Head>*/}
      {/*  <meta name="theme-color" content="#000000" />*/}
      {/*</Head>*/}

      <div
        ref={modalRef}
        className={clsx("shadow-modal relative flex flex-col overflow-hidden", {
          "opacity-0": !scrollableHeight,
          [modalClasses]: modalClasses,
          [sizeClasses]: sizeClasses,
          [animationClasses]: animationClasses,
          [bgColorClass || ""]: bgColorClass,
          "bg-white": !bgColorClass,
        })}
        style={
          gteSm
            ? {
                // Patch for Safari browser
                maskImage: "-webkit-radial-gradient(white, black)",
              }
            : {
                willChange: "transform opacity",
                // parse transform value from touchState
                transition: transformState.transitionEnabled ? transformState.transition : "none",
                transform: transformState.transform,
                opacity: transformState.opacity,
              }
        }
        onClick={(e) => e.stopPropagation()}
      >
        {headerWrapperEl}

        <div className="z-10 flex grow overflow-hidden outline-none">
          <SimpleBar
            id={scrollAreaId}
            className="grow max-w-full"
            ref={simpleBarRef}
            scrollableNodeProps={{ ref: scrollAreaRef }}
          >
            {isLoading ? (
              <div className="flex py-12 w-full items-center justify-center">
                <UILoader text={loadingText} />
              </div>
            ) : (
              children
            )}
          </SimpleBar>
        </div>

        {footerEl && !isLoading && <footer className="p-4">{footerEl}</footer>}
      </div>

      {confirmCloseModal && (
        <UIModalConfirmAction
          title={confirmCloseModalTitle}
          description={confirmCloseModalDescription}
          onConfirm={onConfirmCloseModalHandler}
          onClose={() => setConfirmCloseModal(false)}
        />
      )}

      <div
        className={clsx(
          "absolute inset-0 -z-20 h-full w-full bg-gray-900",
          "transition-opacity duration-200 ease-in-out",
          {
            "opacity-50": !closeAnimation && isRightSwipeAllowed,
            "opacity-0":
              (closeAnimation && type !== "fullscreen") || (closeAnimation && isRightSwipeAllowed),
            "opacity-50 sm:opacity-30": !closeAnimation, // && type !== "fullscreen",
          },
        )}
        style={{
          willChange: "opacity",
        }}
      />
    </div>,
  );
}

export default Modal;
