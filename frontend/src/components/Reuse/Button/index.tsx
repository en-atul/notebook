import React, { FC, MouseEvent } from "react";
import classnames from "classnames";

interface Props {
  children?: React.ReactNode;
  className?: string;
  fontSize?: "xs" | "sm" | "lg";
  borderRadius?: "none" | "lg" | "full";
  borderWidth?: string;
  borderColor?: string;
  bgColor?: string;
  textColor?: string;
  type?: "button" | "submit";
  onClick?: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
  disabled?: boolean;
  form?: string;
}

export const Button: FC<Props> = ({
  children,
  className,
  onClick = undefined,
  disabled = false,
  bgColor = "bg-violet-700",
  fontSize = "sm",
  textColor = "white",
  borderWidth = "border",
  borderColor = "white",
  type = "button",
  ...rest
}) => {
  return (
    <button
      {...rest}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classnames(
        `${className} w-full leading-snug rounded-lg ${
          disabled ? "bg-gray-500" : `${bgColor} hover:bg-violet-800`
        }  text-${fontSize} text-${
          disabled ? "gray-300" : textColor
        } ${borderWidth} border-${disabled ? "gray-500" : borderColor}`,
        {
          "pointer-events-none": disabled,
        }
      )}
    >
      {children}
    </button>
  );
};
