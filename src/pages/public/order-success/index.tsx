import React from 'react';
import { BiCheckCircle } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Footer, Navbar } from '@components';
import { formatDate } from '@utils/fomatDate';

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  const handleNavigateHome = () => navigate('/');
  const handleNavigateProfile = () => navigate('/profile');

  return (
    <main>
      <Navbar />
      <section className="mx-auto w-full rounded-lg bg-white p-6 shadow-lg md:max-w-md">
        <BiCheckCircle className="mx-auto mb-4" size={100} color="#00ff00" />
        <h2 className="mb-2 text-center text-xl font-bold text-primary">
          Order Created Successfully.
        </h2>
        <p className="mb-10 text-center text-danger">
          Your order has been successfully processed. Admin will updated your
          status shortly.
        </p>
        {orderData && (
          <div className="mt-10 rounded bg-light-gray bg-opacity-40 p-4">
            <h2 className="mb-3 text-center font-semibold text-primary">
              Order Details
            </h2>
            <div className="my-5 space-y-4 text-sm">
              <p>
                Order ID:
                <span className="mx-2 font-semibold text-black">
                  {orderData?.orderId}
                </span>
              </p>
              <p>
                Status:
                <span className="mx-2 font-semibold text-primary">
                  {orderData?.status}
                </span>
              </p>
              <p>
                Total Amount:
                <span className="mx-2 font-semibold text-black">
                  Kshs. {orderData?.totalAmount}
                </span>
              </p>

              <p>
                Order At:
                <span className="mx-2 font-semibold text-black">
                  {formatDate(orderData?.createdAt)}
                </span>
              </p>
            </div>
          </div>
        )}
        <div className="my-5 flex items-center justify-center gap-x-5">
          <Button
            text="Back to Home page"
            variant="primary"
            type="button"
            onClick={handleNavigateHome}
            className="px-8 py-2"
          />
          <Button
            text="View Order Details"
            variant="outline"
            type="button"
            onClick={handleNavigateProfile}
            className="px-8 py-2"
          />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default React.memo(OrderSuccess);
