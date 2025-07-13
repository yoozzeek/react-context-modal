// import styles from "./index.module.css";
import { useMemo } from "react";
import { clsx } from "clsx";
import LoadingIcon from "@/components/Loader";
import type { MouseEvent, ReactNode, JSX } from "react";
import type { Size } from "@/types";

type ButtonTypes = "button" | "submit" | "reset";

interface ButtonProps {
  children: ReactNode;
  type?: ButtonTypes;
  variant?:
    | "light"
    | "dark"
    | "outline-light"
    | "outline-green"
    | "outline-warning"
    | "success"
    | "danger"
    | "warning"
    | "gray"
    | "none";
  size?: Size | "icon";
  isIcon?: boolean;
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

function Button({
  fullWidth = false,
  type = "button",
  size = "md",
  disabled = false,
  loading = false,
  loadingText,
  variant = "light",
  onClick,
  children,
}: ButtonProps): JSX.Element {
  const variantClasses = useMemo(() => {
    switch (variant) {
      case "success":
        return "border bg-green-500 text-white border-green-500 hover:bg-green-600 hover:border-green-600";
      case "light":
        return "border bg-white text-gray-900 border-gray-150 hover:bg-gray-150";
      case "outline-light":
        return "text-white border-gray-100/25 border";
      case "outline-green":
        return "text-green-500 border-green-500 border hover:bg-green-500/10";
      case "outline-warning":
        return "text-orange-550 border-orange-550 border hover:bg-orange-550/10";
      case "danger":
        return "border border-red-400 text-white bg-red-400 text-sm hover:bg-red-400/90";
      case "warning":
        return "border border-orange-550 text-white bg-orange-550 text-sm hover:bg-orange-550/90";
      case "dark":
        return "border border-gray-200 text-gray-900 bg-gray-200 text-sm hover:bg-gray-250";
      case "gray":
        return "border text-gray-900 border-gray-150 bg-gray-150";
      case "none":
        return "text-green-500 hover:text-green-600";
    }
  }, [variant]);

  const sizeClasses = useMemo(() => {
    switch (size) {
      case "xxs":
        return "px-1.5 py-0.5 rounded-sm";
      case "xs":
        return "w-28 py-1 rounded-sm";
      case "sm":
        return "px-4 py-1 sm:h-[32px] rounded-sm";
      case "md":
        return "px-4 py-1 h-[44px] sm:h-[40px] rounded-sm";
      case "lg":
        return "py-3 px-6 rounded-sm";
      case "xl":
        return "py-5 px-8 text-lg rounded-3xl";
      case "icon":
        return "flex items-center justify-center p-1 rounded-sm";
    }
  }, [size]);

  return (
    <button
      className={clsx(
        "font-semibold outline-0 whitespace-nowrap transition-all duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses,
        sizeClasses,
        {
          "w-full": fullWidth,
          "opacity-50": loading,
          "h-full": size === "icon",
          "flex items-center justify-center": loading && variant !== "none",
        },
      )}
      disabled={disabled || loading || false}
      type={type || "button"}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
    >
      {loading && variant !== "none" ? (
        <>
          <LoadingIcon
            className={clsx("h-5 w-5 animate-spin", {
              "text-white":
                variant === "outline-light" ||
                variant === "success" ||
                variant === "danger" ||
                variant === "warning",
              "text-gray-900": variant === "light",
              "text-green-500": variant === "outline-green",
              "text-orange-550": variant === "outline-warning",
            })}
          />
          {loadingText && <span className="ml-3">{loadingText}</span>}
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
