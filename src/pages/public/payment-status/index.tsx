import { Button, Footer, Navbar } from '@components';
import { RootState } from '@redux/store';
import Service from '@setup/network';
import { formatDateTime } from '@utils/fomatDate';
import { useEffect, useState } from 'react';
import { BiCheckCircle } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function PaymentStatus() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<any>({});
  const serviceIdParams = searchParams?.get('serviceId');
  const dataParams = searchParams?.get('date');

  const userLoginData = useSelector((state: RootState) => state.userLoginData);

  const createBooking = async () => {
    try {
      const { data } = await Service.post('/booking', {
        serviceId: serviceIdParams,
        dateAndTime: dataParams,
        userId: userLoginData?.userInfo?.userId,
      });
      setBookingDetails(data?.booking);
      console.log('oidata', data);
    } catch (err: any) {
      console.log('error', err?.response);
      console.log('error', err?.response?.data?.error);
    }
  };

  useEffect(() => {
    createBooking();
  }, []);

  return (
    <main>
      <Navbar />

      <section className="mx-auto w-full rounded-lg bg-white p-6 shadow-lg md:max-w-md">
        <BiCheckCircle className="mx-auto mb-4" size={100} color="#00ff00" />
        <h2 className="mb-2 text-center text-xl font-bold text-primary">
          Booking Created Successfully.
        </h2>
        <p className="mb-10 text-center text-danger">
          Your booking has been successfully processed. Admin will updated your
          status shortly.
        </p>
        {bookingDetails && (
          <div className="mt-10 rounded bg-light-gray bg-opacity-40 p-4">
            <h2 className="mb-3 text-center font-semibold text-primary">
              Booking Details
            </h2>
            <div className="my-5 space-y-4 text-sm">
              <p>
                Salon Name:
                <span className="mx-2 font-semibold text-primary">
                  {bookingDetails?.services?.name}
                </span>
              </p>
              <p>
                State/Provience:
                <span className="mx-2 font-semibold text-black">
                  {bookingDetails?.services?.region}
                </span>
              </p>
              <p>
                Steet
                <span className="mx-2 font-semibold text-black">
                  {bookingDetails?.services?.street}
                </span>
              </p>
              <p>
                Total Amount:
                <span className="mx-2 font-semibold text-black">
                  NPR. {bookingDetails?.services?.price}
                </span>
              </p>

              <p>
                Booking Schedule:
                <span className="mx-2 font-semibold text-black">
                  {formatDateTime(bookingDetails?.dateAndTime)}
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
            onClick={() => navigate('/')}
            // onClick={handleNavigateHome}
            className="px-8 py-2"
          />
          <Button
            text="View Order Details"
            variant="outline"
            type="button"
            // onClick={handleNavigateProfile}
            className="px-8 py-2"
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
