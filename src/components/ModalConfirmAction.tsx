import "@/styles/confirm.module.css";
import Modal from "./Modal";
import Button from "@/components/Button";
import type { JSX } from "react";
import type { Variant } from "@/types.ts";

function ModalConfirmAction({
  title,
  description,
  variant = "danger",
  isLoading = false,
  onConfirm,
  onClose,
}: {
  title?: string;
  description?: string;
  variant?: Variant;
  isLoading?: boolean;
  onConfirm(): void;
  onClose(): void;
}): JSX.Element {
  function handleConfirm() {
    onConfirm();
    onClose();
  }
  return (
    <Modal
      id="confirm-action-modal"
      ariaLabel="Aria label"
      type="overlay-auto"
      size="sm"
      headerRenderer={() => <h3 className="modal-confirm__title">{title}</h3>}
      footerRenderer={(onCloseHandler) => (
        <div className="modal-confirm__footer">
          <Button
            fullWidth
            type="button"
            variant={variant}
            loading={isLoading}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
          <Button
            fullWidth
            type="button"
            variant="light"
            disabled={isLoading}
            onClick={onCloseHandler}
          >
            Cancel
          </Button>
        </div>
      )}
      onClose={onClose}
    >
      {description && <p className="modal-confirm__description">{description}</p>}
    </Modal>
  );
}

export default ModalConfirmAction;
