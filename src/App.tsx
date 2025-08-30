import { Route, Routes } from 'react-router-dom';
import { adminRoutes, publicPageRoutes, userRoutes } from './setup/routes';
import PrivateRoute from '@utils/private-route';

export default function App() {
  return (
    <Routes>
      {publicPageRoutes?.map((item) => (
        <Route key={item?.id} element={item?.element} path={item?.path} />
      ))}
      <Route element={<PrivateRoute allowedRoutes={['ADMIN']} />}>
        {adminRoutes?.map((item) => (
          <Route key={item?.id} element={item?.element} path={item?.path} />
        ))}
      </Route>
      <Route element={<PrivateRoute allowedRoutes={['USER']} />}>
        {userRoutes?.map((item) => (
          <Route key={item?.id} element={item?.element} path={item?.path} />
        ))}
      </Route>
    </Routes>
  );
}
