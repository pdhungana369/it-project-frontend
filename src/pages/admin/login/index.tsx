import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Button, PasswordTextField, TextField } from '@components';
import { adminLoginAction } from '@redux/action/auth.action';
import { RootState } from '@redux/store';

const VALIDATION_SCHEMA = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'Invalid email address'
    )
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export interface IAdminLogin {
  email: '';
  password: '';
}

const Login: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const location: Location<any> = useLocation();

  const dispatch: any = useDispatch();
  const initialValues: IAdminLogin = {
    email: '',
    password: '',
  };

  const reduxStoreAuth = useSelector(
    (state: RootState) => state?.adminAuthData
  );

  const handleLogin = (val: IAdminLogin, { setSubmitting }: any) => {
    dispatch(adminLoginAction(val, setSubmitting));
  };

  React.useEffect(() => {
    if (reduxStoreAuth?.adminAuthenticate && reduxStoreAuth?.adminJwtToken) {
      navigate(
        location?.pathname === '/admin/login'
          ? '/admin/dashboard'
          : location.pathname
      );
    }
  }, [
    navigate,
    reduxStoreAuth?.adminAuthenticate,
    reduxStoreAuth?.adminJwtToken,
    location,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#fffbfb] to-[#f3eaea] py-20">
      <div className="z-[99999999999] mx-auto max-w-lg rounded-lg bg-white px-10 py-5 shadow-lg">
        <h4 className="text-dark mb-5 mt-5 text-center text-2xl font-semibold">
          Admin Login
        </h4>

        <Formik
          initialValues={initialValues}
          onSubmit={handleLogin}
          validationSchema={VALIDATION_SCHEMA}
          validateOnMount
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <TextField
                name="email"
                label="Email"
                placeholder="Enter a email address"
              />

              <PasswordTextField name="password" label="Password" />
              <Button
                text="Login"
                type="submit"
                variant="primary"
                className="my-5 w-full py-3 text-white"
                isSubmitting={isSubmitting}
                isValid={isValid}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default React.memo(Login);
