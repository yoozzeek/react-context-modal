import Modal from "./Modal";
import Button from "@/components/Button";

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
  isLoading?: boolean;
  variant?: "danger" | "success";
  onConfirm(): void;
  onClose(): void;
}) {
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
      headerEl={<h3 className="pt-6 text-center text-2xl font-semibold">{title}</h3>}
      footerEl={
        <div className="safe-bottom mt-4 flex gap-3">
          <Button
            fullWidth
            type="button"
            variant={variant}
            loading={isLoading}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
          <Button fullWidth type="button" variant="light" disabled={isLoading} onClick={onClose}>
            Cancel
          </Button>
        </div>
      }
      onCloseModal={onClose}
    >
      {description && (
        <p className="px-4 pt-4 text-center text-sm text-gray-800 sm:px-6 sm:pt-4">{description}</p>
      )}
    </Modal>
  );
}

export default ModalConfirmAction;
