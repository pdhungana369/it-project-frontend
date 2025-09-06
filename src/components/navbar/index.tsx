import { Container, Modal } from '@components';
import Auth from '@container/auth';
import { modalAction } from '@redux/action/layout.action';
import { RootState, useAppDispatch } from '@redux/store';
import React from 'react';
import { FaCircleUser } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useOutsideClick from '@hooks/useOutSideClick';
import { userLogout } from '@redux/action/auth.action';
import { BsCart2 } from 'react-icons/bs';
import { cartGetAction } from '@redux/action/cart.action';

export default function Navbar() {
  const dispatch = useAppDispatch();
  const [showProfileOptions, setShowProfileOptions] = React.useState(false);

  const userLoginData = useSelector((state: RootState) => state.userLoginData);
  const modalReduxData = useSelector(
    (state: RootState) => state?.modalReduxData.isOpen
  );

  const cartItemsReduxResponseData = useSelector(
    (state: RootState) => state?.cartReduxData
  );

  const handleShowProfileOption = () =>
    setShowProfileOptions(!showProfileOptions);

  const dropdownRefProfileOption = useOutsideClick(() =>
    setShowProfileOptions(false)
  );

  const handleModal = () => {
    dispatch(modalAction(!modalReduxData));
  };

  const isUserLogin =
    userLoginData?.userAuthenticate && userLoginData?.userJwtToken;

  React.useEffect(() => {
    if (isUserLogin) {
      dispatch(cartGetAction());
    }
  }, [dispatch, isUserLogin]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white py-5">
      <Container>
        <nav className="flex items-center justify-between px-4 md:px-0">
          <Link to="/" className="text-2xl font-semibold text-primary">
            AgroFresh Connect
          </Link>

          <ul className="flex items-center gap-x-4 text-primary">
            <Link to="/products">
              <li>Products</li>
            </Link>

            <Link to="/terms-and-conditions">
              <li>Terms and conditions</li>
            </Link>

            <Link to="/about-us">
              <li>About us</li>
            </Link>
            <Link to="/contact-us">
              <li>Contact us</li>
            </Link>
          </ul>
          {isUserLogin ? (
            <div className="flex items-center gap-x-5">
              {cartItemsReduxResponseData?.cart?.CartItem?.length ? (
                <Link to="/cart" className="relative">
                  <BsCart2 size={25} />
                  <div className="absolute -right-2 -top-3 flex h-5 w-5 items-center justify-center rounded bg-danger">
                    <p className="text-sm text-white">
                      {cartItemsReduxResponseData?.cart?.CartItem?.length}
                    </p>
                  </div>
                </Link>
              ) : (
                <Link to="/cart" className="relative">
                  <BsCart2 size={25} />
                </Link>
              )}

              <div className="relative">
                <button
                  className="mt-1 text-primary"
                  onClick={handleShowProfileOption}
                  aria-label="Show Login Modal"
                  role="navigation"
                >
                  <FaCircleUser size={25} className="mx-auto" />
                  <p className="text-sm font-semibold">
                    {userLoginData?.userInfo?.name}
                  </p>
                </button>
                {showProfileOptions && (
                  <div
                    className="absolute right-0 top-[50px] z-[9999999999999999999] w-48 rounded-md bg-white p-5 shadow"
                    ref={dropdownRefProfileOption}
                  >
                    <div>
                      <div className="block text-secondary no-underline">
                        <p> {userLoginData?.userInfo?.name ?? ''} </p>
                        <p className="text-sm">
                          {userLoginData?.userInfo?.email ?? ''}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        state={{ tab: 2 }}
                        className="block pt-3 text-sm text-primary no-underline"
                      >
                        Order Details
                      </Link>
                    </div>

                    <div
                      className="cursor-pointer pt-3"
                      onClick={() => dispatch(userLogout())}
                    >
                      <p className="text-sm text-primary">Logout</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div
              className="flex cursor-pointer items-center gap-2 text-primary"
              role="dialog"
              onClick={handleModal}
            >
              <p className="text-sm">Sign In </p>
              <FaCircleUser size={20} />
            </div>
          )}
        </nav>
        {modalReduxData && (
          <Modal modalClose={handleModal} width="md:w-[60%] w-full">
            <Auth />
          </Modal>
        )}
      </Container>
    </header>
  );
}
