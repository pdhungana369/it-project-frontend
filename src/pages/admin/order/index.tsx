import React from 'react';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import useFetchPagination from '@hooks/useFetchPagination';
import {
  Button,
  Modal,
  Pagination,
  SearchBar,
  SearchSelect,
  Table,
} from '@components';
import { AdminDashboardLayout } from '@container';
import { formatDate } from '@utils/fomatDate';
import TitleButton from '../components/title-button';
import { Info } from '@types';
import Service from '@setup/network';
import toastAlert from '@utils/toast';
import { orderStatusOptions } from '@static-data';
import { useDebounce } from '@hooks/useDebounce';

const AdminOrders: React.FC = () => {
  const [showStatusModal, setShowStatusModal] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event?.target?.value?.toLowerCase());
  };
  const debouncedSearch = useDebounce(searchValue);
  const {
    data: orderDataList,
    isLoading,
    error: errorText,
    getData,
    metaData,
    pageLimit,
    setPageLimit,
    setPageNumber,
  } = useFetchPagination('/admin/order', debouncedSearch);

  const [orderId, setOrderId] = React.useState('');

  const handleShowStatusModal = () => setShowStatusModal(!showStatusModal);

  const handleSubmit = async (val: { status: any }) => {
    try {
      const payload = {
        status: val?.status?.value,
        orderId: orderId,
      };
      await Service.patch(`/admin/order-change-status`, payload);
      handleShowStatusModal();
      getData();
      toastAlert('success', 'Order change status successfully');
    } catch (err: any) {
      toastAlert('error', err?.response?.data?.error ?? 'Something went wrong');
    }
  };

  const column = [
    {
      header: 'Order ID',
      accessorKey: 'orderId',
      cell: (info: Info<string>) => info.getValue(),
    },
    {
      header: 'Order By Name',
      accessorKey: 'User.name',
      cell: (info: Info<string>) => info.getValue(),
    },
    {
      header: 'Payment Method',
      accessorKey: 'payment.method',
      cell: (info: Info<string>) => info.getValue(),
    },
    {
      header: 'Total Price',
      accessorKey: 'totalAmount',
      cell: (info: Info<string>) => info.getValue(),
    },
    {
      header: 'Total Qty',
      accessorKey: 'totalQuantity',
      cell: (info: Info<string>) => info.getValue(),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (info: Info<any>) => (
        <button
          className="text-[blue] !underline"
          onClick={() => {
            setOrderId(info?.row?.original?.id);
            handleShowStatusModal();
          }}
        >
          {info?.getValue()}
        </button>
      ),
    },

    {
      header: 'Created At',
      accessorKey: 'createdAt',
      cell: (info: Info<string>) => formatDate(info.getValue()),
    },
    {
      header: 'Action',
      cell: (row: Info<any>) => (
        <div className="flex items-center justify-center gap-x-5">
          <Link to="/admin/order-preview" state={row?.row?.original?.id}>
            <div className="rounded-full bg-secondary p-1">
              <FiEye color="#fff" size={20} />
            </div>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <AdminDashboardLayout>
      <TitleButton title="Order List" />
      <div className="mb-5 flex items-center justify-end">
        <SearchBar
          onChange={handleChangeSearch}
          searchValue={searchValue}
          className="mt-5 w-full md:max-w-sm"
          placeHolder="search by order id"
        />
      </div>
      <Table
        tableColumn={column}
        tableData={orderDataList ?? []}
        isLoading={isLoading}
        errorText={errorText}
      />
      <Pagination
        pageLimit={pageLimit}
        setPageLimit={setPageLimit}
        setPageNumber={setPageNumber}
        metaData={metaData}
      />

      {showStatusModal && (
        <Modal modalClose={handleShowStatusModal} height="h-[40dvh]">
          <Formik initialValues={{ status: '' }} onSubmit={handleSubmit}>
            {({ isSubmitting, isValid }) => (
              <Form className="p-5">
                <h6 className="mb-7 mt-3 text-center text-2xl font-bold text-primary">
                  Change Order Status
                </h6>
                <SearchSelect
                  options={orderStatusOptions}
                  name="status"
                  label="Order Status"
                />
                <Button
                  text="submit"
                  type="submit"
                  variant="danger"
                  className="px-4 py-2"
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                />
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </AdminDashboardLayout>
  );
};

export default React.memo(AdminOrders);
