import React from 'react';
import { UpdatePassword } from '@components';
import { AdminDashboardLayout } from '@container';
import TitleButton from '../components/title-button';

const AdminCart: React.FC = () => {
  return (
    <AdminDashboardLayout>
      <TitleButton title="Change Password" />
      <div className="grid grid-cols-2">
        <UpdatePassword type="admin" />
      </div>
    </AdminDashboardLayout>
  );
};

export default React.memo(AdminCart);
