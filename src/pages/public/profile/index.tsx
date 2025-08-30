import { Footer, Navbar, UpdatePassword } from '@components';
import React from 'react';
import UpdateProfile from './update-profile';
import OrderDetails from './order-details';

const tabBarData = [
  {
    id: 0,
    title: 'Update Profile',
  },
  {
    id: 2,
    title: 'Booking Details',
  },
];

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(0);
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
        {activeTab === 1 && <UpdatePassword type="user" />}
        {activeTab === 0 && <UpdateProfile />}
        {activeTab === 2 && <OrderDetails />}
      </div>
      <Footer />
    </div>
  );
};

export default React.memo(Profile);
