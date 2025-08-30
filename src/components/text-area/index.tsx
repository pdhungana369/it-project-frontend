import * as React from 'react';
import { Field } from 'formik';

interface IProps {
  label: string;
  name: string;
  placeHolder?: string;
  className?: string;
  rows?: number;
  isPrimary?: boolean;
  readonly?: boolean;
}

const TextArea: React.FC<IProps> = ({
  label,
  name,
  placeHolder,
  className,
  rows,
  isPrimary = true,
  readonly = false,
}) => {
  return (
    <div className={className}>
      <div className="relative inline-block">
        <label className="mb-2 block text-xs font-semibold text-secondary">
          {label}
        </label>

        {isPrimary && (
          <p className="absolute -right-2 -top-1 inline-block font-semibold text-danger">
            *
          </p>
        )}
      </div>

      <Field
        as="textarea"
        name={name}
        cols={50}
        className="bg-pure-white focus:shadow-outline block w-full appearance-none rounded p-3 text-sm ring-1 ring-secondary ring-opacity-10 placeholder:text-xs focus:outline-none"
        rows={rows || 5}
        placeholder={placeHolder}
        readOnly={readonly}
      />
    </div>
  );
};

export default React.memo(TextArea);
