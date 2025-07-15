import { memo, useCallback, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode, ReactElement, JSX } from "react";
import type SimpleBarCore from "simplebar-core";
import SimpleBar from "simplebar-react";
import { clsx } from "clsx";
import ModalPortal from "./ModalPortal";
import type { ModalType, Size, StackCtx } from "@/types";
import UIModalDefaultHeader from "./ModalHeader.tsx";
import useModal from "@/hooks/useModal.tsx";
import UILoader from "@/components/Loader";
import UIModalConfirmAction from "./ModalConfirmAction";
import useGteSm from "@/hooks/useGteSm.ts";
import useCoreHandlers from "@/hooks/useCoreHandlers.ts";
import styles from "@/assets/styles/modal.module.css";

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
  confirmTitle?: string;
  confirmDescription?: string;
  headerEl?: JSX.Element | boolean | null;
  footerEl?: JSX.Element | boolean | null;
  type?: ModalType;
  size?: Size;
  fallbackCtx?: StackCtx;
  onClose(): void;
};

function Modal({
  id,
  scrollAreaId,
  children,
  ariaLabel,
  title,
  onClose,
  loadingText,
  horizontalSwipe = false,
  confirmClose = false,
  isLoading = false,
  isPortal = true,
  mobileSafeTop = true,
  preventClose = false,
  bgColorClass,
  confirmTitle = "Are you sure?",
  confirmDescription = "Are you sure you want to close this dialog?",
  headerEl = true,
  footerEl,
  fallbackCtx,
  type = "base",
  size = "md",
}: ModalProps): JSX.Element {
  const stackCtx = useModal(fallbackCtx);
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

  const { closeAnimation, transformState, handleClose } = useCoreHandlers({
    id,
    modalRef,
    modalHeaderRef,
    scrollAreaRef,
    onClose,
    type: type ?? "base",
    isLoading: isLoading ?? false,
    horizontalSwipe: horizontalSwipe ?? false,
    stackCtx: fallbackCtx,
  });

  const onCloseModalHandler = useCallback(() => {
    if (preventClose) return;
    if (confirmClose) {
      setConfirmCloseModal(true);
      return;
    }
    handleClose();
  }, [confirmClose, onClose, gteSm]);

  const onConfirmCloseModalHandler = useCallback(() => {
    setConfirmCloseModal(false);
    handleClose();
  }, [onClose, gteSm]);

  useLayoutEffect(() => {
    const key = id;
    stackCtx?.apply({
      key,
      simpleBarRef,
      containerRef,
      modalRef: modalRef,
      scrollableContentRef: scrollAreaRef,
      close: onCloseModalHandler,
    });
  }, []);

  useLayoutEffect(() => {
    if (!scrollAreaRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setScrollableHeight(scrollAreaRef.current?.clientHeight);
    });
    resizeObserver.observe(scrollAreaRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Header
  const headerWrapperEl =
    !isLoading && (isRightSwipeAllowed || typeof headerEl !== "boolean" || !headerEl) ? (
      <div ref={modalHeaderRef} className={styles.modal__header}>
        {headerEl}
      </div>
    ) : (
      <div ref={modalHeaderRef} className={styles.modal__header}>
        <UIModalDefaultHeader label={title || undefined} onClose={onCloseModalHandler} />
      </div>
    );

  const containerClass = clsx(styles.modal__container, {
    [styles[`modal__container--fullscreen`]]: type === "fullscreen",
    [styles[`modal__container--menu`]]: type === "menu",
    [styles[`modal__container--overlay-90`]]: type === "overlay-90",
    [styles[`modal__container--overlay-95`]]: type === "overlay-95",
    [styles[`modal__container--overlay-auto`]]: type === "overlay-auto",
    [styles[`modal__safe-top`]]: type !== "fullscreen" && mobileSafeTop,
  });

  const mainClass = clsx(styles.modal__main, styles[`modal__main--${type}`], {
    [styles[`modal__main--${size}`]]: type !== "fullscreen",
    [styles[`modal__main--opacity-0`]]: !scrollableHeight,
    [styles[`modal__main--animate-slide-up-90`]]:
      !closeAnimation && (type === "menu" || type === "overlay-90" || type === "overlay-auto"),
    [styles[`modal__main--animate-slide-up-95`]]: !closeAnimation && type === "overlay-95",
    [styles[`modal__main--animate-slide-right`]]:
      !closeAnimation && (type === "fullscreen" || type === "base"),
    [bgColorClass!]: !!bgColorClass,
  });

  function renderModal(content: ReactElement) {
    return isPortal ? <ModalPortal>{content}</ModalPortal> : content;
  }

  return renderModal(
    <div
      id={id}
      ref={containerRef}
      role="dialog"
      aria-labelledby={ariaLabel || id}
      aria-modal="true"
      className={containerClass}
    >
      <div
        ref={modalRef}
        className={mainClass}
        style={
          gteSm
            ? {
                // Patch for Safari browser
                maskImage: "-webkit-radial-gradient(white, black)",
              }
            : {
                willChange: "transform opacity",
                transition: transformState.transitionEnabled ? transformState.transition : "none",
                transform: transformState.transform,
                opacity: transformState.opacity,
              }
        }
        onClick={(e) => e.stopPropagation()}
      >
        {headerWrapperEl}
        <div className={styles.modal__body}>
          <SimpleBar
            id={scrollAreaId}
            className={styles["modal__scroll-area"]}
            ref={simpleBarRef}
            scrollableNodeProps={{ ref: scrollAreaRef }}
          >
            {isLoading ? (
              <div className={styles.modal__loader}>
                <UILoader text={loadingText} />
              </div>
            ) : (
              children
            )}
          </SimpleBar>
        </div>
        {footerEl && !isLoading && <footer className={styles.modal__footer}>{footerEl}</footer>}
      </div>
      {confirmCloseModal && (
        <UIModalConfirmAction
          title={confirmTitle}
          description={confirmDescription}
          onConfirm={onConfirmCloseModalHandler}
          onClose={() => setConfirmCloseModal(false)}
        />
      )}
      <div
        className={clsx(styles.modal__backdrop, {
          [styles["modal__backdrop--hidden"]]:
            (closeAnimation && type !== "fullscreen") || (closeAnimation && isRightSwipeAllowed),
        })}
        style={{
          willChange: "opacity",
        }}
      />
    </div>,
  );
}

export default memo(Modal);
