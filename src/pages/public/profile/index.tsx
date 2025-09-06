import { Footer, Navbar } from '@components';
import React from 'react';
import OrderDetails from './order-details';
import { useLocation } from 'react-router-dom';

const tabBarData = [
  {
    id: 2,
    title: 'Order Details',
  },
];

const Profile: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = React.useState(location?.state?.tab ?? 1);
  return (
    <div>
      <Navbar />
      <div className="my-10 flex items-center justify-center gap-x-5">
        {tabBarData?.map((item) => (
          <button
            key={item?.id}
            onClick={() => setActiveTab(item?.id)}
            className={`${item?.id === activeTab ? 'bg-danger font-bold text-white' : 'bg-none text-primary'} rounded-md border border-border px-10 py-2`}
          >
            {item?.title}
          </button>
        ))}
      </div>
      <div className="mx-auto w-full md:w-1/3">
        {activeTab === 2 && <OrderDetails />}
      </div>
      <Footer />
    </div>
  );
};

export default React.memo(Profile);
