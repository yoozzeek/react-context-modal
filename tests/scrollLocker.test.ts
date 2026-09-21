import { describe, expect, it } from "vitest";
import disableScroll from "@/utils/scrollLocker";

function lockTarget(): HTMLElement {
  const element = document.createElement("div");
  document.body.append(element);

  return element;
}

describe("disableScroll", () => {
  it("keeps the body locked until the last lock is released", () => {
    const releaseFirst = disableScroll(lockTarget());
    const releaseSecond = disableScroll(lockTarget());

    releaseFirst();

    expect(document.body.style.overflow).toBe("hidden");

    releaseSecond();

    expect(document.body.style.overflow).toBe("");
  });

  it("ignores a repeated release", () => {
    const releaseFirst = disableScroll(lockTarget());
    const releaseSecond = disableScroll(lockTarget());

    releaseFirst();
    releaseFirst();

    expect(document.body.style.overflow).toBe("hidden");

    releaseSecond();

    expect(document.body.style.overflow).toBe("");
  });

  it("restores the inline overflow the page had before locking", () => {
    document.body.style.overflow = "scroll";

    const release = disableScroll(lockTarget());

    expect(document.body.style.overflow).toBe("hidden");

    release();

    expect(document.body.style.overflow).toBe("scroll");
  });
});
