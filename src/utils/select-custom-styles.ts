export const customStylesMain = {
  control: (provided: any, state: any) => ({
    ...provided,
    border: state?.isFocused ? '1px solid #173c95' : '1px solid #E1E1E7',
    '&:hover': {
      border: '1px solid #173c95',
    },
    fontSize: '14px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#16161C',
    fontSize: '12px',
  }),

  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#173c95' : '#fff',
    color: state.isFocused ? 'white' : 'black',
    fontSize: '12px',
    '&:hover': {
      backgroundColor: '#173c95',
      color: 'white',
    },
    zIndex: `99999999 !important`,
    top: 0,
  }),
};
