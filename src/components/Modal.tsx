import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ReactNode, ReactElement, JSX } from "react";
import type SimpleBarCore from "simplebar-core";
import SimpleBar from "simplebar-react";
import { clsx } from "clsx";
import ModalPortal from "./ModalPortal";
import type { ModalType, Size, StackCtx } from "@/types";
import ModalDefaultHeader from "./ModalHeader";
import useModal from "@/hooks/useModal";
import Loader from "@/components/Loader";
import ModalConfirmAction from "./ModalConfirmAction";
import useIsTabletOrDesktop from "@/hooks/useIsTabletOrDesktop.ts";
import useCoreHandlers from "@/hooks/useCoreHandlers";
import styles from "@/styles/modal.module.css";

type ModalProps = {
  id: string;
  title?: string | null;
  ariaLabel?: string | null;
  type?: ModalType;
  size?: Size;
  fallbackCtx?: StackCtx;
  tabletBreakpoint?: string;
  children: ReactNode;
  isPortal?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  confirmClose?: boolean;
  horizontalSwipe?: boolean;
  mobileSafeTop?: boolean;
  preventClose?: boolean;
  scrollAreaId?: string;
  confirmTitle?: string;
  confirmDescription?: string;
  headerRenderer?: (onClose: () => void) => ReactElement;
  footerRenderer?: (onClose: () => void) => ReactElement;
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
  tabletBreakpoint,
  confirmTitle = "Are you sure?",
  confirmDescription = "Are you sure you want to close this dialog?",
  headerRenderer,
  footerRenderer,
  fallbackCtx,
  type = "overlay-auto",
  size = "md",
}: ModalProps): JSX.Element {
  const stackCtx = useModal(fallbackCtx);
  const containerRef = useRef<HTMLDivElement>(null!);
  const modalRef = useRef<HTMLDivElement>(null!);
  const modalHeaderRef = useRef<HTMLDivElement>(null!);
  const contentRef = useRef<HTMLDivElement>(null!);
  const scrollAreaRef = useRef<HTMLDivElement>(null!);
  const simpleBarRef = useRef<SimpleBarCore>(null!);
  const gteSm = useIsTabletOrDesktop(tabletBreakpoint);

  const isRightSwipeAllowed = horizontalSwipe && type === "fullscreen";

  const [confirmCloseModal, setConfirmCloseModal] = useState(false);
  const [scrollableHeight, setScrollableHeight] = useState(contentRef.current?.clientHeight);

  const { closeAnimation, transformState, handleClose } = useCoreHandlers({
    id,
    modalRef,
    modalHeaderRef,
    scrollAreaRef,
    onClose,
    type: type ?? "overlay-auto",
    isLoading: isLoading ?? false,
    horizontalSwipe: horizontalSwipe ?? false,
    stackCtx: stackCtx!,
  });

  const onCloseModalHandler = useCallback(() => {
    if (preventClose) return;
    if (confirmClose) {
      setConfirmCloseModal(true);
      return;
    }
    handleClose();
  }, [confirmClose]);

  const onConfirmCloseModalHandler = useCallback(() => {
    setConfirmCloseModal(false);
    handleClose();
  }, []);

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

  useEffect(() => {
    const existingMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    let originalContent = null;
    let metaEl = existingMeta;

    if (existingMeta) {
      originalContent = existingMeta.getAttribute("content");
      existingMeta.setAttribute("content", "#000000"); // Temporarily override
    } else {
      metaEl = document.createElement("meta");
      metaEl.name = "theme-color";
      metaEl.content = "#000000";
      document.head.appendChild(metaEl);
    }

    return () => {
      if (originalContent !== null) {
        metaEl?.setAttribute("content", originalContent);
      } else {
        metaEl?.remove();
      }
    };
  }, []);

  // Dynamic header
  const dynamicHeader = useMemo(() => {
    if (!headerRenderer) return null;
    return headerRenderer(onCloseModalHandler);
  }, [headerRenderer, onCloseModalHandler]);

  const headerWrapperEl =
    !isLoading && (isRightSwipeAllowed || dynamicHeader) ? (
      <div ref={modalHeaderRef}>{dynamicHeader}</div>
    ) : (
      <div ref={modalHeaderRef}>
        <ModalDefaultHeader label={title || undefined} onClose={onCloseModalHandler} />
      </div>
    );

  // Dynamic footer
  const dynamicFooter = useMemo(() => {
    if (!footerRenderer) return null;
    return footerRenderer(onCloseModalHandler);
  }, [footerRenderer, onCloseModalHandler]);

  const footerWrapperEl =
    !isLoading && !!dynamicFooter ? (
      <footer className={styles.modal__footer}>{dynamicFooter}</footer>
    ) : null;

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
    [styles[`modal__main--animate-slide-right`]]: !closeAnimation && type === "fullscreen",
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
                <Loader text={loadingText} />
              </div>
            ) : (
              children
            )}
          </SimpleBar>
        </div>
        {footerWrapperEl}
      </div>
      {confirmCloseModal && (
        <ModalConfirmAction
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
