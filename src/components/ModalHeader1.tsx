import React, { FC, ReactElement } from "react";
import CloseIcon from "../../../../assets/icons/close.svg";
import classNames from "classnames";

const UIModalHeader1: FC<{
  title?: string | ReactElement;
  superposition?: boolean;
  transparent?: boolean;
  onClose?: (e?: any) => void;
}> = ({ title, superposition = false, transparent = false, onClose }) => {
  return (
    <header
      className={classNames(
        "h-14 w-full rounded-t-2xl py-4 md:h-auto md:py-6",
        {
          "absolute z-10": superposition,
          "bg-white": !transparent,
          "dark-bg-gradient": transparent,
        }
      )}
    >
      {title && (
        <h3
          className={classNames(
            "mx-auto flex w-4/6 items-center justify-center text-2xl font-semibold",
            {
              "text-white": transparent,
              "text-gray-900": !transparent,
            }
          )}
        >
          <span className="truncate">{title}</span>
        </h3>
      )}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-2 right-2 flex h-10 w-10 cursor-pointer items-center justify-center md:top-4 md:right-4"
      >
        <CloseIcon
          className={classNames(
            "block h-6 w-6 transition-colors duration-200",
            {
              "text-gray-150 hover:text-white": transparent,
              "text-gray-200 hover:text-gray-300": !transparent,
            }
          )}
        />
      </button>
    </header>
  );
};

export default UIModalHeader1;
