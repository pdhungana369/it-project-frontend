import { customStylesMain } from '@utils/select-custom-styles';
import { useField } from 'formik';
import { memo } from 'react';
import Select from 'react-select';

interface CustomSelectProps {
  options: any[];
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
  label?: string;
  isPrimary?: boolean;
  name: string;
  initialValue?: any;
  readonly?: boolean;
}

export const CustomSelect = ({
  className,
  placeholder,
  name,
  options,
  isPrimary = true,
  isMulti = false,
  label,
  readonly = false,
}: CustomSelectProps) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (selectedOptions: any) => {
    helpers.setValue(selectedOptions);
  };
  return (
    <div className={`mb-4 ${className}`}>
      <div className="relative inline-block">
        <label
          className="block text-xs font-semibold text-secondary"
          htmlFor={field.name}
        >
          {label}
        </label>

        {isPrimary && (
          <p className="absolute -right-2 -top-1 inline-block font-semibold text-danger">
            *
          </p>
        )}
      </div>
      <Select
        className="mt-2 flex-1"
        {...field}
        options={options ?? []}
        onChange={handleChange}
        value={field.value}
        isMulti={isMulti}
        placeholder={placeholder}
        isDisabled={readonly}
        classNamePrefix="react-select"
        styles={customStylesMain}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: '#173c95',
            primary: '#173c95',
          },
        })}
      />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
};

export default memo(CustomSelect);
