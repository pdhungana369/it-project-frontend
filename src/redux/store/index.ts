import { applyMiddleware, createStore } from 'redux';
import { AnyAction } from 'redux';
import { persistStore } from 'redux-persist';
import { thunk, ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import persistedReducer, { rootReducers } from '../reducer';

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export { persistor, store };
