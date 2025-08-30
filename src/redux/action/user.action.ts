import Service from '@setup/network';

export const userInfoAction = () => {
  return async (dispatch: any) => {
    try {
      const { data } = await Service.get('/me');
      dispatch({
        type: 'USER_DATA_SUCCESS',
        payload: data?.data,
      });
    } catch (err: any) {
      dispatch({
        type: 'USER_DATA_FAILED',
        payload: err?.response?.data?.error,
      });
    }
  };
};
