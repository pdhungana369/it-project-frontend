import { Button, Modal, Pagination, Table, TextField } from '@components';
import { AdminDashboardLayout } from '@container';
import { formatDate } from '@utils/fomatDate';
import React from 'react';
import TitleButton from '../components/title-button';
import { Info } from '@types';
import Service from '@setup/network';
import toastAlert from '@utils/toast';
import useFetchPagination from '@hooks/useFetchPagination';
import { Form, Formik } from 'formik';
import { CREDIT_VALIDATION } from '@schema';

const AdminUsers: React.FC = () => {
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState<any>('');
  const [errorMsg, setErrorMsg] = React.useState('');
  const {
    data: usersData,
    isLoading,
    error: cartErrorText,
    getData,
    metaData,
    pageLimit,
    setPageLimit,
    setPageNumber,
  } = useFetchPagination('/admin/users', '');

  const handleEditModal = () => setShowEditModal(!showEditModal);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleActive = async (id: string, isBlocked: boolean) => {
    if (
      !window.confirm(
        `Are you sure want ${!isBlocked ? 'Blocked' : 'Unblocked'} user?`
      )
    )
      return;
    try {
      await Service.patch(`/admin/block-user/${id}`);
      getData();
      toastAlert('success', 'Status changed successfully');
    } catch (err: any) {
      toastAlert('error', err?.response?.data?.error ?? 'Something went wrong');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTableRowClick = (data: any) => {
    setUserInfo(data);
    handleEditModal();
    setErrorMsg('');
  };

  const column = [
    {
      header: 'Name',
      accessorKey: 'name',
      cell: (info: Info<string>) => info.getValue(),
    },
    {
      header: 'Email',
      accessorKey: 'email',
      cell: (info: Info<string>) => info.getValue(),
    },
    {
      header: 'Phone Number',
      accessorKey: 'phoneNumber',
      cell: (info: Info<string>) => info.getValue(),
    },
    {
      header: 'Created At',
      accessorKey: 'createdAt',
      cell: (info: Info<string>) => formatDate(info.getValue()),
    },
  ];

  const handleSubmitAmount = async (val: any) => {
    try {
      const payload = {
        ...val,
        userId: userInfo?.id,
      };
      await Service.patch('/admin/credit-change', payload);
      handleEditModal();
      getData();
      toastAlert('success', 'Credit changed successfully', 'bottom');
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.error);
    }
  };

  return (
    <AdminDashboardLayout>
      <TitleButton title="Users" />
      <Table
        tableColumn={column}
        tableData={usersData ?? []}
        isLoading={isLoading}
        errorText={cartErrorText}
      />
      <Pagination
        metaData={metaData}
        pageLimit={pageLimit}
        setPageLimit={setPageLimit}
        setPageNumber={setPageNumber}
      />
      {showEditModal && (
        <Modal modalClose={handleEditModal} height="w-[30%]">
          <div className="p-10">
            <p className="mb-10 text-center text-lg font-bold">Edit Credit</p>
            <p className="my-5 text-center text-danger"> {errorMsg} </p>
            <Formik
              initialValues={{
                creditLimit: userInfo?.creditLimit ?? '',
                creditDays: userInfo?.creditDays ?? '',
              }}
              onSubmit={handleSubmitAmount}
              enableReinitialize
              validationSchema={CREDIT_VALIDATION}
              validateOnMount
            >
              {({ isSubmitting, isValid }) => (
                <Form>
                  <TextField
                    name="creditLimit"
                    placeholder="enter a total credit amount"
                    label="Credit Amount"
                    type="number"
                  />
                  <TextField
                    name="creditDays"
                    placeholder="enter a total credit days"
                    label="Credit Days"
                    type="number"
                  />
                  <div className="flex items-center justify-between">
                    <Button
                      text="Cancel"
                      onClick={handleEditModal}
                      type="button"
                      variant="danger"
                      className="px-10 py-1"
                    />
                    <Button
                      text="Accept"
                      type="submit"
                      isSubmitting={isSubmitting}
                      isValid={isValid}
                      variant="primary"
                      className="px-10 py-1"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal>
      )}
    </AdminDashboardLayout>
  );
};

export default React.memo(AdminUsers);
