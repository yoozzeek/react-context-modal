import { default as default_2 } from 'simplebar-core';
import { JSX } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { MemoExoticComponent } from 'react';
import { ReactElement } from 'react';
import { ReactNode } from 'react';
import { RefObject } from 'react';

declare type ChildrenRendererFn = (onClose: () => void) => ReactNode;

export declare const Modal: MemoExoticComponent<typeof Modal_2>;

declare function Modal_2({ id, scrollAreaId, children, ariaLabel, title, onClose, loadingText, horizontalSwipe, confirmClose, isLoading, isPortal, mobileSafeTop, preventClose, tabletBreakpoint, confirmTitle, confirmDescription, headerRenderer, footerRenderer, fallbackCtx, type, size, }: ModalProps): JSX.Element;

declare type ModalChildrenType = ReactNode | ChildrenRendererFn;

declare type ModalProps = {
    id: string;
    title?: string | null;
    ariaLabel?: string | null;
    type?: ModalType;
    size?: Size;
    fallbackCtx?: StackCtx;
    tabletBreakpoint?: string;
    children: ModalChildrenType;
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

export declare function ModalProvider({ children }: {
    children: ReactNode;
}): JSX_2.Element;

export declare type ModalType = "menu" | "fullscreen" | "overlay-90" | "overlay-95" | "overlay-auto";

declare type OpenedModal = {
    key: string;
    modalRef: RefObject<HTMLDivElement>;
    containerRef: RefObject<HTMLDivElement>;
    scrollableContentRef: RefObject<HTMLDivElement>;
    simpleBarRef: RefObject<default_2>;
    close: () => void;
    enableScroll?: () => void;
};

export declare type Size = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

export declare type StackCtx = {
    lastModal: OpenedModal | null;
    apply(modal: OpenedModal): void;
    remove(key: string): void;
    update(key: string, newData: Partial<OpenedModal>): void;
    getPositionInStack(key: string): [number, boolean];
};

export declare function useModal(fallbackCtx?: StackCtx): StackCtx | undefined;

export declare function useModalStackCtx(): StackCtx;

export { }
