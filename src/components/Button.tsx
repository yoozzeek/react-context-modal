import styles from "@/styles/button.module.css";
import { clsx } from "clsx";
import LoadingIcon from "@/components/Loader";
import type { MouseEvent, ReactNode, JSX } from "react";
import type { ButtonSize, Variant } from "@/types";

type ButtonTypes = "button" | "submit" | "reset";

interface ButtonProps {
  children: ReactNode;
  type?: ButtonTypes;
  variant?: Variant;
  size?: ButtonSize | "icon";
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
      className={clsx(styles.btn, styles[`btn--variant-${variant}`], styles[`btn--size-${size}`], {
        [styles["btn--fullwidth"]]: fullWidth,
        [styles["btn--loading"]]: loading,
        [styles["btn--icon"]]: size === "icon",
        [styles["btn--flex"]]: loading && variant !== "none",
        [styles["btn--disabled"]]: disabled || loading,
      })}
      disabled={disabled || loading}
      type={type || "button"}
      onClick={onClick}
    >
      {loading && variant !== "none" ? (
        <>
          <LoadingIcon
            className={clsx(styles.btn__loader, styles[`btn__loader--variant-${variant}`])}
          />
          {loadingText && <span className={styles["btn__loading-text"]}>{loadingText}</span>}
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
