import { useCallback, useEffect, useMemo, useState } from "react";
import disableScroll from "@/utils/scrollLocker.ts";
import type { ModalStack, OpenedModal } from "@/types.ts";

// const TAB_KEY = "Tab";
const ESC_KEY = "Escape";

export default function useModal(): ModalStack {
  const [openedStack, setOpenedStack] = useState<OpenedModal[]>([]);
  const lastModal = useMemo(() => openedStack[openedStack.length - 1], [openedStack]);

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
      event.stopPropagation();
      if (event.key == ESC_KEY) {
        lastModal.close();
      }
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

  const apply = useCallback(
    (modal: OpenedModal) => {
      setOpenedStack((prev) => {
        const modalIdx = openedStack.findIndex((m) => m.key === modal.key);
        if (modalIdx !== -1) {
          return prev;
        }

        // Disable body scroll
        modal.enableScroll = disableScroll(
          modal.scrollableContentRef.current || modal.modalRef.current,
          !prev.length, // mark as first modal in stack
        );

        return [...prev, modal];
      });
    },
    [openedStack],
  );

  const remove = useCallback((key: string) => {
    setOpenedStack((prevState) => {
      const newState = [...prevState];
      const modalIdx = prevState.findIndex((modal) => modal.key === key);
      if (modalIdx === -1) {
        return prevState;
      }

      // If the modal is the first in the stack, remove all other
      // modals and enable body scroll. Because it's the root modal
      // and there is no need to keep the rest of the stack.
      if (modalIdx === 0) {
        newState.reverse().forEach((modal) => modal.enableScroll?.());
        return [];
      }

      // Enable body scroll and remove the modal from the stack
      newState[modalIdx].enableScroll?.();
      newState.splice(modalIdx, 1);

      return newState;
    });
  }, []);

  const update = useCallback(
    (key: string, newData: any) => {
      const modalIdx = openedStack.findIndex((modal) => modal.key === key);
      if (modalIdx > -1) {
        const updatedOpenedStack = [...openedStack];
        updatedOpenedStack[modalIdx] = {
          ...updatedOpenedStack[modalIdx],
          ...newData,
        };
        setOpenedStack(updatedOpenedStack);
      }
    },
    [openedStack],
  );

  function getPositionInStack(key: string): [number, boolean] {
    const idx = openedStack.findIndex((modal) => modal.key === key);
    return [idx, idx === openedStack.length - 1];
  }

  return {
    lastModal,
    apply,
    remove,
    update,
    getPositionInStack,
  };
}
