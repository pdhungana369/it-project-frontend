import React from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Container,
  Footer,
  Modal,
  Navbar,
  TextField,
} from '@components';
import { RootState, useAppDispatch } from '@redux/store';
import { RxCross1 } from 'react-icons/rx';
import { modalAction } from '@redux/action/layout.action';
import Service from '@setup/network';
import toastAlert from '@utils/toast';
import { Link, useNavigate } from 'react-router-dom';
import { userInfoAction } from '@redux/action/user.action';
import { cartGetAction, cartPostAction } from '@redux/action/cart.action';
import axios from 'axios';
import { RiMapPinFill } from 'react-icons/ri';
import { Form, Formik } from 'formik';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();

  const userDetails = useSelector(
    (state: RootState) => state?.userInfoData?.userInfo
  );
  console.log('cartReduxData', userDetails);
  const [isLoading, setIsLoading] = React.useState(false);

  const [loadingProductId, setLoadingProductId] = React.useState<string | null>(
    null
  );
  const [shippingModal, setShippingModal] = React.useState(false);
  const [userDetailsFormValues, setUserDetailsFormValues] =
    React.useState<any>();

  const cartReduxData = useSelector((state: RootState) => state.cartReduxData);

  const userReduxData = useSelector((state: RootState) => state?.userLoginData);
  const handleShippingModal = () => {
    setShippingModal(!shippingModal);
  };
  async function createOrder() {
    setIsLoading(true);
    try {
      await Service.post('/order', {
        recipientAddress: userDetailsFormValues?.recipientAddress,
        recipientName: userDetailsFormValues?.recipientName,
        recipientPhoneNumber: userDetailsFormValues?.recipientPhoneNumber,
      });
      return true;
    } catch (error) {
      console.error('Error creating order', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleCheckOut = async () => {
    if (!userDetailsFormValues?.recipientAddress) {
      handleShippingModal();
      return;
    }
    const isOrderCreated = await createOrder();
    if (!isOrderCreated) {
      return;
    }
    const khaltiPayload = {
      return_url: `http://localhost:3000/order-success`,
      website_url: 'http://localhost.com:3000/',
      amount: cartReduxData?.cart?.totalAmount,
      purchase_order_id: cartReduxData?.cart?.id,
      purchase_order_name: userDetails?.name,
      customer_info: {
        name: userDetails?.name,
        email: userDetails?.email,
        phone: userDetails?.phoneNumber,
      },
    };

    try {
      const { data } = await axios.post(
        'https://dev.khalti.com/api/v2/epayment/initiate/',
        khaltiPayload,
        {
          headers: {
            Authorization: 'Key 060d6480c16e48dfb3bb7abe7fc8208e',
            'Content-Type': 'application/json',
          },
        }
      );
      if (data?.payment_url) {
        window.location.href = data?.payment_url;
      }
    } catch (err: any) {
      toastAlert(
        'error',
        err?.response?.data?.message ?? 'Something went wrong'
      );
    }
  };

  const handleDeleteCart = async (id: string) => {
    if (!window.confirm('Are you sure want to delete?')) return;
    try {
      await Service.delete(`/cart/${id}`);
      toastAlert('success', 'Successfully deleted the cart');
    } catch (err: any) {
      toastAlert(
        'error',
        err?.response?.data?.message ?? 'Something went wrong to delete'
      );
      console.log('Error', err);
    }
  };
  const initalValues = {
    recipientAddress: userDetailsFormValues?.recipientAddress,
    recipientName: userDetailsFormValues?.recipientName ?? userDetails?.name,
    recipientPhoneNumber:
      userDetailsFormValues?.recipientPhoneNumber ?? userDetails?.phoneNumber,
  };

  const handleCartQuantityChange = async (id: string, quantity: number) => {
    if (!userReduxData?.userAuthenticate && !userReduxData?.userJwtToken) {
      return dispatch(modalAction(true));
    }
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

  const handleSubmit = (values: any) => {
    setUserDetailsFormValues(values);
    setShippingModal(!shippingModal);
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
                      {item?.product?.name}
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
                      Rs. {item?.product?.price}
                    </p>

                    <div className="flex items-center gap-2 md:gap-3">
                      <Button
                        text="-"
                        variant="danger"
                        type="button"
                        className="px-1 md:px-2 md:py-1"
                        onClick={() =>
                          handleCartQuantityChange(item?.product?.id, -1)
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
                          handleCartQuantityChange(item?.product?.id, 1)
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
                  {userDetailsFormValues?.recipientAddress ? (
                    <div className="my-10">
                      <div className="flex justify-between">
                        <div className="flex gap-x-2">
                          <RiMapPinFill size={20} color="#d4222a" />
                          <div>
                            <p className="text-sm font-semibold">
                              {userDetailsFormValues?.recipientName}{' '}
                              <span className="mx-1 text-text-paragraph">
                                {
                                  userDetailsFormValues?.recipientPhoneNumber
                                }{' '}
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
                        {userDetailsFormValues?.recipientAddress}
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

                  <Button
                    onClick={handleCheckOut}
                    text="Checkout with Khalti"
                    type="button"
                    variant="danger"
                    className="mb-2 w-full py-2"
                    isSubmitting={isLoading}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </Container>

      <Footer />
      {shippingModal && (
        <Modal modalClose={handleShippingModal} width="">
          <Formik
            initialValues={initalValues}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {() => (
              <div className="p-10">
                <h5 className="text-center text-base font-semibold text-primary md:text-2xl">
                  Shipping Address
                </h5>
                <Form>
                  <TextField
                    label="Address"
                    name="recipientAddress"
                    placeholder="Enter your address"
                  />
                  <TextField
                    label="Name"
                    placeholder="Enter your name"
                    name="recipientName"
                  />
                  <TextField
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    name="recipientPhoneNumber"
                  />
                  <Button
                    type="submit"
                    text="Submit"
                    variant="primary"
                    className="w-full py-2"
                  />
                </Form>
              </div>
            )}
          </Formik>
        </Modal>
      )}
    </main>
  );
};

export default React.memo(Cart);
