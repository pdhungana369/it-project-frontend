import { AdminDashboardLayout } from '@container';
import React from 'react';
import TitleButton from '../components/title-button';
import { Table } from '@components';
import useFetch from '@hooks';
import { Info } from '@types';
import { formatDate } from '@utils/fomatDate';

const AdminPayment: React.FC = () => {
  const {
    data: paymentList,
    isLoading,
    error: paymentError,
  } = useFetch('/admin/payment-list');
  const column = [
    {
      header: 'Trans.ID',
      accessorKey: 'transactionID',
      cell: (info: Info<string>) => info.getValue() ?? '-',
    },
    {
      header: 'Order.ID',
      accessorKey: 'order.id',
      cell: (info: Info<string>) => info.getValue() ?? '-',
    },
    {
      header: 'Initiator.ID',
      accessorKey: 'initiatorId',
      cell: (info: Info<string>) => info.getValue() ?? '-',
    },
    {
      header: 'Method',
      accessorKey: 'method',
      cell: (info: Info<string>) => info.getValue(),
    },
    {
      header: 'User Email',
      accessorKey: 'order.User.email',
      cell: (info: Info<string>) => info.getValue(),
    },
    {
      header: 'Amount',
      accessorKey: 'amount',
      cell: (info: Info<string>) => info.getValue(),
    },
    {
      header: 'No.of Order Items',
      accessorKey: 'order.OrderItem',
      cell: (info: Info<[]>) => info.getValue()?.length,
    },

    {
      header: 'Created At',
      accessorKey: 'createdAt',
      cell: (info: Info<string>) => formatDate(info.getValue()),
    },
  ];
  return (
    <AdminDashboardLayout>
      <TitleButton title="Payment" />
      <Table
        tableColumn={column}
        tableData={paymentList ?? []}
        isLoading={isLoading}
        errorText={paymentError}
      />
    </AdminDashboardLayout>
  );
};

export default React.memo(AdminPayment);
