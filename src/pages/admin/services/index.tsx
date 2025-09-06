import { DeleteModal, Pagination, Table } from '@components';
import { AdminDashboardLayout } from '@container';
import { Info } from '@types';
import { formatDate } from '@utils/fomatDate';
import React from 'react';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import TitleButton from '../components/title-button';
import useFetchPagination from '@hooks/useFetchPagination';

const AdminProduct: React.FC = () => {
  const {
    data: productData,
    isLoading,
    error: errorText,
    getData,
    metaData,
    pageLimit,
    setPageLimit,
    setPageNumber,
  } = useFetchPagination('/product/', '');

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
    {
      header: 'Is Stock',
      accessorKey: 'outOfStock',
      cell: (info: Info<{ outOfStock: boolean }>) =>
        !info.getValue() ? 'Yes' : 'No',
      size: 10,
    },
    {
      header: 'Stock Count',
      accessorKey: 'stockCount',
      cell: (info: Info<{ stockCount: number }>) => info.getValue(),
      size: 10,
    },

    {
      header: 'Created At',
      accessorKey: 'createdAt',
      cell: (info: Info<string>) => formatDate(info.getValue()),
    },

    {
      header: 'Action',
      accessorKey: '',
      size: 20,
      cell: ({ cell }: any) => (
        <div className="flex items-center justify-center space-x-3">
          <Link
            className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary p-1"
            to="/admin/product-create"
            state={{
              val: {
                ...cell?.row?.original,
              },
            }}
          >
            <MdOutlineModeEditOutline size={15} color="#fff" />
          </Link>
          <DeleteModal
            url={`/product/${cell?.row?.original?.id}`}
            fetchData={getData}
          />
        </div>
      ),
    },
  ];

  return (
    <AdminDashboardLayout>
      <TitleButton
        title="List Product"
        path="/admin/product-create"
        isClick
        buttonTxt="add products"
      />
      {/* <div className="flex items-center justify-end">
        <SearchBar
          onChange={handleChangeSearch}
          searchValue={searchValue}
          className="mt-5 w-full md:max-w-sm"
        />
      </div> */}
      <Table
        tableColumn={column}
        tableData={productData ?? []}
        isLoading={isLoading}
        errorText={errorText}
      />
      <Pagination
        pageLimit={pageLimit}
        setPageLimit={setPageLimit}
        setPageNumber={setPageNumber}
        metaData={metaData}
      />
    </AdminDashboardLayout>
  );
};

export default React.memo(AdminProduct);
