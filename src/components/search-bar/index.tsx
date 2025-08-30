import React from 'react';
import { FiSearch } from 'react-icons/fi';

interface IProps {
  searchValue: string;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeHolder?: string;
}

export default function SearchBar({
  searchValue,
  onChange,
  className,
  placeHolder = 'search',
}: IProps) {
  return (
    <div className="flex w-[500px] items-center gap-5 rounded border border-border bg-white px-6 py-3">
      <input
        value={searchValue}
        type="search"
        onChange={onChange}
        className="w-full flex-1 text-sm placeholder:text-xs placeholder:text-text-paragraph focus-within:outline-none"
        placeholder={placeHolder}
        aria-label="search product input"
      />
      <FiSearch size={20} />
    </div>
  );
}
