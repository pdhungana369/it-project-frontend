import React, { useState } from 'react';
import { formatDate } from '@utils/fomatDate';
import formatMoney from '@utils/format-money';
import Service from '@setup/network';
import { IOrderDetails } from '@types';
import { FaEye } from 'react-icons/fa6';
import { Modal } from '@components';

const OrderDetails: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<IOrderDetails[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('');

  async function getOrderDetails() {
    try {
      const { data } = await Service.get('/order-details');
      setOrderDetails(data?.data);
    } catch (err: any) {
      console.log('errors', err?.response);
    }
  }
  const handleShowModal = (id: string) => {
    setSelectedOrderId(id);
    setShowModal((prev) => !prev);
  };
  console.log('orderDetails', orderDetails);

  React.useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <section>
      {orderDetails?.map((item: IOrderDetails) => (
        <div className="my-5 rounded border border-border py-4" key={item?.id}>
          <div className="flex items-center justify-between border-b border-border px-4 pb-4">
            <p className="text-xs">
              Date:
              <span className="mx-1 text-xs font-semibold">
                {formatDate(item?.createdAt)}
              </span>
            </p>
            <p className="text-xs">
              Order Staus:
              <span
                className={`${item?.status === 'CANCELED' ? 'text-danger' : item.status === 'COMPLETED' ? 'text-[green]' : item?.status === 'PENDING' ? 'text-[yellow]' : item?.status === 'DISPATCHED' ? 'text-[blue]' : ''} mx-1 text-xs font-bold`}
              >
                {item?.status}
              </span>
            </p>

            <FaEye
              className="cursor-pointer text-primary"
              onClick={() => handleShowModal(item?.id)}
            />
          </div>
          <div className="border-b border-border px-4 py-5 last:border-0">
            <p className="py-2 text-xs">
              Order Id:
              <span className="mx-1 font-medium">{item?.orderId}</span>
            </p>
            <p className="py-2 text-xs">
              Recipient Name:
              <span className="mx-1 font-medium">{item?.recipientName}</span>
            </p>
            <p className="py-2 text-xs">
              Recipient Phone Number:
              <span className="mx-1 font-medium">
                {item?.recipientPhoneNumber}
              </span>
            </p>
          </div>
          <div className="flex items-center justify-between border-border px-4">
            <p className="mt-4 text-sm font-semibold text-primary">
              Total Amount:
              <span className="mx-1 text-danger">
                NPRs. {formatMoney(item?.totalPrice)}
              </span>
            </p>
            <p className="mt-4 text-sm font-semibold text-primary">
              Shipping Address:
              <span className="mx-1 text-danger">{item?.recipientAddress}</span>
            </p>
          </div>
        </div>
      ))}
      {showModal && (
        <Modal modalClose={() => setShowModal(!showModal)}>
          <div className="p-8">
            <h4 className="mb-6 text-center text-2xl font-bold text-primary">
              Order Details
            </h4>
            {orderDetails
              ?.filter((items: IOrderDetails) => items?.id === selectedOrderId)
              ?.map((items: IOrderDetails) =>
                items?.OrderItem?.map((item) => (
                  <div
                    key={item?.id}
                    className="my-5 border-t border-border pb-4"
                  >
                    <div className="mt-5 flex items-center gap-5">
                      <img
                        src={item.product?.imageUrl}
                        alt={item.product?.name}
                        className="h-24 w-24 object-cover"
                      />
                      <div>
                        <p className="py-2 text-sm">
                          <span className="mx-2 font-semibold text-primary">
                            Name:
                          </span>
                          {item.product?.name}
                        </p>
                        <p className="py-2 text-sm">
                          <span className="mx-2 font-semibold text-primary">
                            Category:
                          </span>
                          {item.product?.category?.name}
                        </p>
                        <p className="py-2 text-sm">
                          <span className="mx-2 font-semibold text-primary">
                            Quantity:
                          </span>
                          {item.quantity}
                        </p>

                        <p className="py-2 text-sm">
                          <span className="mx-2 font-semibold text-primary">
                            Price:
                          </span>
                          Rs. {formatMoney(item.product?.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
          </div>
        </Modal>
      )}
    </section>
  );
};

export default React.memo(OrderDetails);
