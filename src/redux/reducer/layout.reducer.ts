interface LayoutState {
  id: number;
}

const initialState: LayoutState = {
  id: 1,
};

export const layoutReducer = (
  state: LayoutState = initialState,
  action: { type: string; payload: number }
): LayoutState => {
  switch (action.type) {
    case 'DASHBOARD_ACCORDION':
      return { ...state, id: action.payload };
    default:
      return state;
  }
};
const modalInitialState = {
  isOpen: false,
};

export const modalReducer = (
  state = modalInitialState,
  { type, payload }: any
) => {
  switch (type) {
    case 'MODAL_ACTION':
      state = {
        ...state,
        isOpen: payload,
      };
      break;
  }
  return state;
};
// const modalInitialState = {
// 	isOpen: false,
// };

// export const modalReducer = (
// 	state = modalInitialState,
// 	{ type, payload }: any
// ) => {
// 	switch (type) {
// 		case "MODAL_ACTION":
// 			state = {
// 				...state,
// 				isOpen: payload,
// 			};
// 			break;
// 	}
// 	return state;
// };
