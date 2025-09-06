import { AdminDashboardLayout } from '@container';
import React from 'react';
import { useLocation } from 'react-router-dom';
import TitleButton from '../components/title-button';
import Service from '@setup/network';
import { formatDate } from '@utils/fomatDate';

const AdminOrderPreview: React.FC = () => {
  const { state } = useLocation();
  console.log(state);
  const [orderDetailsData, setOrderDetailsData] = React.useState<any>();

  const fetchOrderDetail = async () => {
    try {
      const { data } = await Service.get(`/admin/order/${state}`);
      setOrderDetailsData(data?.data);
    } catch (err: any) {
      console.log('Error', err?.response?.data?.error);
    }
  };

  React.useEffect(() => {
    fetchOrderDetail();
  }, [state]);

  return (
    <AdminDashboardLayout>
      <TitleButton title="Order Preview" />
      <div className="mt-10 grid grid-cols-3 gap-5">
        <div className="">
          <h4 className="text-sm font-black text-secondary">Orders Items</h4>
          {orderDetailsData?.OrderItem?.map((item: any) => (
            <div
              className="mt-2 rounded-lg border border-border p-5"
              key={item?.id}
            >
              <h6 className="py-2 text-sm">
                Product Name:
                <span className="mx-2 font-semibold text-primary">
                  {item?.product?.name}{' '}
                </span>
              </h6>
              <h6 className="py-2 text-sm">
                Category Name:
                <span className="mx-2 font-semibold text-primary">
                  {item?.product?.category?.name}{' '}
                </span>
              </h6>
              <h6 className="py-2 text-sm">
                Price:
                <span className="mx-2 font-semibold text-primary">
                  Rs. {item?.product?.price}{' '}
                </span>
              </h6>
              <h6 className="py-2 text-sm">
                Quantity:
                <span className="mx-2 font-semibold text-primary">
                  {item?.quantity}
                </span>
              </h6>
            </div>
          ))}
          {/* {
            orderDetailsPreview?
          } */}
        </div>
        <div className="rounded-lg border border-border p-5">
          <h4 className="text-sm font-black text-secondary">Order Details</h4>
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <h6 className="py-2 text-sm">
                Total Quantity:
                <span className="mx-2 font-semibold text-primary">
                  {orderDetailsData?.totalQuantity}
                </span>
              </h6>
              <h6 className="py-2 text-sm">
                Total Price:
                <span className="mx-2 font-semibold text-primary">
                  Rs.{orderDetailsData?.totalPrice}{' '}
                </span>
              </h6>
            </div>
            <h6 className="py-2 text-sm">
              Order Status:
              <span
                className={`${orderDetailsData?.status === 'CANCELED' ? 'text-danger' : orderDetailsData?.status === 'COMPLETED' ? 'text-[green]' : 'text-[#000]'} mx-2 font-semibold`}
              >
                {orderDetailsData?.status}{' '}
              </span>
            </h6>
            <h6 className="py-2 text-sm">
              Order Date:
              <span className="mx-2 font-semibold text-primary">
                {formatDate(orderDetailsData?.createdAt)}{' '}
              </span>
            </h6>
          </div>
          <div className="my-4">
            <h5 className="mb-4 text-sm font-black text-secondary">
              Shipping Details
            </h5>
            <h6 className="py-2 text-sm">
              Receipt Name:
              <span className="mx-2 font-semibold text-primary">
                {orderDetailsData?.recipientName}
              </span>
            </h6>
            <h6 className="py-2 text-sm">
              Phone Number:
              <span className="mx-2 font-semibold text-primary">
                {orderDetailsData?.recipientPhoneNumber}
              </span>
            </h6>
            <h6 className="py-2 text-sm">
              Address:
              <span className="mx-2 font-semibold text-primary">
                {orderDetailsData?.recipientAddress}
              </span>
            </h6>
          </div>

          {/* {
            orderDetailsPreview?
          } */}
        </div>
        <div className="">
          <h4 className="text-sm font-black text-secondary">Users Details</h4>
          <div className="mt-2 rounded-lg border border-border p-5">
            <h6 className="py-2 text-sm">
              Name:
              <span className="mx-2 font-semibold text-primary">
                {orderDetailsData?.User?.name}{' '}
              </span>
            </h6>
            <h6 className="py-2 text-sm">
              Email:
              <span className="mx-2 font-semibold text-primary">
                {orderDetailsData?.User?.email}{' '}
              </span>
            </h6>
            {/* <h6 className="py-2 text-sm">
              Phone:
              <span className="mx-2 text-primary font-semibold">
                {orderDetailsData?.addressInfo?.phoneNumber}
              </span>
            </h6> */}
          </div>
          {/* {
            orderDetailsPreview?
          } */}
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default React.memo(AdminOrderPreview);
