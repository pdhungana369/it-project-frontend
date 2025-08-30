import { AppDispatch } from '@redux/store';
import Service from '@setup/network';
import { ICartPayload } from '@types';
import toastAlert from '@utils/toast';

export const cartPostAction = (user: ICartPayload) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: 'CART_POST_LOADING',
    });
    try {
      const { data } = await Service.post('/cart', user);
      dispatch({
        type: 'CART_POST_ITEM_SUCCESS',
        payload: data?.data,
      });
      toastAlert('success', 'cart item added successfully');
      dispatch(cartGetAction());
    } catch (err: any) {
      dispatch({
        type: 'CART_POST_ITEM_FAILED',
        payload: err?.response?.data?.error,
      });
      toastAlert('error', err?.response?.data?.error || "Something went wrong");

    }
  };
};
export const cartGetAction = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await Service.get('/cart');
      dispatch({
        type: 'CART_ITEM_SUCCESS',
        payload: data?.data,
      });
    } catch (err: any) {
      dispatch({
        type: 'CART_ITEM_FAILED',
        payload: err?.response?.data?.error,
      });

      toastAlert('error', 'something went wrong');
    }
  };
};

export const cartQuantityChange = (cartPayload: ICartPayload) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: 'CART_QUANTITY_LOADING',
    });
    try {
      const { data } = await Service.patch('/cart', cartPayload);
      dispatch({
        type: 'CART_QUANTITY_SUCCESS',
        payload: data?.data,
      });
      dispatch(cartGetAction());
    } catch (err: any) {
      dispatch({
        type: 'CART_QUANTITY_FAILED',
        payload: err?.response?.data?.error,
      });
      toastAlert('error', 'something went wrong');
    }
  };
};
