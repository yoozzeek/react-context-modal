import LoaderIcon from "@/assets/icons/loader.svg?react";
import { clsx } from "clsx";

const Loader = ({
  className,
  size = "md",
  text,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <LoaderIcon
        className={clsx("animate-spin", {
          "h-5 w-5": size === "sm",
          "h-8 w-8": size === "md",
          "h-12 w-12": size === "lg",
          "text-green-500": !className,
          [className || ""]: className,
        })}
      />
      {text && (
        <span
          className={clsx("text-gray-250", {
            "py-4 text-sm": size === "sm",
            "py-6": size === "md",
          })}
        >
          {text}
        </span>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
