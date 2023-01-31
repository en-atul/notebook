import React from "react";
import {
  FieldError,
  FieldErrorsImpl,
  FieldPath,
  FieldValues,
  Merge,
  RegisterOptions,
  UseFormRegisterReturn,
} from "react-hook-form";
import classnames from "classnames";

interface InputProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  className?: string;
  children?: React.ReactNode;
  bgColor?: string;
  type?: "email" | "password" | "text" | "tel";
  id: string;
  name: TFieldName;
  placeholder?: string;
  register?(
    name: TFieldName,
    options?: RegisterOptions<TFieldValues, TFieldName>
  ): UseFormRegisterReturn<TFieldName>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  value?: string;
  defaultValue?: string | number;
}

export function TextInput<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  bgColor = "purple-50",
  type = "text",
  name,
  className,
  id,
  register,
  placeholder,
  error,
  defaultValue,
  onChange,
  ...rest
}: InputProps<TFieldValues, TFieldName>) {
  return (
    <input
      {...register?.(name, { onChange })}
      {...rest}
      aria-label={name}
      placeholder={placeholder}
      id={id}
      type={type}
      className={classnames(
        `${className} appearance-none border border-purple-200 placeholder-purple-200 rounded-md w-full h-12 py-2 pr-3 leading-tight focus:outline-none bg-${bgColor}`,
        {
          "border-red-500": error,
          "text-red-500": error,
          "placeholder-red-500": error,
          "focus:border-red-500": error,
          "focus:shadow-outline-red": error,
          "focus:shadow-outline": !error,
          "pl-10": !placeholder,
          "pl-4": placeholder,
        }
      )}
      defaultValue={defaultValue}
    />
  );
}
