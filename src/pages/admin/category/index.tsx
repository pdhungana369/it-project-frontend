import { Pagination, Table } from '@components';
import DeleteModal from '@components/delete-modal';
import { AdminDashboardLayout } from '@container';
import { formatDate } from '@utils/fomatDate';
import React from 'react';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import TitleButton from '../components/title-button';
import { Link } from 'react-router-dom';
import { Info } from '@types';
import useFetchPagination from '@hooks/useFetchPagination';

const AdminCategory: React.FC = () => {
  const {
    data: categoryData,
    isLoading,
    error: categoryErrorText,
    getData,
    metaData,
    pageLimit,
    setPageLimit,
    setPageNumber,
  } = useFetchPagination('/category', '');

  const column = [
    {
      header: 'Product Name',
      accessorKey: 'name',
      cell: (info: Info<string>) => info.getValue(),
    },

    {
      header: 'No.of products',
      accessorKey: 'product',
      cell: (info: Info<[]>) => info.getValue()?.length,
    },
    {
      header: 'Created At',
      accessorKey: 'createdAt',
      cell: (info: Info<string>) => formatDate(info.getValue()),
    },
    {
      header: 'Updated At',
      accessorKey: 'updatedAt',
      cell: (info: Info<string>) => formatDate(info.getValue()),
    },
    {
      header: 'Action',
      accessorKey: '',
      cell: ({ cell }: any) => (
        <div className="flex items-center justify-center space-x-3">
          <Link
            className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary p-1"
            to="/admin/category-create"
            state={{
              categoryId: cell?.row?.original?.id,
              categoryName: cell?.row?.original?.name,
            }}
          >
            <MdOutlineModeEditOutline size={15} color="#fff" />
          </Link>
          <DeleteModal
            url={`/category/${cell?.row?.original?.id}`}
            fetchData={getData}
          />
        </div>
      ),
    },
  ];

  return (
    <AdminDashboardLayout>
      <TitleButton
        title="List Category"
        path="/admin/category-create"
        isClick
        buttonTxt="add category"
      />

      <Table
        tableColumn={column}
        tableData={categoryData ?? []}
        isLoading={isLoading}
        errorText={categoryErrorText}
      />
      <Pagination
        metaData={metaData}
        pageLimit={pageLimit}
        setPageLimit={setPageLimit}
        setPageNumber={setPageNumber}
      />
    </AdminDashboardLayout>
  );
};

export default React.memo(AdminCategory);
