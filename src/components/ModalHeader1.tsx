import styles from "@/assets/styles/header1.module.css";
import type { ReactElement } from "react";
import CloseIcon from "@/assets/icons/close.svg?react";
import { clsx } from "clsx";

const ModalHeader1 = ({
  title,
  superposition = false,
  transparent = false,
  onClose,
}: {
  title?: string | ReactElement;
  superposition?: boolean;
  transparent?: boolean;
  onClose?: (e?: any) => void;
}) => {
  return (
    <header
      className={clsx(styles.modal__header1, {
        [styles["modal__header1--superposition"]]: superposition,
        [styles["modal__header1--transparent"]]: transparent,
        [styles["modal__header1--white"]]: !transparent,
      })}
    >
      {title && (
        <h3
          className={clsx(styles["modal__header1-title"], {
            [styles["modal__header1-title--transparent"]]: transparent,
            [styles["modal__header1-title--dark"]]: !transparent,
          })}
        >
          <span className={styles["modal__header1-title-text"]}>{title}</span>
        </h3>
      )}
      <button type="button" onClick={onClose} className={styles["modal__header1-close"]}>
        <CloseIcon
          className={clsx(styles["modal__header1-close-icon"], {
            [styles["modal__header1-close-icon--transparent"]]: transparent,
            [styles["modal__header1-close-icon--dark"]]: !transparent,
          })}
        />
      </button>
    </header>
  );
};

export default ModalHeader1;
