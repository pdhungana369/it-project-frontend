import React from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { Button, PasswordTextField, TextField } from '@components';
import Service from '@setup/network';
import { Link } from 'react-router-dom';
import { modalAction } from '@redux/action/layout.action';
import { RootState, useAppDispatch } from '@redux/store';
import { useSelector } from 'react-redux';

interface IProps {
  setShowStep: (val: number) => void;
}

const FORM_VALIDATION_VERIFICATION = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Full Name must be at least 3 character long')
    .required('Name is required'),
  email: Yup.string().required('Name is required'),
  phoneNumber: Yup.number()
    .integer('Please enter a valid number')
    .required('Phone number is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Password must be at least 8 characters long, including one letter, one number, and one special character'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});
interface IRegister {
  password: string;
  confirmPassword: string;
  name: string;
  phoneNumber: string;
  email: string;
}

export default function Register({ setShowStep }: IProps) {
  const [registerErrorMsg, setRegisterErrorMsg] = React.useState('');

  const dispatch = useAppDispatch();
  const modalReduxData = useSelector(
    (state: RootState) => state?.modalReduxData
  );

  const initialValues: IRegister = {
    password: '',
    confirmPassword: '',
    name: '',
    phoneNumber: '',
    email: '',
  };

  const handleModal = () => {
    dispatch(modalAction(!modalReduxData));
  };

  const handleRegister = async (val: IRegister) => {
    try {
      await Service.post('/register', val);
      setShowStep(0);
    } catch (err: any) {
      setRegisterErrorMsg(err?.response?.data?.message);
    }
  };

  return (
    <>
      {registerErrorMsg && (
        <p className="mb-5 text-center text-sm text-danger">
          {registerErrorMsg}
        </p>
      )}

      <Formik
        initialValues={initialValues}
        onSubmit={handleRegister}
        validationSchema={FORM_VALIDATION_VERIFICATION}
        validateOnMount
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <TextField
              name="email"
              label="Email"
              placeholder="Enter you full name"
            />
            <TextField
              name="name"
              label="Full Name"
              placeholder="Enter you full name"
            />
            <TextField
              name="phoneNumber"
              label="Phone Number"
              placeholder="Enter you phone number"
              type="number"
            />
            <PasswordTextField name="password" />
            <PasswordTextField
              name="confirmPassword"
              label="Confirm Password"
              placeHolder="Enter Confirm password"
            />
            <div className="col-span-12 mb-4 mt-3">
              <div className="flex items-center">
                <Field
                  type="checkbox"
                  name="subscribeNewsletter"
                  required
                  className="h-5 w-5 accent-secondary"
                />
                <label className="ml-4 text-sm">
                  Yes, I agree to the
                  <Link
                    className="mx-2 text-primary underline"
                    to="/terms-and-conditions"
                    onClick={handleModal}
                  >
                    Terms of Services
                  </Link>
                </label>
              </div>
            </div>
            <Button
              variant="secondary"
              text="Sign up"
              type="submit"
              className="w-full p-2 text-center"
              isSubmitting={isSubmitting}
              isValid={isValid}
            />
          </Form>
        )}
      </Formik>
    </>
  );
}
