import styles from "@/assets/styles/header.module.css";
import { clsx } from "clsx";
import CloseIcon from "@/assets/icons/close.svg?react";

const ModalHeader = ({ label, onClose }) => {
  return (
    <header
      className={clsx(styles.modal__header, "modal__header--with-bar", {
        "modal__header--with-label": Boolean(label),
        "modal__header--no-label": !Boolean(label),
      })}
    >
      {label && <h4 className="modal__header-title">{label}</h4>}
      <button type="button" className="modal__header-close" onClick={onClose}>
        <CloseIcon className="modal__header-close-icon" />
      </button>
    </header>
  );
};

export default ModalHeader;
