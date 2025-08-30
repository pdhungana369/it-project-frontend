import React from 'react';
import { useSelector } from 'react-redux';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button, Container, Footer, Modal, Navbar } from '@components';
import { RootState, useAppDispatch } from '@redux/store';
import { RxCross1 } from 'react-icons/rx';
import { modalAction } from '@redux/action/layout.action';
import Service from '@setup/network';
import toastAlert from '@utils/toast';
import { Link, useNavigate } from 'react-router-dom';
import { userInfoAction } from '@redux/action/user.action';
import { RiMapPinFill } from 'react-icons/ri';
import { cartGetAction, cartPostAction } from '@redux/action/cart.action';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [shippingModal, setShippingModal] = React.useState(false);
  const [creditErrorMsg, setCreditErrorMsg] = React.useState('');
  const userDetails = useSelector(
    (state: RootState) => state?.userInfoData?.userInfo
  );

  const handleShippingModal = () => {
    setShippingModal(!shippingModal);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
  };

  const navigate = useNavigate();

  const [loadingProductId, setLoadingProductId] = React.useState<string | null>(
    null
  );

  const cartReduxData = useSelector((state: RootState) => state.cartReduxData);

  const userReduxData = useSelector((state: RootState) => state?.userLoginData);

  const handleCheckOut = () => {
    if (!userDetails?.addressInfo?.streetAndNumber) {
      handleShippingModal();
      return;
    }
    if (!userDetails?.verifiedStatus) {
      return toastAlert('error', 'Please Update you profile at first');
    }
    setCreditErrorMsg('');
    navigate('/checkout', {
      state: {
        totalAmount: cartReduxData?.cart?.totalAmount,
      },
    });
  };

  const handleDeleteCart = async (id: string) => {
    if (!window.confirm('Are you sure want to delete?')) return;
    setCreditErrorMsg('');
    try {
      await Service.delete(`/cart/${id}`);
      toastAlert('success', 'Successfully deleted the cart');
      dispatch(cartGetAction());
    } catch (err: any) {
      toastAlert(
        'error',
        err?.response?.data?.message ?? 'Something went wrong to delete'
      );
      console.log('Error', err);
    }
  };

  const handleCartQuantityChange = async (id: string, quantity: number) => {
    if (!userReduxData?.userAuthenticate && !userReduxData?.userJwtToken) {
      return dispatch(modalAction(true));
    }
    setCreditErrorMsg('');
    await dispatch(
      cartPostAction({
        productId: id,
        quantity,
      })
    );
    setLoadingProductId(null);
  };
  React.useEffect(() => {
    dispatch(userInfoAction());
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const creditPayButton =
    cartReduxData?.cart?.totalAmount <= userDetails?.creditLimit;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCheckoutCredit = async () => {
    if (!userDetails?.addressInfo?.streetAndNumber) {
      handleShippingModal();
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        amount: String(cartReduxData?.cart?.totalAmount),
        isCredit: true,
      };
      const { data } = await Service.post('/order', payload);
      navigate(`/order/success/`, {
        state: { orderData: data?.data?.newOrder },
      });
      setIsLoading(false);
    } catch (err: any) {
      toastAlert('error', err?.response?.data?.error ?? 'Something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <main>
      <Navbar />
      <Container className="px-4 py-20 md:px-0">
        <div className="grid grid-cols-1 gap-x-0 gap-y-10 md:grid-cols-2 md:gap-5 xl:gap-10">
          <div className="h-auto rounded-lg border border-border px-4 md:px-0">
            <h5 className="my-5 text-center text-base font-semibold text-primary md:my-10 md:text-2xl">
              My Shopping Cart
            </h5>
            {cartReduxData?.cart?.CartItem?.length > 0 ? (
              cartReduxData?.cart?.CartItem?.map((item) => (
                <div
                  className="border-b border-border p-0 last:border-0 md:p-5"
                  key={item?.id}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold md:text-base">
                      {item?.product.name}
                    </h4>
                    <RxCross1
                      color="#d4222a"
                      size={15}
                      className="cursor-pointer"
                      onClick={() => handleDeleteCart(item?.id)}
                    />
                  </div>
                  <div className="my-5 flex items-center justify-between">
                    <p className="text-sm md:text-base">
                      Rs. {item?.product.price}
                    </p>

                    <div className="flex items-center gap-2 md:gap-3">
                      <Button
                        text="-"
                        variant="danger"
                        type="button"
                        className="px-1 md:px-2 md:py-1"
                        onClick={() =>
                          handleCartQuantityChange(item?.product.id, -1)
                        }
                        isSubmitting={loadingProductId === item?.id}
                      />
                      <span className="px-2 text-sm md:text-base">
                        {item?.quantity}
                      </span>
                      <Button
                        text="+"
                        type="button"
                        variant="primary"
                        className="px-1 py-0.5 text-sm md:px-2 md:py-1 md:text-base"
                        onClick={() =>
                          handleCartQuantityChange(item?.product.id, 1)
                        }
                        isSubmitting={loadingProductId === item?.id}
                      />
                    </div>
                    <p className="text-sm md:text-base">
                      Total: Rs. {item?.totalPrice}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="mb-10 flex flex-col items-center justify-center">
                <p className="mb-5 text-danger">No Items added to cart</p>
                <Link to="/">
                  <Button
                    text="Continue to shopping"
                    variant="primary"
                    className="px-4 py-2"
                    type="button"
                  />
                </Link>
              </div>
            )}
          </div>
          <div className="mx-0 sm:mx-10 xl:mx-20">
            {cartReduxData?.cart?.CartItem?.length > 0 && (
              <>
                <div className="mb-10 rounded-lg border border-border p-5">
                  <h5 className="text-center text-base font-semibold text-primary md:text-2xl">
                    Shipping Address
                  </h5>
                  {userDetails?.addressInfo?.streetAndNumber ? (
                    <div className="my-10">
                      <div className="flex justify-between">
                        <div className="flex gap-x-2">
                          <RiMapPinFill size={20} color="#d4222a" />
                          <div>
                            <p className="text-sm font-semibold">
                              {userDetails?.addressInfo?.receiptName}{' '}
                              <span className="mx-1 text-text-paragraph">
                                {userDetails?.addressInfo?.phoneNumber}{' '}
                              </span>
                            </p>
                          </div>
                        </div>
                        <button
                          className="block text-[blue]"
                          onClick={handleShippingModal}
                        >
                          Edit
                        </button>
                      </div>

                      <p className="mx-5 my-2 text-sm text-black">
                        {userDetails?.addressInfo?.streetAndNumber},
                        <span className="mx-0.5">
                          {userDetails?.addressInfo?.place},
                        </span>
                        <span className="mx-5.t">
                          {userDetails?.addressInfo?.region},
                        </span>
                        <span className="mx-0.5">
                          {userDetails?.addressInfo?.country}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={handleShippingModal}
                      type="button"
                      className="mt-5 flex w-full items-center justify-center border border-dashed border-light-gray px-2 py-5 text-sm text-primary"
                    >
                      + Add address
                    </button>
                  )}
                </div>

                <div className="rounded-lg border border-border p-5">
                  <h5 className="text-center text-base font-semibold text-primary md:text-2xl">
                    Order Summary
                  </h5>
                  <div className="mb-10 mt-10 flex items-center justify-between">
                    <p>Total Price</p>
                    <p>
                      Rs.
                      <span className="mx-1 font-semibold">
                        {cartReduxData?.cart?.totalAmount}
                      </span>
                    </p>
                  </div>
                  <p className="mb-2 text-center text-xs text-danger">
                    {creditErrorMsg}
                  </p>
                  <Button
                    onClick={handleCheckOut}
                    text="Checkout M-Pesa"
                    type="button"
                    variant="danger"
                    className="mb-2 w-full py-2"
                  />

                  {/* creditPayButton */}
                </div>
              </>
            )}
          </div>
        </div>
      </Container>

      {shippingModal && (
        <Modal modalClose={handleShippingModal} width="md:w-[70%] w-full">
          <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
            <div className="block md:hidden">ddd</div>
            <div>fadsasassafd</div>
          </div>
        </Modal>
      )}
      <Footer />
    </main>
  );
};

export default React.memo(Cart);
