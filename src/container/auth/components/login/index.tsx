import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { Button, PasswordTextField, TextField } from '@components';
import { userLoginAction } from '@redux/action/auth.action';
import { RootState, useAppDispatch } from '@redux/store';
import { modalAction } from '@redux/action/layout.action';

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'Please enter a valid email address'
    )
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function Login() {
  const userLoginRedux = useSelector(
    (state: RootState) => state?.userLoginData
  );

  const dispatch = useAppDispatch();
  const handleLogin = (
    val: { email: string; password: string },
    { setSubmitting }: any
  ) => {
    dispatch(userLoginAction(val, setSubmitting));
  };

  React.useEffect(() => {
    if (userLoginRedux?.userAuthenticate && userLoginRedux?.userJwtToken) {
      dispatch(modalAction(false));
    }
  }, [
    dispatch,
    userLoginRedux?.userAuthenticate,
    userLoginRedux?.userJwtToken,
  ]);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={handleLogin}
      validationSchema={FORM_VALIDATION}
      validateOnMount
    >
      {({ isSubmitting, isValid }) => (
        <Form>
          {userLoginRedux?.userError && (
            <p className="text-center text-sm font-semibold text-danger">
              {userLoginRedux?.userError}
            </p>
          )}
          <TextField name="email" label="Email" placeholder="Enter you email" />
          <PasswordTextField name="password" />
          <Button
            variant="secondary"
            text="Login"
            type="submit"
            className="w-full p-2 text-center"
            isSubmitting={isSubmitting}
            isValid={isValid}
          />
        </Form>
      )}
    </Formik>
  );
}
