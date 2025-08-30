import React from 'react';
import { AdminDashboardLayout } from '@container';
import TitleButton from '../components/title-button';
import { Form, Formik, Field } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import Service from '@setup/network';
import toastAlert from '@utils/toast';
import { PRODUCT_VALIDATION_SCHEMA } from '@schema';
import { Button, Editor, SearchSelect, TextField } from '@components';
import useFetch from '@hooks';

interface IValue {
  name: string;
  imageUrl: string;
  descriptions: string;
  price: string;
  categoryId: {
    label: string;
    value: string;
  };
  outOfStock: boolean;
  isFreeDelivery: boolean;
  stockCount: number;
}

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log('🚀 ~ state:', state);

  const { data: categoryData } = useFetch('/category');

  const categoryDataFilterSelect =
    categoryData?.length > 0
      ? categoryData?.map((item: any) => ({
          label: item?.name,
          value: item?.id,
        }))
      : [];
  const isProductEdit = state?.val?.id;

  const initialValues = {
    name: state?.val?.name ?? '',
    imageUrl: state?.val?.imageUrl ?? '',
    descriptions: state?.val?.descriptions ?? '',
    price: state?.val?.price ?? '',
    outOfStock: state?.val?.outOfStock ?? false,
    categoryId: {
      label: state?.val?.category?.name ?? '',
      value: state?.val?.category?.id ?? '',
    },
    isFreeDelivery: state?.val?.isFreeDelivery ?? false,
    stockCount: state?.val?.stockCount,
  };

  const handleSubmit = async (val: IValue) => {
    try {
      !isProductEdit
        ? await Service.post('/product', {
            ...val,
            categoryId: val.categoryId?.value,
          })
        : await Service.patch(`/product/${state?.val?.id}`, {
            ...val,
            categoryId: val.categoryId?.value,
          });
      toastAlert(
        'success',
        `Product successfully ${isProductEdit ? 'edited' : 'created'}`
      );
      navigate('/admin/product');
    } catch (err: any) {
      toastAlert(
        'error',
        err?.response?.data?.message ?? 'Something went wrong'
      );
    }
  };

  return (
    <AdminDashboardLayout role="PARTNER">
      <TitleButton
        title={state?.val?.id ? 'Edit' : 'Create' + ' ' + 'Product'}
      />
      <div className="mt-10">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={PRODUCT_VALIDATION_SCHEMA}
          validateOnMount
          enableReinitialize
        >
          {({ isSubmitting, isValid, setFieldValue, values }) => (
            <Form>
              <div className="grid grid-cols-12 gap-5">
                <TextField
                  name="name"
                  label="Product Name"
                  placeholder="enter a product name"
                  className="col-span-6"
                />
                <TextField
                  name="imageUrl"
                  label="Image Url"
                  placeholder="enter a image url"
                  className="col-span-6"
                />

                <Editor
                  label="Descriptions"
                  setFieldValue={setFieldValue}
                  fieldName="descriptions"
                  initialValues={values.descriptions}
                  className="col-span-12"
                />
                <SearchSelect
                  name="categoryId"
                  options={categoryDataFilterSelect ?? []}
                  className="col-span-6"
                  label="Category"
                  placeholder="select the category"
                />
                <TextField
                  name="price"
                  type="number"
                  label="Price"
                  placeholder="enter a price"
                  className="col-span-6"
                />
                 <TextField
                  name="stockCount"
                  type="number"
                  label="Number of Stock"
                  placeholder="enter a stock count"
                  className="col-span-6"
                />

                <div className="col-span-3 flex items-center">
                  <Field type="checkbox" name="outOfStock" className="mr-2" />
                  <label htmlFor="outOfStock">Out of Stock</label>
                </div>
                <div className="col-span-3 flex items-center">
                  <Field
                    type="checkbox"
                    name="isFreeDelivery"
                    className="mr-2"
                  />
                  <label htmlFor="isFreeDelivery">Free Delivery</label>
                </div>
              </div>
              <Button
                text="submit"
                type="submit"
                variant="primary"
                className="mt-5 px-10 py-2"
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

export default React.memo(AddProduct);
