import { Dispatch } from 'redux';

export interface DashboardSidebarAccordion {
  type: 'DASHBOARD_ACCORDION';
  payload: number;
}

export const dashBoardLayoutSideBarAccordion = (payload: number = 0) => {
  return async (dispatch: Dispatch<DashboardSidebarAccordion>) => {
    dispatch({
      type: 'DASHBOARD_ACCORDION',
      payload: payload,
    });
  };
};
export const modalAction = (payload: boolean) => {
  return async (dispatch: any) => {
    dispatch({
      type: 'MODAL_ACTION',
      payload: payload,
    });
  };
};

// export const modalAction = (payload: boolean) => {
// 	return async (dispatch: any) => {
// 		dispatch({
// 			type: "MODAL_ACTION",
// 			payload: payload,
// 		});
// 	};
// };
