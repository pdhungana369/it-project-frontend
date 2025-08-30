/* eslint-disable @typescript-eslint/ban-ts-comment */
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { layoutReducer, modalReducer } from './layout.reducer';
import {
  adminLoginReducer,
  partnerLoginReducer,
  userLoginReducer,
} from './auth.reducer';
import {
  cartItemsGetReducer,
  cartPostReducer,
  cartQuantityChangeReducer,
} from './cart.reducer';

import { userInfoDataReducer } from './user.reducer';

export const rootReducers = combineReducers({
  layoutSetting: layoutReducer,
  adminAuthData: adminLoginReducer,
  partnerAuthData: partnerLoginReducer,
  userLoginData: userLoginReducer,
  modalReduxData: modalReducer,
  userInfoData: userInfoDataReducer,
  cartReduxData: cartItemsGetReducer,
  cartPostReduxData: cartPostReducer,
  cartQuantityChangeRedux: cartQuantityChangeReducer,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'layoutSetting',
    'adminAuthData',
    'userLoginData',
    'modalReduxData',
    'partnerAuthData',
  ],
};
// @ts-ignore
const persistedReducer = persistReducer(persistConfig, rootReducers);

export default persistedReducer;
