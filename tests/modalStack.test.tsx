import { StrictMode } from "react";
import type { ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { ModalProvider } from "@/index";
import { DetachedStack, DuplicateIds, GuardedModal, ModalToggle, StackOrder } from "./fixtures";
import {
  bodyOverflow,
  click,
  closeFromHeader,
  dispatchEscape,
  pressEscape,
  render,
  settle,
  stackOrder,
} from "./render";

describe.each([
  { mode: "default", wrap: (app: ReactElement) => app },
  { mode: "strict mode", wrap: (app: ReactElement) => <StrictMode>{app}</StrictMode> },
])("modal stack ($mode)", ({ wrap }) => {
  it("locks the body while a modal is open and releases it on close", async () => {
    await render(
      wrap(
        <ModalProvider>
          <StackOrder keys={["a"]} />
          <ModalToggle id="a" />
        </ModalProvider>,
      ),
    );

    await click('[data-open="a"]');

    expect(stackOrder()).toBe("a");
    expect(bodyOverflow()).toBe("hidden");

    await closeFromHeader("a");

    expect(stackOrder()).toBe("");
    expect(bodyOverflow()).toBe("");
  });

  it("releases the lock when the consumer unmounts an open modal", async () => {
    await render(
      wrap(
        <ModalProvider>
          <StackOrder keys={["a"]} />
          <ModalToggle id="a" />
        </ModalProvider>,
      ),
    );

    await click('[data-open="a"]');
    await click('[data-unmount="a"]');

    expect(stackOrder()).toBe("");
    expect(bodyOverflow()).toBe("");
  });

  it("keeps the body locked for the parent after a nested modal closes", async () => {
    await render(
      wrap(
        <ModalProvider>
          <StackOrder keys={["p", "c"]} />
          <ModalToggle id="p">
            <ModalToggle id="c" />
          </ModalToggle>
        </ModalProvider>,
      ),
    );

    await click('[data-open="p"]');
    await click('[data-open="c"]');

    expect(stackOrder()).toBe("p,c");
    expect(bodyOverflow()).toBe("hidden");

    await closeFromHeader("c");

    expect(stackOrder()).toBe("p");
    expect(bodyOverflow()).toBe("hidden");

    await closeFromHeader("p");

    expect(stackOrder()).toBe("");
    expect(bodyOverflow()).toBe("");
  });

  it("keeps an independent modal registered when the root modal unmounts", async () => {
    await render(
      wrap(
        <ModalProvider>
          <StackOrder keys={["a", "b"]} />
          <ModalToggle id="a" />
          <ModalToggle id="b" />
        </ModalProvider>,
      ),
    );

    await click('[data-open="a"]');
    await click('[data-open="b"]');

    expect(stackOrder()).toBe("a,b");

    await click('[data-unmount="a"]');

    expect(stackOrder()).toBe("b");
    expect(bodyOverflow()).toBe("hidden");

    await pressEscape("b");

    expect(stackOrder()).toBe("");
    expect(bodyOverflow()).toBe("");
  });

  it("keeps an independent modal registered when the root modal closes itself", async () => {
    await render(
      wrap(
        <ModalProvider>
          <StackOrder keys={["a", "b"]} />
          <ModalToggle id="a" />
          <ModalToggle id="b" />
        </ModalProvider>,
      ),
    );

    await click('[data-open="a"]');
    await click('[data-open="b"]');

    await closeFromHeader("a");

    expect(stackOrder()).toBe("b");
    expect(bodyOverflow()).toBe("hidden");
  });

  it("releases every lock when the root closes while a nested modal is open", async () => {
    await render(
      wrap(
        <ModalProvider>
          <StackOrder keys={["p", "c"]} />
          <ModalToggle id="p">
            <ModalToggle id="c" />
          </ModalToggle>
        </ModalProvider>,
      ),
    );

    await click('[data-open="p"]');
    await click('[data-open="c"]');

    expect(stackOrder()).toBe("p,c");

    await closeFromHeader("p");

    expect(stackOrder()).toBe("");
    expect(bodyOverflow()).toBe("");
  });

  it("releases the lock when the provider unmounts with a modal open", async () => {
    const app = await render(
      wrap(
        <ModalProvider>
          <ModalToggle id="a" />
        </ModalProvider>,
      ),
    );

    await click('[data-open="a"]');

    expect(bodyOverflow()).toBe("hidden");

    await app.unmount();

    expect(bodyOverflow()).toBe("");
  });

  it("warns when a second modal reuses an open modal id", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    await render(
      wrap(
        <ModalProvider>
          <DuplicateIds id="dup" />
        </ModalProvider>,
      ),
    );

    expect(warn).toHaveBeenCalledWith(expect.stringContaining('id "dup" is already open'));

    warn.mockRestore();
  });

  it("honours preventClose switched on after the modal mounted", async () => {
    await render(
      wrap(
        <ModalProvider>
          <GuardedModal id="g" />
        </ModalProvider>,
      ),
    );

    await click('[data-guard="g"]');
    await dispatchEscape();
    await settle();

    expect(document.querySelector('[data-state="g"]')?.textContent).toBe("open");
    expect(document.querySelector("#g")).not.toBeNull();
  });

  it("keeps the body locked while a second stack still holds an open modal", async () => {
    await render(
      wrap(
        <>
          <ModalProvider>
            <ModalToggle id="a" />
          </ModalProvider>
          <DetachedStack id="b" />
        </>,
      ),
    );

    await click('[data-open="a"]');
    await click('[data-open="b"]');

    expect(bodyOverflow()).toBe("hidden");

    await closeFromHeader("a");

    expect(bodyOverflow()).toBe("hidden");

    await closeFromHeader("b");

    expect(bodyOverflow()).toBe("");
  });
});
