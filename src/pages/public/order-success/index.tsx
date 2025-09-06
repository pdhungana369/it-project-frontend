import React from 'react';
import { BiCheckCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { Button, Footer, Navbar } from '@components';
import { useAppDispatch } from '@redux/store';
import { cartGetAction } from '@redux/action/cart.action';

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleNavigateHome = () => navigate('/');
  const handleNavigateProfile = () =>
    navigate('/profile', { state: { tab: 2 } });

  React.useEffect(() => {
    dispatch(cartGetAction());
  }, []);

  return (
    <main>
      <Navbar />
      <section className="mx-auto my-20 w-full rounded-lg bg-white p-6 shadow-lg md:max-w-md">
        <BiCheckCircle className="mx-auto mb-4" size={100} color="#00ff00" />
        <h2 className="mb-2 text-center text-xl font-bold text-primary">
          Order Created Successfully.
        </h2>
        <p className="mb-10 text-center text-danger">
          Your order has been successfully processed. Admin will updated your
          status shortly.
        </p>
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
