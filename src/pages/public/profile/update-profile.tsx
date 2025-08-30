import React from 'react';
import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { Button, TextField, UploadImageUpload } from '@components';
import { userInfoAction } from '@redux/action/user.action';
import { RootState, useAppDispatch } from '@redux/store';
import Service from '@setup/network';
import toastAlert from '@utils/toast';

export default function UpdateProfile() {
  const { userInfo } = useSelector((state: RootState) => state?.userInfoData);

  const dispatch = useAppDispatch();

  const initialValues = {
    name: userInfo?.name ?? '',
    email: userInfo?.email ?? '',
    phoneNumber: userInfo?.phoneNumber ?? '',
  };

  const handleSubmit = async (val: any) => {
    try {
      await Service.patch('/update-profile', val);
      dispatch(userInfoAction());
      toastAlert('success', 'Your Profile has been updated');
    } catch (err: any) {
      toastAlert(
        'error',
        err?.response?.data?.error ?? 'Something went to wrong'
      );
    }
  };

  React.useEffect(() => {
    dispatch(userInfoAction());
  }, []);

  const inputFormData = [
    {
      id: 0,
      name: 'email',
      label: 'Email',
      placeHolder: 'Enter a  email',
    },
    {
      id: 1,
      name: 'name',
      label: 'Name',
      placeHolder: 'Enter a  name',
    },
    {
      id: 2,
      name: 'phoneNumber',
      label: 'Phone Number',
      placeHolder: 'Enter a phone number',
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting, isValid, values, setFieldValue }) => (
        <Form>
          {inputFormData?.map((item) => (
            <div className="" key={item?.id}>
              <TextField
                name={item?.name}
                readOnly={item?.name === 'email' ? true : false}
                label={item?.label}
                placeholder={item?.placeHolder}
              />
            </div>
          ))}

          <Button
            text="Submit"
            type="submit"
            variant="primary"
            className="mb-5 w-full py-2"
          />
        </Form>
      )}
    </Formik>
  );
}
