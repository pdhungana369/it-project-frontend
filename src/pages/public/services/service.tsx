import { Button, Container, Footer, Navbar } from '@components';
import useFetch from '@hooks';
import { cartPostAction } from '@redux/action/cart.action';
import { modalAction } from '@redux/action/layout.action';
import { userInfoAction } from '@redux/action/user.action';
import { RootState, useAppDispatch } from '@redux/store';
import toastAlert from '@utils/toast';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function BlockRender({ label, value }: any) {
  return (
    <div className="flex-1 border-r border-border py-8 text-center last:border-none">
      <h4 className="mb-2 text-base font-medium"> {label} </h4>
      <p
        className={`${label === 'Price' ? 'text-danger' : 'text-primary'} text-sm font-semibold`}
      >
        {value}
      </p>
    </div>
  );
}

export default function Service() {
  const [isLoadingCartAdded, setIsLoadingCartAdded] =
    React.useState<boolean>(false);

  const dispatch = useAppDispatch();
  const userReduxData = useSelector((state: RootState) => state?.userLoginData);
  const { id: productId } = useParams();
  const { data: productDetail } = useFetch(`/product/${productId}`);

  const userInfoDataRedux = useSelector(
    (state: RootState) => state?.userInfoData
  );

  const handleCart = async () => {
    try {
      if (!userReduxData?.userAuthenticate && !userReduxData?.userJwtToken) {
        return dispatch(modalAction(true));
      }

      setIsLoadingCartAdded(true);
      await dispatch(
        cartPostAction({
          productId: productDetail?.id,
          quantity: 1,
        })
      );
      setIsLoadingCartAdded(false);
    } catch (err: any) {
      setIsLoadingCartAdded(false);
      toastAlert('error', 'Something went wrong');
    }
  };

  React.useEffect(() => {
    if (
      !userInfoDataRedux?.userInfo?.email &&
      userReduxData?.userJwtToken &&
      userReduxData?.userAuthenticate
    ) {
      dispatch(userInfoAction());
    }
  }, [
    dispatch,
    userInfoDataRedux?.userInfo?.email,
    userReduxData?.userAuthenticate,
    userReduxData?.userJwtToken,
  ]);

  // async function handlePayment() {
  //   const paymentDetails = {
  //     return_url: `http://localhost:3000/payment-details?serviceId=${productDetail?.id}&date=${date}`,
  //     website_url: 'http://localhost.com/',
  //     amount: productDetail?.price * 100,
  //     purchase_order_id: productDetail?.id,
  //     purchase_order_name: productDetail?.name,
  //     customer_info: {
  //       name: userLoginData?.userInfo?.name,
  //       email: userLoginData?.userInfo?.email,
  //     },
  //   };
  //   const { data } = await axios.post(
  //     'https://dev.khalti.com/api/v2/epayment/initiate/',
  //     paymentDetails,
  //     {
  //       headers: {
  //         Authorization: 'Key 929fc9465cd647d3a046b4a75accac90',
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   );
  //   if (data?.payment_url) {
  //     window.location.href = data?.payment_url;
  //   }
  // }

  return (
    <main>
      <Navbar />
      <Container>
        <img
          src={productDetail?.imageUrl}
          alt="salon-background"
          className="h-[60dvh] w-full rounded-md object-cover"
        />
        <section className="my-10 border border-b-0 border-l border-r border-t-0 border-border">
          <section className="mx-auto max-w-[59rem]">
            <h1 className="pt-20 text-center text-2xl font-bold text-secondary md:text-3xl">
              {productDetail?.name}
            </h1>
            <div className="mt-8 flex items-center gap-x-5 rounded-md border border-border px-5">
              <BlockRender
                label="Category"
                value={productDetail?.category?.name}
              />
              <BlockRender
                label="In Stock"
                value={productDetail?.outOfStock ? 'Yes' : 'No'}
              />
              <BlockRender
                label="Free Delivery"
                value={productDetail?.isFreeDelivery ? 'Yes' : 'No'}
              />
              <BlockRender
                label="Price"
                value={'NPR.' + productDetail?.price}
              />

              <div className="flex-1 text-center">
                <Button
                  type="button"
                  text="Add to Cart"
                  variant="danger"
                  className="px-4 py-2"
                  onClick={handleCart}
                  isSubmitting={isLoadingCartAdded}
                  isValid={!isLoadingCartAdded}
                />
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: productDetail?.descriptions }}
              className="mt-10 leading-8"
            />
          </section>
        </section>
      </Container>
      <Footer />
    </main>
  );
}
