import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { AdminDashboardLayout } from '@container';

const AdminDashboard: any = () => {
  const adminAuthData = useSelector((state: RootState) => state.adminAuthData);

  return (
    <AdminDashboardLayout>
      <h5 className="mb-10 text-2xl font-medium text-black">
        Welcome Back, {adminAuthData?.adminInfo?.name}
      </h5>
    </AdminDashboardLayout>
  );
};

export default React.memo(AdminDashboard);
