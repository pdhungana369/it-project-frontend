import * as Yup from 'yup';

export const CATEGORY_VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .min(2, 'category name must be at least 2 character long')
    .required('Category name is required'),
});

export const PRODUCT_VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required('Code is required'),
  descriptions: Yup.string().required('Descriptions is required'),
  price: Yup.string().required('Buying price is required'),
  imageUrl: Yup.string().required('image url is required'),
});

export const CREDIT_VALIDATION = Yup.object().shape({
  creditLimit: Yup.string().required('credit limit is required'),
  creditDays: Yup.string().required('credit days is required'),
});

export const PARTNER_VALIDATION = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});
