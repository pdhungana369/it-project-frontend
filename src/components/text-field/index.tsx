import React from 'react';
import { ErrorMessage, FieldHookConfig, useField } from 'formik';
interface IProps {
  label: string | number;
  placeholder?: string;
  type?: string;
  defaultValue?: string | number;
  readOnly?: boolean;
  className?: string;
  isPrimary?: boolean;
}
const TextField = ({
  label,
  placeholder,
  type,
  readOnly,
  defaultValue,
  className,
  isPrimary = true,
  ...otherProps
}: IProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(otherProps);
  return (
    <div className={`${className} mb-4`}>
      <div className="relative inline-block">
        <label
          className={`text-xs font-bold ${
            meta.error && meta.touched ? 'text-danger' : 'text-secondary'
          } `}
          htmlFor={field.name}
        >
          {label}
        </label>

        {isPrimary && (
          <p className="absolute -right-2 top-0 inline-block font-black text-danger">
            *
          </p>
        )}
      </div>

      <div className="flex-1">
        <input
          className={`mt-2 block w-full appearance-none rounded bg-white px-3 py-2 text-sm shadow-none placeholder:text-xs ${
            meta.touched && meta.error
              ? 'text-danger ring-1 ring-[#dc3545] placeholder:text-danger focus-within:ring-1 focus:ring-1 focus-visible:outline-none'
              : 'ring-1 ring-secondary ring-opacity-10 focus-within:outline-none focus-within:ring-1 focus-within:ring-secondary'
          } `}
          {...field}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          autoComplete="off"
          readOnly={readOnly}
        />

        <ErrorMessage
          component="div"
          name={field.name}
          className="mt-1 inline-block bg-[#e4655f] px-2 text-xs text-white"
        />
      </div>
    </div>
  );
};

export default React.memo(TextField);
