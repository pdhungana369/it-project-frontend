import { ICartData } from '@types';

const initState = {
  isLoading: false,
};

export const cartPostReducer = (state = initState, { type }: any) => {
  switch (type) {
    case 'CART_POST_LOADING':
      state = {
        ...state,
        isLoading: true,
      };
      break;
    case 'CART_POST_ITEM_SUCCESS':
      state = {
        ...state,
        isLoading: false,
      };
      break;
    case 'CART_POST_ITEM_FAILED':
      state = {
        ...state,

        isLoading: false,
      };
      break;
  }
  return state;
};
interface ICartReduxInitialState {
  cart: ICartData;
  isLoading: boolean;
}

const cartGetDataInitialState: ICartReduxInitialState = {
  cart: {
    totalAmount: 0,
    CartItem: [],
    id: '',
  },
  isLoading: false,
};

export const cartItemsGetReducer = (
  state = cartGetDataInitialState,
  { type, payload }: { type: string; payload: ICartData }
) => {
  switch (type) {
    case 'CART_ITEM_LOADING':
      state = {
        ...state,
        isLoading: true,
      };
      break;
    case 'CART_ITEM_SUCCESS':
      state = {
        ...state,
        cart: {
          ...payload,
        },
        isLoading: false,
      };
      break;
    case 'CART_ITEM_FAILED':
      state = {
        ...state,
        isLoading: false,
      };
      break;
  }
  return state;
};

const cartQuantityInitState = {
  isLoading: false,
};

export const cartQuantityChangeReducer = (
  state = cartQuantityInitState,
  { type }: { type: string }
) => {
  switch (type) {
    case 'CART_QUANTITY_LOADING':
      state = {
        ...state,
        isLoading: true,
      };
      break;
    case 'CART_QUANTITY_SUCCESS':
      state = {
        ...state,
        isLoading: false,
      };
      break;
    case 'CART_QUANTITY_FAILED':
      state = {
        ...state,
        isLoading: false,
      };
      break;
  }
  return state;
};
