import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect.ts";
import disableScroll from "@/utils/scrollLocker.ts";
import type { StackCtx, OpenedModal } from "@/types";

const ESC_KEY = "Escape";

type ScrollLock = {
  target: HTMLElement;
  release: () => void;
};

function scrollTargetOf(modal: OpenedModal): HTMLElement | null {
  return modal.scrollableContentRef.current ?? modal.modalRef.current;
}

export default function useModalStackCtx(): StackCtx {
  const scrollLocksRef = useRef<Map<string, ScrollLock>>(new Map());

  const [openedStack, setOpenedStack] = useState<OpenedModal[]>([]);
  const lastModal = openedStack[openedStack.length - 1];

  /**
   * Listen outside taps on the last modal in stack
   */
  useEffect(() => {
    let startClickOutside = false;
    if (typeof document === "undefined") return;

    // Listeners are attached if at least one modal in stack
    if (!lastModal) return;

    const containerEl = lastModal?.containerRef.current;
    const contentEl = lastModal?.modalRef.current;

    function handleTouchStart(event: MouseEvent | TouchEvent) {
      startClickOutside = !!(contentEl && !contentEl.contains(event.target as Element));
    }

    function handleTouchEnd(event: MouseEvent | TouchEvent) {
      const endClickOutside = contentEl && !contentEl.contains(event.target as Element);

      if (startClickOutside && endClickOutside) {
        lastModal.close();
      }

      startClickOutside = false; // Reset for the next mousedown
    }

    function keyDownHandler(event: KeyboardEvent) {
      if (event.key !== ESC_KEY) return;

      event.stopPropagation();
      lastModal.close();
    }

    // Handle outside clicks and touches
    containerEl?.addEventListener("mousedown", handleTouchStart);
    containerEl?.addEventListener("touchstart", handleTouchStart);
    containerEl?.addEventListener("mouseup", handleTouchEnd);
    containerEl?.addEventListener("touchend", handleTouchEnd);

    // Handle ESC key
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      containerEl?.removeEventListener("mousedown", handleTouchStart);
      containerEl?.removeEventListener("touchstart", handleTouchStart);
      containerEl?.removeEventListener("mouseup", handleTouchEnd);
      containerEl?.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [lastModal]);

  useIsomorphicLayoutEffect(() => {
    const locks = scrollLocksRef.current;
    const targets = new Map(openedStack.map((modal) => [modal.key, scrollTargetOf(modal)]));

    for (const [key, lock] of locks) {
      if (targets.get(key) === lock.target) continue;

      lock.release();
      locks.delete(key);
    }

    for (const [key, target] of targets) {
      if (!target || locks.has(key)) continue;

      locks.set(key, { target, release: disableScroll(target) });
    }
  }, [openedStack]);

  useIsomorphicLayoutEffect(() => {
    const locks = scrollLocksRef.current;

    return () => {
      for (const lock of locks.values()) lock.release();

      locks.clear();
    };
  }, []);

  const apply = useCallback((modal: OpenedModal) => {
    setOpenedStack((prev) => {
      if (!prev.some((m) => m.key === modal.key)) {
        return [...prev, modal];
      }

      console.warn(
        `react-context-modal: a modal with id "${modal.key}" is already open. ` +
          `Modal ids must be unique. This modal is not registered in the stack, ` +
          `and gets no escape key, outside click or body scroll lock.`,
      );

      return prev;
    });
  }, []);

  const remove = useCallback((key: string) => {
    setOpenedStack((prevState) => {
      const nextState = prevState.filter((modal) => modal.key !== key);

      return nextState.length === prevState.length ? prevState : nextState;
    });
  }, []);

  const update = useCallback((key: string, newData: Partial<Omit<OpenedModal, "key">>) => {
    setOpenedStack((prevState) => {
      const modalIdx = prevState.findIndex((modal) => modal.key === key);

      if (modalIdx === -1) {
        return prevState;
      }

      const updatedOpenedStack = [...prevState];
      updatedOpenedStack[modalIdx] = {
        ...updatedOpenedStack[modalIdx],
        ...newData,
      };

      return updatedOpenedStack;
    });
  }, []);

  const getPositionInStack = useCallback(
    (key: string): [number, boolean] => {
      const idx = openedStack.findIndex((modal) => modal.key === key);
      return [idx, idx === openedStack.length - 1];
    },
    [openedStack],
  );

  return useMemo(
    () => ({
      lastModal,
      apply,
      remove,
      update,
      getPositionInStack,
    }),
    [lastModal, apply, remove, update, getPositionInStack],
  );
}
