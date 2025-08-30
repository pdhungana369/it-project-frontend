const initState = {
  userJwtToken: '',
  userInfo: {
    userId: '',
    name: '',
    role: '',
    email: '',
  },
  isLoading: false,
  userAuthenticate: false,
  userError: '',
};

export const userLoginReducer = (state = initState, { type, payload }: any) => {
  switch (type) {
    case 'USER_LOADING':
      state = {
        ...state,
        isLoading: true,
      };
      break;
    case 'USER_LOGIN_SUCCESS':
      state = {
        ...state,
        userInfo: {
          role: payload?.userInfo?.role,
          name: payload?.userInfo?.name,
          userId: payload?.userInfo?.userId,
          email: payload?.userInfo?.email,
        },
        userJwtToken: payload?.token,
        userAuthenticate: true,
        isLoading: false,
      };
      break;
    case 'USER_LOGIN_FAILED':
      state = {
        ...state,
        userError: payload,
        isLoading: false,
        userAuthenticate: false,
        userInfo: { ...state.userInfo },
      };
      break;
    case 'USER_LOGOUT':
      state = {
        ...initState,
      };
      break;
  }
  return state;
};

const adminLoginState = {
  adminInfo: {
    adminId: '',
    email: '',
    name: '',
    role: '',
  },
  adminJwtToken: '',
  adminAuthenticate: false,
  isLoading: false,
  adminError: '',
};

export const adminLoginReducer = (
  state = adminLoginState,
  { type, payload }: any
) => {
  switch (type) {
    case 'ADMIN_LOADING':
      state = {
        ...state,
        isLoading: true,
      };
      break;
    case 'ADMIN_LOGIN_SUCCESS':
      state = {
        ...state,
        adminInfo: {
          email: payload?.adminInfo?.email,
          adminId: payload?.adminInfo?.id,
          role: payload?.adminInfo?.role,
          name: payload?.adminInfo?.name,
        },
        adminJwtToken: payload?.token,
        adminAuthenticate: true,
        isLoading: false,
      };
      break;
    case 'ADMIN_LOGIN_FAILURE':
      state = {
        ...state,
        isLoading: false,
        adminAuthenticate: false,
        adminError: payload,
        adminJwtToken: '',
      };
      break;
    case 'ADMIN_LOGOUT':
      state = {
        ...adminLoginState,
      };
      break;
  }
  return state;
};

const partnerLoginState = {
  partnerInfo: {
    partnerId: '',
    email: '',
    name: '',
    role: '',
  },
  partnerJwtToken: '',
  partnerAuthenticate: false,
  isLoading: false,
  partnerError: '',
};

export const partnerLoginReducer = (
  state = partnerLoginState,
  { type, payload }: any
) => {
  switch (type) {
    case 'PARTNER_LOADING':
      state = {
        ...state,
        isLoading: true,
      };
      break;
    case 'PARTNER_LOGIN_SUCCESS':
      console.log(payload);
      state = {
        ...state,
        partnerInfo: {
          email: payload?.userInfo?.email,
          partnerId: payload?.userInfo?.id,
          role: payload?.userInfo?.role,
          name: payload?.userInfo?.name,
        },
        partnerJwtToken: payload?.token,
        partnerAuthenticate: true,
        isLoading: false,
      };
      break;
    case 'PARTNER_LOGIN_FAILURE':
      state = {
        ...state,
        isLoading: false,
        partnerAuthenticate: false,
        partnerError: payload,
        partnerJwtToken: '',
      };
      break;
    case 'PARTNER_LOGOUT':
      state = {
        ...partnerLoginState,
      };
      break;
  }
  return state;
};
