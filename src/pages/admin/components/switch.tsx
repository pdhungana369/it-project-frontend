import React from 'react';

interface IProps {
  isChecked?: boolean;
  onChange?: any;
  default?: boolean;
}

const Switch: React.FC<IProps> = ({ isChecked = false, onChange }) => {
  return (
    <label
      className="relative inline-flex cursor-pointer items-center"
      title="change status"
    >
      <input
        type="checkbox"
        checked={!isChecked}
        className="peer sr-only"
        onChange={onChange}
      />
      <div className="bg-gray-200 peer h-6 w-11 rounded-full bg-primary after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-danger peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0" />
    </label>
  );
};

export default React.memo(Switch);
