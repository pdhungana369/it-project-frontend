const initState = {
  userInfo: {
    businessName: '',
    identificationNumber: '',
    kraPinCertificate: '',
    license: '',
    practiceNumber: '',
    registrationPermit: '',
    email: '',
    name: '',
    isVerified: false,
    phoneNumber: '',
    order: [],
    verifiedStatus: '',
    creditLimit: 0,
    creditDays: 0,
    addressInfo: {
      streetAndNumber: '',
      place: '',
      region: '',
      country: '',
      latitude: '',
      longitude: '',
      receiptName: '',
      phoneNumber: '',
      landMark: '',
    },
  },
};

export const userInfoDataReducer = (
  state = initState,
  { type, payload }: any
) => {
  switch (type) {
    case 'USER_DATA_SUCCESS':
      state = {
        ...state,
        userInfo: payload,
      };
      break;
    case 'USER_DATA_FAILED':
      state = {
        ...state,
      };
      break;
  }
  return state;
};
