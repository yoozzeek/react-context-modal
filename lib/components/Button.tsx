import "@/assets/styles/button.module.css";
import { clsx } from "clsx";
import LoadingIcon from "@/components/Loader";
import type { MouseEvent, ReactNode, JSX } from "react";
import type { Size, Variant } from "@/types";

type ButtonTypes = "button" | "submit" | "reset";

interface ButtonProps {
  children: ReactNode;
  type?: ButtonTypes;
  variant?: Variant;
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
  return (
    <button
      className={clsx("btn", `btn--variant-${variant}`, `btn--size-${size}`, {
        "btn--fullwidth": fullWidth,
        "btn--loading": loading,
        "btn--icon": size === "icon",
        "btn--flex": loading && variant !== "none",
        "btn--disabled": disabled || loading,
      })}
      disabled={disabled || loading}
      type={type || "button"}
      onClick={onClick}
    >
      {loading && variant !== "none" ? (
        <>
          <LoadingIcon className={clsx("btn__loader", `btn__loader--variant-${variant}`)} />
          {loadingText && <span className="btn__loading-text">{loadingText}</span>}
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
