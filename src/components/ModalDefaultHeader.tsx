import { FC } from "react";
import classNames from "classnames";
import CloseIcon from "../../../../assets/icons/close.svg";

const UIModalDefaultHeader: FC<{
  label?: string | null;
  onClose?: () => void;
}> = ({ label, onClose }) => {
  return (
    <header
      className={classNames(
        "rounded-t-lgb z-0 flex w-full items-center p-4 sm:pt-6 md:right-0 md:w-auto",
        "before:content[''] before:absolute before:top-2.5 before:left-[50%] before:h-[4px] before:w-[50px] before:-translate-x-[50%] before:rounded-sm before:bg-gray-900/10 sm:before:hidden",
        {
          "justify-between": Boolean(label),
          "justify-end": !Boolean(label),
        }
      )}
    >
      {label && (
        <h4 className="mt-2 truncate font-serif text-2xl font-medium sm:mt-0 sm:font-sans">
          {label}
        </h4>
      )}

      <button
        type="button"
        className="hidden appearance-none outline-none sm:block"
        onClick={onClose}
      >
        <CloseIcon className="h-5 w-5 text-gray-200 transition-colors duration-200 hover:text-gray-300 sm:h-6 sm:w-6" />
      </button>
    </header>
  );
};

export default UIModalDefaultHeader;
