import React, { FC } from "react";
import UIModal from "./Modal";
import UIButton from "../Button";
import { useTranslation } from "next-i18next";

const UIModalConfirmAction: FC<{
  title?: string;
  description?: string;
  isLoading?: boolean;
  variant?: "danger" | "success";
  onConfirm(): void;
  onClose(): void;
}> = ({
  title,
  description,
  variant = "danger",
  isLoading = false,
  onConfirm,
  onClose,
}) => {
  const { t } = useTranslation("common");
  function handleConfirm() {
    onConfirm();
    onClose();
  }
  return (
    <UIModal
      id="confirm-action-modal"
      ariaLabel={t("ui.confirm_modal.aria_label")}
      type="overlay-auto"
      size="sm"
      headerEl={
        <h3 className="pt-6 text-center text-2xl font-semibold">
          {title || t("ui.confirm_modal.title")}
        </h3>
      }
      footerEl={
        <div className="safe-bottom mt-4 flex gap-3">
          <UIButton
            fullWidth
            type="button"
            variant={variant}
            loading={isLoading}
            onClick={handleConfirm}
          >
            {t("ui.confirm_modal.confirm")}
          </UIButton>
          <UIButton
            fullWidth
            type="button"
            variant="light"
            disabled={isLoading}
            onClick={onClose}
          >
            {t("ui.confirm_modal.cancel")}
          </UIButton>
        </div>
      }
      onCloseModal={onClose}
    >
      {description && (
        <p className="px-4 pt-4 text-center text-sm text-gray-800 sm:px-6 sm:pt-4">
          {description}
        </p>
      )}
    </UIModal>
  );
};

export default UIModalConfirmAction;
