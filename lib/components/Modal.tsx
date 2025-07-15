import { memo, useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ReactNode, JSX } from "react";
import type SimpleBarCore from "simplebar-core";
import SimpleBar from "simplebar-react";
import { clsx } from "clsx";
import ModalPortal from "./ModalPortal";
import type { Size } from "@/types";
import UIModalDefaultHeader from "./ModalHeader.tsx";
import useContextModal from "@/hooks/useContextModal";
import UILoader from "@/components/Loader";
import UIModalConfirmAction from "./ModalConfirmAction";
import useGteSm from "@/hooks/useGteSm.ts";
import useModalHandlers from "@/hooks/useModalHandlers.ts";

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

  const { closeAnimation, transformState, handleClose } = useModalHandlers({
    modalCtx,
    modalRef,
    modalHeaderRef,
    scrollAreaRef,
    onCloseModal,
    type: type ?? "base",
    isLoading: isLoading ?? false,
    horizontalSwipe: horizontalSwipe ?? false,
  });

  const onCloseModalHandler = useCallback(() => {
    if (preventClose) return;
    if (confirmClose) {
      setConfirmCloseModal(true);
      return;
    }

    handleClose(id);
  }, [confirmClose, onCloseModal, gteSm]);

  const onConfirmCloseModalHandler = useCallback(() => {
    setConfirmCloseModal(false);
    handleClose(id);
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
    // return () => modalCtx.remove(key);
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

export default memo(Modal);
