import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

type BodyPin = {
  isIos: boolean;
  scrollX: number;
  scrollY: number;
  position: string;
  top: string;
  left: string;
  overflow: string;
};

const lockedTargets = new Map<HTMLElement, number>();

let bodyPin: BodyPin | null = null;

function isIosDevice(): boolean {
  const { platform, maxTouchPoints } = window.navigator;
  return /iP(ad|hone|od)/.test(platform) || (platform === "MacIntel" && maxTouchPoints > 1);
}

function allowTouchMove(el: HTMLElement | Element): boolean {
  let node: Element | null = el;
  while (node && node !== document.body) {
    if (node.getAttribute("body-scroll-lock-ignore") !== null) {
      return true;
    }

    node = node.parentElement;
  }

  return false;
}

function pinBody(): BodyPin {
  const pin = {
    isIos: isIosDevice(),
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    position: document.body.style.position,
    top: document.body.style.top,
    left: document.body.style.left,
    overflow: document.body.style.overflow,
  };

  if (pin.isIos) {
    document.body.style.setProperty("width", "100%");
  }

  return pin;
}

function repinBody(pin: BodyPin) {
  if (pin.isIos) {
    document.body.style.position = "fixed";
    document.body.style.setProperty("top", `${-pin.scrollY}px`);
    document.body.style.setProperty("left", `${-pin.scrollX}px`);
  }

  document.body.style.overflow = "hidden";
}

function unpinBody(pin: BodyPin) {
  if (pin.isIos) {
    document.body.style.position = pin.position;
    document.body.style.setProperty("top", pin.top);
    document.body.style.setProperty("left", pin.left);
    document.body.style.setProperty("width", "");

    window.scrollTo(pin.scrollX, pin.scrollY);
  }

  document.body.style.overflow = pin.overflow;
}

export default function disableScroll(element: HTMLElement): () => void {
  if (lockedTargets.size === 0) {
    bodyPin = pinBody();
  }

  const holders = lockedTargets.get(element) ?? 0;
  lockedTargets.set(element, holders + 1);

  if (holders === 0) {
    disableBodyScroll(element, { allowTouchMove });
  }

  let released = false;

  return () => {
    if (released) return;

    released = true;

    const remaining = (lockedTargets.get(element) ?? 1) - 1;

    if (remaining > 0) {
      lockedTargets.set(element, remaining);
    } else {
      lockedTargets.delete(element);
      enableBodyScroll(element);
    }

    if (!bodyPin) return;
    if (lockedTargets.size > 0) {
      repinBody(bodyPin);
      return;
    }

    unpinBody(bodyPin);

    bodyPin = null;
  };
}
