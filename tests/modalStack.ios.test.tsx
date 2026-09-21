import { describe, expect, it, vi } from "vitest";
import { ModalProvider } from "@/index";
import disableScroll from "@/utils/scrollLocker";
import { ModalToggle, UpdateScrollTarget } from "./fixtures";
import { click, closeFromHeader, nextFrame, render } from "./render";

vi.hoisted(() => {
  Object.defineProperty(window.navigator, "platform", {
    configurable: true,
    get: () => "iPhone",
  });
  Object.defineProperty(window.navigator, "maxTouchPoints", { configurable: true, get: () => 5 });
});

function scrollContentOf(id: string): HTMLElement {
  const content = document.querySelector<HTMLElement>(`#${id} .simplebar-content-wrapper`);

  if (!content) {
    throw new Error(`no scrollable content found for modal "${id}"`);
  }

  return content;
}

function touchEvent(type: string, target: Element, clientY: number) {
  const event = new Event(type, { bubbles: true, cancelable: true });
  const touch = { identifier: 0, target, clientX: 10, clientY };

  for (const list of ["touches", "targetTouches", "changedTouches"]) {
    Object.defineProperty(event, list, { value: [touch] });
  }

  return event;
}

function touchScrollBlocked(element: HTMLElement): boolean {
  Object.defineProperty(element, "scrollHeight", { configurable: true, value: 1000 });
  Object.defineProperty(element, "clientHeight", { configurable: true, value: 500 });
  Object.defineProperty(element, "scrollTop", { configurable: true, value: 200 });

  element.dispatchEvent(touchEvent("touchstart", element, 300));

  const move = touchEvent("touchmove", element, 250);
  element.dispatchEvent(move);

  return move.defaultPrevented;
}

describe("modal stack scroll lock on iOS", () => {
  it("lets an open modal scroll its own content", async () => {
    await render(
      <ModalProvider>
        <ModalToggle id="m" />
      </ModalProvider>,
    );

    await click('[data-open="m"]');

    const content = scrollContentOf("m");

    expect(typeof content.ontouchmove).toBe("function");
    expect(touchScrollBlocked(content)).toBe(false);
  });

  it("moves the lock onto the new element when an open modal remounts", async () => {
    await render(
      <ModalProvider>
        <ModalToggle id="m" />
      </ModalProvider>,
    );

    await click('[data-open="m"]');

    const first = scrollContentOf("m");

    await click('[data-remount="m"]');

    const second = scrollContentOf("m");

    expect(second).not.toBe(first);
    expect(typeof second.ontouchmove).toBe("function");
    expect(touchScrollBlocked(second)).toBe(false);
    expect(first.ontouchmove).toBeNull();
  });

  it("keeps the body pinned for the parent after a nested modal closes", async () => {
    await render(
      <ModalProvider>
        <ModalToggle id="p">
          <ModalToggle id="c" />
        </ModalToggle>
      </ModalProvider>,
    );

    await click('[data-open="p"]');
    await nextFrame();

    expect(document.body.style.position).toBe("fixed");
    expect(document.body.style.width).toBe("100%");

    await click('[data-open="c"]');
    await closeFromHeader("c");

    expect(document.body.style.position).toBe("fixed");

    await closeFromHeader("p");

    expect(document.body.style.position).toBe("");
    expect(document.body.style.width).toBe("");
  });

  it("restores inline body offsets the page had before locking", async () => {
    document.body.style.top = "10px";
    document.body.style.left = "5px";

    const element = document.createElement("div");
    document.body.append(element);

    const release = disableScroll(element);
    await nextFrame();

    release();
    await nextFrame();

    expect(document.body.style.top).toBe("10px");
    expect(document.body.style.left).toBe("5px");
  });

  it("keeps an element locked while a second holder still needs it", async () => {
    const element = document.createElement("div");
    document.body.append(element);

    const first = disableScroll(element);
    const second = disableScroll(element);

    await nextFrame();

    second();

    expect(typeof element.ontouchmove).toBe("function");

    first();
    await nextFrame();

    expect(element.ontouchmove).toBeNull();
  });

  it("moves the lock when update() points a modal at another scroll container", async () => {
    const replacement = document.createElement("div");
    document.body.append(replacement);

    await render(
      <ModalProvider>
        <ModalToggle id="m" />
        <UpdateScrollTarget id="m" target={{ current: replacement }} />
      </ModalProvider>,
    );

    await click('[data-open="m"]');

    const original = scrollContentOf("m");

    expect(typeof original.ontouchmove).toBe("function");

    await click('[data-update="m"]');

    expect(original.ontouchmove).toBeNull();
    expect(typeof replacement.ontouchmove).toBe("function");
  });
});
