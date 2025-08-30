import { Table } from '@components';
import { AdminDashboardLayout } from '@container';
import useFetch from '@hooks';
import { formatDate, formatDateTime } from '@utils/fomatDate';

export default function Booking() {
  const { data: bookingList } = useFetch('/admin/bookings');
  const column = [
    {
      header: 'Name',
      accessorKey: 'User',
      cell: (info: any) => info?.getValue()?.name,
      size: 60,
    },
    {
      header: 'Email',
      accessorKey: 'userEmail',
      cell: (info: any) => info?.row?.original?.User?.email,
      size: 60,
    },
    {
      header: 'Phone',
      accessorKey: 'userPhone',
      cell: (info: any) => info?.row?.original?.User?.phoneNumber,
      size: 60,
    },
    {
      header: 'S.Name',
      accessorKey: 'serviceName',
      cell: (info: any) => info?.row?.original?.services?.name,
      size: 60,
    },
    {
      header: 'S.Price',
      accessorKey: 'servicePrice',
      cell: (info: any) => 'NRs.' + info?.row?.original?.services?.price,
      size: 60,
    },
    {
      header: 'Appointment Date',
      accessorKey: 'dateAndTime',
      cell: (info: any) => formatDateTime(info?.getValue()),
      size: 60,
    },
    {
      header: 'Booking Date',
      accessorKey: 'createdAt',
      cell: (info: any) => formatDate(info?.getValue()),
      size: 60,
    },
  ];
  return (
    <AdminDashboardLayout>
      <h2 className="text-2xl font-black text-primary">Bookings </h2>
      <Table tableColumn={column} tableData={bookingList} />
    </AdminDashboardLayout>
  );
}
