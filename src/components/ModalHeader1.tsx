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
      className={clsx("modal__header1", {
        "modal__header1--superposition": superposition,
        "modal__header1--transparent": transparent,
        "modal__header1--white": !transparent,
      })}
    >
      {title && (
        <h3
          className={clsx("modal__header1-title", {
            "modal__header1-title--transparent": transparent,
            "modal__header1-title--dark": !transparent,
          })}
        >
          <span className="modal__header1-title-text">{title}</span>
        </h3>
      )}
      <button type="button" onClick={onClose} className="modal__header1-close">
        <CloseIcon
          className={clsx("modal__header1-close-icon", {
            "modal__header1-close-icon--transparent": transparent,
            "modal__header1-close-icon--dark": !transparent,
          })}
        />
      </button>
    </header>
  );
};

export default ModalHeader1;
