import styles from "@/styles/header.module.css";
import { clsx } from "clsx";
import CloseIcon from "@/assets/icons/close.svg?react";

const ModalHeader = ({
  label,
  closeButton,
  onClose,
}: {
  label?: string;
  closeButton: boolean;
  onClose(): void;
}) => {
  return (
    <header
      className={clsx(styles.modal__header, {
        [styles["modal__header--with-bar"]]: !closeButton,
        [styles["modal__header--with-label"]]: Boolean(label),
        [styles["modal__header--no-label"]]: !label,
      })}
    >
      {label && <h4 className={styles["modal__header-title"]}>{label}</h4>}
      {closeButton && (
        <button
          type="button"
          aria-label="Close"
          className={styles["modal__header-close"]}
          onClick={onClose}
        >
          <CloseIcon className={styles["modal__header-close-icon"]} />
        </button>
      )}
    </header>
  );
};

export default ModalHeader;
