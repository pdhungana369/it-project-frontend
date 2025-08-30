import React from 'react';
import { AdminDashboardLayout } from '@container';
import TitleButton from '../components/title-button';
import { Form, Formik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import Service from '@setup/network';
import toastAlert from '@utils/toast';
import { CATEGORY_VALIDATION_SCHEMA } from '@schema';
import { Button, TextField } from '@components';

interface IValue {
  name: string;
}

const AddCategory: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const isCategoryEdit = state?.categoryId || state?.categoryName;

  const initialValues = {
    name: state?.categoryName ?? '',
  };

  const handleSubmit = async (val: IValue) => {
    try {
      !isCategoryEdit
        ? await Service.post('/category', val)
        : await Service.patch(`/category/${state?.categoryId}`, val);
      toastAlert(
        'success',
        `Category successfully ${isCategoryEdit ? 'edited' : 'created'}`
      );
      navigate('/admin/category');
    } catch (err: any) {
      toastAlert(
        'error',
        err?.response?.data?.message ?? 'Something went wrong'
      );
    }
  };

  return (
    <AdminDashboardLayout>
      <TitleButton
        title={state?.categoryId ? 'Edit' : 'Create' + ' ' + 'Category'}
      />
      <div className="mt-10 grid grid-cols-12 gap-5">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={CATEGORY_VALIDATION_SCHEMA}
          validateOnMount
          enableReinitialize
        >
          {({ isSubmitting, isValid }) => (
            <Form className="col-span-5">
              <TextField
                name="name"
                label="Category Name"
                placeholder="enter a category name"
              />
              <Button
                text="submit"
                type="submit"
                variant="primary"
                className="mt-2 px-10 py-2"
                isSubmitting={isSubmitting}
                isValid={isValid}
              />
            </Form>
          )}
        </Formik>
      </div>
    </AdminDashboardLayout>
  );
};

export default React.memo(AddCategory);
