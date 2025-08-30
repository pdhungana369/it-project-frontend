import Service from '@setup/network';
import toastAlert from '@utils/toast';

export const userLoginAction = (user: any, isSubmitting: any) => {
  return async (dispatch: any) => {
    try {
      const { data } = await Service.post('/login', user);
      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: data?.data,
      });
      isSubmitting(false);
      dispatch(adminLogout());
      dispatch(partnerLogout());
    } catch (err: any) {
      isSubmitting(false);
      dispatch({
        type: 'USER_LOGIN_FAILED',
        payload: err?.response?.data?.error,
      });
    }
  };
};

export const adminLoginAction = (
  payload: any,
  isSubmitting: (val: boolean) => void
) => {
  return async (dispatch: any) => {
    try {
      const { data } = await Service.post('/admin/login', payload);
      dispatch({
        type: 'ADMIN_LOGIN_SUCCESS',
        payload: data?.data,
      });
      isSubmitting(false);
      dispatch(userLogout());
      dispatch(partnerLogout());
    } catch (err: any) {
      isSubmitting(false);
      toastAlert('error', err?.response?.data?.error ?? 'Something went wrong');
      dispatch({
        type: 'ADMIN_LOGIN_FAILURE',
        payload: err?.response?.data?.error,
      });
    }
  };
};
export const partnerLoginAction = (
  payload: any,
  isSubmitting: (val: boolean) => void
) => {
  return async (dispatch: any) => {
    try {
      const { data } = await Service.post('/partner/login', payload);

      dispatch({
        type: 'PARTNER_LOGIN_SUCCESS',
        payload: data?.data,
      });
      isSubmitting(false);
      dispatch(userLogout());
      dispatch(adminLogout());
    } catch (err: any) {
      isSubmitting(false);
      toastAlert('error', err?.response?.data?.error ?? 'Something went wrong');
      dispatch({
        type: 'PARTNER_LOGIN_FAILURE',
        payload: err?.response?.data?.error,
      });
    }
  };
};

export const userLogout = () => {
  return async (dispatch: any) => {
    dispatch({
      type: 'USER_LOGOUT',
    });
  };
};

export const adminLogout = () => {
  return async (dispatch: any) => {
    dispatch({
      type: 'ADMIN_LOGOUT',
    });
  };
};
export const partnerLogout = () => {
  return async (dispatch: any) => {
    dispatch({
      type: 'PARTNER_LOGOUT',
    });
  };
};
