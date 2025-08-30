import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import Button from '../button';
import PasswordTextField from '../password-textfield';
import Service from '@setup/network';
import toastAlert from '@utils/toast';
import { adminLogout, userLogout } from '@redux/action/auth.action';
import { useAppDispatch } from '@redux/store';

type UserType = 'user' | 'admin';

interface IProps {
  type: UserType;
}

interface ILoginInitialValue {
  oldPassword: string;
  confirmPassword: string;
  newPassword: string;
}

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Required'),
  newPassword: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must be at least 8 characters long, including one letter, one number, and one special character'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const ChangePassword: React.FC<IProps> = ({ type }) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const changePasswordFunction = async (
    val: ILoginInitialValue,
    url: string,
    action: any,
    path: string
  ) => {
    const payload = {
      newPassword: val.newPassword,
      oldPassword: val.oldPassword,
    };
    try {
      await Service.patch(url, payload);
      dispatch(action());
      navigate(path);
    } catch (err: any) {
      toastAlert(
        'error',
        err?.response?.data?.error ?? 'Something went wrong',
        type === 'admin' ? 'bottom-left' : ''
      );
    }
  };

  const initialValues: ILoginInitialValue = {
    newPassword: '',
    oldPassword: '',
    confirmPassword: '',
  };

  const handleSubmit = async (val: ILoginInitialValue) => {
    switch (type) {
      case 'admin':
        changePasswordFunction(
          val,
          '/admin/change-password',
          adminLogout,
          '/admin/login'
        );

        break;
      case 'user':
        changePasswordFunction(val, '/change-password', userLogout, '');
        break;
      default:
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnMount
    >
      {({ isSubmitting, isValid }) => (
        <Form className="mt-10">
          <PasswordTextField
            name="oldPassword"
            label="Old Password"
            placeHolder="Enter a old password"
          />
          <PasswordTextField
            name="newPassword"
            label="New Password"
            placeHolder="Enter a new password"
          />
          <PasswordTextField
            name="confirmPassword"
            label="Confirm Password"
            placeHolder="Enter a confirm password"
          />
          <div className="mb-5 flex items-center justify-end">
            <Button
              text="submit"
              type="submit"
              variant="primary"
              className="mt-2 w-full py-2"
              isSubmitting={isSubmitting}
              isValid={isValid}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(ChangePassword);
