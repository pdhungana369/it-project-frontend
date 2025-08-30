import { RootState } from '@redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type Role = 'ADMIN' | 'USER' | 'PARTNER';

interface Props {
  allowedRoutes: Role[];
}

const isValidRole = (role: any): role is Role => {
  return role === 'ADMIN' || role === 'USER' || role === 'PARTNER';
};

const PrivateRoute: React.FC<Props> = ({ allowedRoutes }) => {
  const adminReduxStore = useSelector(
    (state: RootState) => state?.adminAuthData
  );
  const partnerReduxStore = useSelector(
    (state: RootState) => state?.partnerAuthData
  );

  const userReduxStore = useSelector((state: RootState) => state.userLoginData);

  const adminRole = isValidRole(adminReduxStore?.adminInfo?.role)
    ? adminReduxStore?.adminInfo?.role
    : undefined;
  const adminToken = adminReduxStore?.adminJwtToken;
  const adminAuthenticate = adminReduxStore?.adminAuthenticate;

  const partnerRole = isValidRole(partnerReduxStore?.partnerInfo?.role)
    ? partnerReduxStore?.partnerInfo?.role
    : undefined;
  const partnerToken = partnerReduxStore?.partnerJwtToken;

  const partnerAuthenticate = partnerReduxStore?.partnerAuthenticate;

  const userRole = isValidRole(userReduxStore?.userInfo?.role)
    ? userReduxStore?.userInfo?.role
    : undefined;
  const userToken = userReduxStore?.userJwtToken;
  const userAuthenticate = userReduxStore?.userAuthenticate;

  const location = useLocation();

  const currentRole = adminRole || userRole || partnerRole;

  return currentRole &&
    allowedRoutes.includes(currentRole) &&
    (adminToken || userToken || partnerToken) &&
    (adminAuthenticate || userAuthenticate || partnerAuthenticate) ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default React.memo(PrivateRoute);
