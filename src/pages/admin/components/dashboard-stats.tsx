import React from 'react';

interface IProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const DashboardStats: React.FC<IProps> = ({ label, value, icon }) => {
  return (
    <div className="flex cursor-pointer justify-between rounded-md bg-white bg-opacity-80 p-6 transition-shadow duration-200 ease-in-out hover:shadow">
      <div className="">
        <h6 className="text-xl font-semibold"> {value} </h6>
        <p className="mt-2 text-sm text-[#7C8DB5]"> {label} </p>
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white shadow-lg">
        {icon}
      </div>
    </div>
  );
};

export default React.memo(DashboardStats);
