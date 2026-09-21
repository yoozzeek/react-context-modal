import { act } from "react";
import type { ReactElement } from "react";
import { createRoot } from "react-dom/client";
import { onTestFinished } from "vitest";

const POLL_INTERVAL_MS = 10;
const POLL_ATTEMPTS = 100;
const SETTLE_MS = 300;

export async function render(element: ReactElement) {
  const container = document.createElement("div");
  document.body.append(container);

  const root = createRoot(container);

  async function unmount() {
    await act(async () => root.unmount());
    container.remove();
  }

  onTestFinished(unmount);

  await act(async () => root.render(element));

  return { unmount };
}

export async function nextFrame() {
  await act(async () => {
    await new Promise((resolve) => requestAnimationFrame(() => resolve(null)));
  });
}

export async function click(selector: string) {
  const target = document.querySelector<HTMLElement>(selector);

  if (!target) {
    throw new Error(`click: no element matches "${selector}"`);
  }

  await act(async () => target.click());
}

async function waitForRemoval(selector: string) {
  for (let attempt = 0; attempt < POLL_ATTEMPTS; attempt += 1) {
    if (!document.querySelector(selector)) return;

    await act(() => new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS)));
  }

  throw new Error(`waitForRemoval: "${selector}" is still in the document`);
}

export async function closeFromHeader(id: string) {
  await click(`#${id} header button`);
  await waitForRemoval(`#${id}`);
}

export async function dispatchEscape() {
  await act(async () => {
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  });
}

export async function pressEscape(id: string) {
  await dispatchEscape();
  await waitForRemoval(`#${id}`);
}

export async function settle() {
  await act(() => new Promise((resolve) => setTimeout(resolve, SETTLE_MS)));
}

export function stackOrder(): string {
  return document.querySelector("[data-stack-order]")?.textContent ?? "";
}

export function bodyOverflow(): string {
  return document.body.style.overflow;
}
