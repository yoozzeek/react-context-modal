import styles from "@/styles/header2.module.css";
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
    <header className={clsx(styles.modal__header2, styles["modal__header2--with-bar"])}>
      <div className={styles["modal__header2-content"]}>
        <h3 className={styles["modal__header2-title"]}>{title}</h3>
        {description && <span className={styles["modal__header2-desc"]}>{description}</span>}
      </div>
      <button type="button" onClick={onClose} className={styles["modal__header2-close"]}>
        <CloseIcon className={styles["modal__header2-close-icon"]} />
      </button>
    </header>
  );
};

export default UIModalHeader2;
