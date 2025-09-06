import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { AdminDashboardLayout } from '@container';
import useFetch from '@hooks';
import { Info } from '@types';
import Table from '@components/table';

const AdminDashboard: any = () => {
  const adminAuthData = useSelector((state: RootState) => state.adminAuthData);
  const { data: productStockData } = useFetch('/admin/analytics');

  console.log('productStockData', productStockData);
  const column = [
    {
      header: 'Image',
      accessorKey: 'imageUrl',
      cell: (info: Info<string>) => (
        <img
          src={info?.getValue()}
          alt="product image"
          className="h-8 w-8 object-cover"
        />
      ),
      size: 5,
    },
    {
      header: 'Name',
      accessorKey: 'name',
      cell: (info: Info<string>) => info.getValue(),
      size: 200,
    },
    {
      header: 'Price',
      accessorKey: 'price',
      cell: (info: Info<string>) => info.getValue(),
      size: 5,
    },
  ];

  return (
    <AdminDashboardLayout>
      <h5 className="mb-10 text-2xl font-medium text-black">
        Welcome Back, {adminAuthData?.adminInfo?.name}
      </h5>
      <section>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
            <h6 className="text-gray-500 text-sm font-semibold text-primary">
              Total Products:
              <span className="mx-2">
                {productStockData?.totalProducts || 0}
              </span>
            </h6>
          </div>
          <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
            <h6 className="text-gray-500 text-sm font-semibold text-primary">
              Out of Stock Products:
              <span className="mx-2">
                {productStockData?.outOfStockProducts || 0}{' '}
              </span>
            </h6>
          </div>
          <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
            <h6 className="text-gray-500 text-sm font-semibold text-primary">
              Total Order:
              <span className="mx-2">
                {productStockData?.totalOrderProducts || 0}{' '}
              </span>
            </h6>
          </div>
          <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
            <h6 className="text-gray-500 text-sm font-semibold text-primary">
              Total Users:
              <span className="mx-2">
                {' '}
                {productStockData?.totalUsers || 0}{' '}
              </span>
            </h6>
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="">
          <h4 className="mt-10 text-2xl font-semibold text-primary">
            Out of Stock Products
          </h4>
          <Table
            tableColumn={column}
            tableData={productStockData?.outOfStockCountList ?? []}
            isLoading={false}
          />
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default React.memo(AdminDashboard);
