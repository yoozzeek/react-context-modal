import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { DetachedWindowAPI } from "happy-dom";
import { Modal, ModalProvider } from "@/index";
import { dispatchEscape, render } from "./render";

declare global {
  interface Window {
    happyDOM: DetachedWindowAPI;
  }
}

const DEFAULT_VIEWPORT_WIDTH = window.innerWidth;

async function setViewportWidth(width: number) {
  await act(async () => window.happyDOM.setViewport({ width }));
}

function containerOf(id: string): HTMLElement {
  const container = document.querySelector<HTMLElement>(`#${id}`);

  if (!container) {
    throw new Error(`no modal container "#${id}" in the document`);
  }

  return container;
}

function mainClassOf(id: string): string {
  return containerOf(id).querySelector(":scope > div")?.className ?? "";
}

function headerClassOf(id: string): string {
  return containerOf(id).querySelector("header")?.className ?? "";
}

function closeButtonOf(id: string): HTMLButtonElement | null {
  return containerOf(id).querySelector("header button");
}

afterEach(async () => {
  vi.useRealTimers();
  await setViewportWidth(DEFAULT_VIEWPORT_WIDTH);
});

describe("modal layout", () => {
  it("renders a sheet below dialogFrom and switches to a dialog when the viewport reaches it", async () => {
    await setViewportWidth(767);
    await render(
      <ModalProvider dialogFrom="768px">
        <Modal id="a" onClose={() => {}}>
          body
        </Modal>
      </ModalProvider>,
    );

    expect(containerOf("a").dataset.layout).toBe("sheet");
    expect(headerClassOf("a")).toContain("modal__header--with-bar");
    expect(closeButtonOf("a")).toBeNull();

    await setViewportWidth(768);

    expect(containerOf("a").dataset.layout).toBe("dialog");
    expect(headerClassOf("a")).not.toContain("modal__header--with-bar");
    expect(closeButtonOf("a")?.getAttribute("aria-label")).toBe("Close");
  });

  it("replaces the drag bar with the close button on sheets when sheetCloseButton is set", async () => {
    await setViewportWidth(500);
    await render(
      <ModalProvider sheetCloseButton>
        <Modal id="a" onClose={() => {}}>
          body
        </Modal>
      </ModalProvider>,
    );

    expect(containerOf("a").dataset.layout).toBe("sheet");
    expect(headerClassOf("a")).not.toContain("modal__header--with-bar");
    expect(closeButtonOf("a")).not.toBeNull();
  });

  it("holds a sheet open for the slide-out before calling onClose", async () => {
    const onClose = vi.fn();

    await setViewportWidth(600);
    await render(
      <ModalProvider dialogFrom="768px">
        <Modal id="a" onClose={onClose}>
          body
        </Modal>
      </ModalProvider>,
    );

    expect(containerOf("a").dataset.layout).toBe("sheet");

    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    await dispatchEscape();
    await act(async () => vi.advanceTimersByTime(199));

    expect(onClose).not.toHaveBeenCalled();

    await act(async () => vi.advanceTimersByTime(1));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose on the next tick for a dialog", async () => {
    const onClose = vi.fn();

    await setViewportWidth(500);
    await render(
      <ModalProvider dialogFrom="480px">
        <Modal id="a" onClose={onClose}>
          body
        </Modal>
      </ModalProvider>,
    );

    expect(containerOf("a").dataset.layout).toBe("dialog");

    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    await dispatchEscape();
    await act(async () => vi.advanceTimersByTime(0));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it("sizes modals by the provider's defaultSize unless a modal sets its own", async () => {
    await render(
      <ModalProvider defaultSize="lg">
        <Modal id="inherited" onClose={() => {}}>
          inherited
        </Modal>
        <Modal id="explicit" size="sm" onClose={() => {}}>
          explicit
        </Modal>
      </ModalProvider>,
    );

    expect(mainClassOf("inherited")).toContain("modal__main--lg");
    expect(mainClassOf("explicit")).toContain("modal__main--sm");
    expect(mainClassOf("explicit")).not.toContain("modal__main--lg");
  });

  it("rejects a dialogFrom without a CSS unit", async () => {
    await expect(
      render(
        // @ts-expect-error JS consumers can pass a unitless value that CssLength rejects
        <ModalProvider dialogFrom="768">
          <Modal id="a" onClose={() => {}}>
            body
          </Modal>
        </ModalProvider>,
      ),
    ).rejects.toThrow("ModalProvider dialogFrom must be a non-negative length in px, em or rem");
  });
});
