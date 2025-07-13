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
    <header
      className={clsx(
        "rounded-t-lgb z-0 mx-4 my-6 flex items-start justify-between sm:relative sm:items-center sm:justify-center",
        "before:content[''] before:absolute before:top-2.5 before:left-[50%] before:h-[4px] before:w-[50px] before:-translate-x-[50%] before:rounded-sm before:bg-gray-900/10 sm:before:hidden",
      )}
    >
      <div className="relative flex flex-col sm:w-4/5 sm:items-center">
        <h3 className="pr-4 font-serif text-2xl font-semibold text-gray-900 sm:pr-0 sm:font-sans">
          {title}
        </h3>
        {description && (
          <span className="mt-2 text-sm text-gray-300 sm:text-center">{description}</span>
        )}
      </div>
      <button
        type="button"
        onClick={onClose}
        className="right-0 top-0 mt-0.5 hidden appearance-none outline-none sm:absolute sm:inline"
      >
        <CloseIcon className="h-5 w-5 text-gray-200 transition-colors duration-200 hover:text-gray-300 sm:h-7 sm:w-7" />
      </button>
    </header>
  );
};

export default UIModalHeader2;
