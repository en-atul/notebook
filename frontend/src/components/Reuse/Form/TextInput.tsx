import React, { FC } from "react";
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

interface LabelProps {
  htmlFor: string;
  id?: string;
  className?: string;
  children?: React.ReactNode;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
}
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
        `${className} appearance-none border border-gray-200 placeholder-gray-400 font-light text-sm rounded-md w-full h-10 py-2 pr-3 leading-tight focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-0 bg-${bgColor}`,
        {
          // "border-red-500": error,
          // "text-red-500": error,
          // "placeholder-red-500": error,
          // "focus:border-red-500": error,
          // "focus:shadow-outline-red": error,
          // "focus:shadow-outline": !error,
          "pl-10": !placeholder,
          "pl-4": placeholder,
        }
      )}
      defaultValue={defaultValue}
    />
  );
}

export const FormLabel: FC<LabelProps> = ({
  htmlFor,
  className = "text-gray-600",
  children,
  id,
}) => {
  return (
    <section className="relative">
      <label
        className={classnames(
          `${className} block text-left text-xs leading-snug font-medium mb-2`
        )}
        id={id}
        htmlFor={htmlFor}
      >
        {children}
      </label>
    </section>
  );
};

export const FormError: FC<{ id?: string; error?: string }> = ({
  error,
  id = "form-error",
}) => {
  return (
    <p
      id={id}
      role="alert"
      className={classnames("mt-2 text-sm text-left text-red-500 font-light", {
        hidden: !error,
      })}
    >
      {error}
    </p>
  );
};
