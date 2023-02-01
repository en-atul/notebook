import React, { FC, MouseEvent } from "react";
import classnames from "classnames";
import { Oval } from "react-loader-spinner";

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
  isSubmitting?: boolean;
}

export const Button: FC<Props> = ({
  children,
  className,
  onClick = undefined,
  disabled = false,
  bgColor = "bg-violet-700",
  fontSize = "sm",
  textColor = "white",
  borderWidth = "border-0",
  borderColor = "white",
  type = "button",
  isSubmitting,
  ...rest
}) => {
  const grayedOut = isSubmitting || disabled;

  return (
    <button
      {...rest}
      type={type}
      onClick={onClick}
      disabled={grayedOut}
      className={classnames(
        `${className} w-full flex items-center justify-center leading-snug rounded-lg ${
          grayedOut ? "bg-violet-400" : `${bgColor} hover:bg-violet-800`
        }  text-${fontSize} ${
          grayedOut ? "text-violet-200" : "text-" + textColor
        } ${borderWidth} border-${grayedOut ? "none" : borderColor}`,
        {
          "pointer-events-none": grayedOut,
        }
      )}
    >
      {children}
      {isSubmitting ? (
        <Oval
          color="#fff"
          secondaryColor="#ddd6fe"
          width={11}
          height={11}
          strokeWidth={6}
          wrapperClass="ml-2"
        />
      ) : null}
    </button>
  );
};
