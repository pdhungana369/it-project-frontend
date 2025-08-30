import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { AppDispatch, RootState, useAppDispatch } from '@redux/store';
import { dashBoardLayoutSideBarAccordion } from '@redux/action/layout.action';
import { adminSidebarData } from '@static-data';
import { adminLogout, partnerLogout } from '@redux/action/auth.action';

interface IProps {
  children: React.ReactNode;
  role?: 'ADMIN' | 'PARTNER';
}

export default function DashboardLayout({ children, role = 'ADMIN' }: IProps) {
  const dispatch: AppDispatch = useAppDispatch();

  const [showDashBoardSideBar, setShowDashboardSideBar] = React.useState(true);

  const handleDashBoardSideBar = () =>
    setShowDashboardSideBar(!showDashBoardSideBar);
  const sideBarId = useSelector((state: RootState) => state.layoutSetting.id);
  const adminAuthData = useSelector(
    (state: RootState) => state.adminAuthData?.adminInfo
  );

  const handleDropDown = (id: number) => {
    if (sideBarId === id) {
      dispatch(dashBoardLayoutSideBarAccordion(0));
    } else {
      dispatch(dashBoardLayoutSideBarAccordion(id));
    }
  };

  const dashboardListData = adminSidebarData;

  const handleLogout = () => {
    if (role === 'ADMIN') {
      dispatch(adminLogout());
    } else if (role === 'PARTNER') {
      dispatch(partnerLogout());
    }
  };
  return (
    <div className="">
      <div className="flex items-start bg-secondary text-white">
        <aside
          className={`${
            showDashBoardSideBar ? 'w-52' : 'hidden'
          } my-div fixed bottom-0 left-0 right-0 top-0 mt-12 h-full overflow-y-auto bg-secondary px-8 text-white`}
        >
          <ul className="mt-20">
            {dashboardListData?.map((item) => (
              <li className="list-none py-3 last:pb-0" key={item?.id}>
                <div className="" onClick={() => handleDropDown(item?.id)}>
                  <div className="flex items-center justify-between">
                    {item.child ? (
                      <h4 className="text-sm"> {item?.title} </h4>
                    ) : (
                      <NavLink
                        to={item?.path}
                        className="w-full text-sm capitalize text-white no-underline"
                        style={({ isActive }) => ({
                          fontWeight: isActive ? 600 : 400,
                          background: isActive ? '#68A8FA' : '',
                          padding: isActive ? '5px 10px' : '0',
                          borderRadius: isActive ? '8px' : '0',
                        })}
                      >
                        {item?.title}
                      </NavLink>
                    )}

                    {item?.child &&
                      (sideBarId !== item?.id ? (
                        <MdOutlineKeyboardArrowDown size={20} />
                      ) : (
                        <MdOutlineKeyboardArrowUp size={20} />
                      ))}
                  </div>
                </div>
                {sideBarId === item?.id &&
                  item?.child &&
                  item?.child?.map((el) => (
                    <NavLink
                      to={el?.path}
                      key={el?.id}
                      className="my-2 block px-3 py-0.5 text-sm text-white no-underline last:my-0"
                      style={({ isActive }) => ({
                        fontWeight: isActive ? 600 : 400,
                        background: isActive ? '#68A8FA' : '',
                        borderRadius: isActive ? '12px' : '0',
                      })}
                    >
                      {el?.title}
                    </NavLink>
                  ))}
              </li>
            ))}
            <li className="mt-5 list-none" role="button" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </aside>

        <nav className="fixed left-0 right-0 z-[99999999] flex w-full items-center justify-between bg-secondary py-4">
          <div className="flex items-center gap-x-20">
            <div
              className={`${
                showDashBoardSideBar ? 'ml-52' : 'ml-5'
              } cursor-pointer`}
              onClick={handleDashBoardSideBar}
            >
              {showDashBoardSideBar ? (
                <AiOutlineMenuFold size={30} />
              ) : (
                <AiOutlineMenuUnfold size={30} />
              )}
            </div>
          </div>
          <div className="mx-5">
            <img
              src="/logo.png"
              alt="admin-profile"
              className="mx-auto h-10 w-10 rounded-full object-cover"
            />
            <p className="pt-1 text-xs"> {adminAuthData?.email} </p>
            {/* <div className="h-10 w-20 rounded-full bg-light-gray">
              <FaRegCircleUser className="mx-auto w-full" />
            </div>
            <p className="mt-3 px-4 text-xs"> {adminAuthData.email} </p> */}
          </div>
        </nav>
      </div>
      <div
        className={`${showDashBoardSideBar ? 'ml-52' : 'ml-0'} bg-secondary`}
      >
        <div className="bg-light-grey mt-[92px] min-h-screen rounded-l-3xl bg-[#F5F5F5] px-10 py-10 shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
}
