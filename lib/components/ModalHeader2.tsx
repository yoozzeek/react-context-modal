import "@/assets/styles/header2.model.css";
import CloseIcon from "@/assets/icons/close.svg?react";
import { clsx } from "clsx";

const UIModalHeader2 = ({
  title,
  description,
  onClose,
}: {
  title: string;
  description?: string | null;
  onClose?: () => void;
}) => {
  return (
    <header className={clsx("modal__header2", "modal__header2--with-bar")}>
      <div className="modal__header2-content">
        <h3 className="modal__header2-title">{title}</h3>
        {description && <span className="modal__header2-desc">{description}</span>}
      </div>
      <button type="button" onClick={onClose} className="modal__header2-close">
        <CloseIcon className="modal__header2-close-icon" />
      </button>
    </header>
  );
};

export default UIModalHeader2;
