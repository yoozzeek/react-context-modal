import { useState } from "react";
import type { ReactNode, RefObject } from "react";
import { Modal, useModal, useModalStackCtx, type StackCtx } from "@/index";

export function ModalToggle({
  id,
  stack,
  children,
}: {
  id: string;
  stack?: StackCtx;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [instance, setInstance] = useState(0);

  return (
    <>
      <button type="button" data-open={id} onClick={() => setOpen(true)}>
        open {id}
      </button>
      <button type="button" data-unmount={id} onClick={() => setOpen(false)}>
        unmount {id}
      </button>
      <button type="button" data-remount={id} onClick={() => setInstance((count) => count + 1)}>
        remount {id}
      </button>
      {open && (
        <Modal key={instance} id={id} fallbackCtx={stack} onClose={() => setOpen(false)}>
          {children}
        </Modal>
      )}
    </>
  );
}

export function GuardedModal({ id }: { id: string }) {
  const [open, setOpen] = useState(true);
  const [guarded, setGuarded] = useState(false);

  return (
    <>
      <button type="button" data-guard={id} onClick={() => setGuarded(true)}>
        guard {id}
      </button>
      <output data-state={id}>{open ? "open" : "closed"}</output>
      {open && (
        <Modal id={id} preventClose={guarded} onClose={() => setOpen(false)}>
          guarded body
        </Modal>
      )}
    </>
  );
}

export function DuplicateIds({ id }: { id: string }) {
  return (
    <>
      <Modal id={id} onClose={() => {}}>
        first
      </Modal>
      <Modal id={id} onClose={() => {}}>
        second
      </Modal>
    </>
  );
}

export function StackOrder({ keys }: { keys: string[] }) {
  const stack = useModal();

  const order = keys
    .map((key) => ({ key, index: stack?.getPositionInStack(key)[0] ?? -1 }))
    .filter(({ index }) => index >= 0)
    .sort((left, right) => left.index - right.index)
    .map(({ key }) => key)
    .join(",");

  return <output data-stack-order="">{order}</output>;
}

export function UpdateScrollTarget({
  id,
  target,
}: {
  id: string;
  target: RefObject<HTMLDivElement>;
}) {
  const stack = useModal();

  return (
    <button
      type="button"
      data-update={id}
      onClick={() => stack?.update(id, { scrollableContentRef: target })}
    >
      update {id}
    </button>
  );
}

export function DetachedStack({ id }: { id: string }) {
  const stack = useModalStackCtx();

  return <ModalToggle id={id} stack={stack} />;
}
