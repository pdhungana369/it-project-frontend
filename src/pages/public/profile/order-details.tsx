import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { userInfoAction } from '@redux/action/user.action';
import { RootState, useAppDispatch } from '@redux/store';
import { formatDate, formatDateTime } from '@utils/fomatDate';
import formatMoney from '@utils/format-money';
import { Button, Modal, TextArea } from '@components';
import { Form, Formik, FormikValues } from 'formik';
import Service from '@setup/network';
import toastAlert from '@utils/toast';

const OrderDetails: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state?.userInfoData);
  const [bookingId, setBookingId] = useState('');
  const [reviewModal, setReviewModal] = useState(false);

  function handleReviewModal(bookingId) {
    console.log('booking id', bookingId);
    setBookingId(bookingId);
    setReviewModal((prev) => !prev);
  }
  console.log('uiser id', userInfo);

  async function handleSubmitReview(val: FormikValues) {
    const payload = {
      ...val,
      userId: userInfo?.id,
      bookingId,
    };
    console.log('payload', payload);
    try {
      await Service.post('/review', payload);
      handleReviewModal();
      dispatch(userInfoAction());
      toastAlert('success', 'Your review submitted successfully');
    } catch (err: any) {
      console.log('errors', err?.response);
    }
  }

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!userInfo?.email) {
      dispatch(userInfoAction());
    }
  }, [dispatch, userInfo?.email]);

  return (
    <section>
      {userInfo?.Bookings?.map((item: any) => (
        <div className="my-5 rounded border border-border py-4" key={item?.id}>
          <div className="flex items-center justify-between border-b border-border px-4 pb-4">
            <p className="text-xs">
              Date:
              <span className="mx-1 text-xs font-semibold">
                {formatDate(item?.createdAt)}
              </span>
            </p>
            {!item?.Review?.id && (
              <Button
                text="Review"
                variant="primary"
                className="px-4 py-1"
                type="button"
                onClick={() => handleReviewModal(item?.id)}
              />
            )}
          </div>
          <div className="flex items-center justify-between border-b border-border px-4 py-5 last:border-0">
            <p className="text-xs">
              Name:
              <span className="mx-1 font-medium">{item?.services?.name}</span>
            </p>
            <p className="text-xs">
              Appointment Date:
              <span className="mx-1 font-medium">
                {formatDateTime(item?.dateAndTime ?? '')}
              </span>
            </p>
          </div>
          <div className="border-border px-4">
            <p className="mt-4 text-sm font-semibold text-primary">
              Total Amount:
              <span className="mx-1 text-danger">
                NPRs. {formatMoney(item?.services?.price)}
              </span>
            </p>
          </div>
        </div>
      ))}
      {reviewModal && (
        <Modal modalClose={handleReviewModal}>
          <div className="p-7">
            <h5 className="text-center text-xl font-semibold text-secondary">
              Leave a Review
            </h5>

            <Formik
              initialValues={{ comment: '', rating: 4 }}
              onSubmit={handleSubmitReview}
            >
              {({ isSubmitting, isValid, values, setFieldValue }) => (
                <Form>
                  <div className="mt-10">
                    <label
                      htmlFor="star"
                      className="mb-2 block text-xs font-semibold text-secondary"
                    >
                      Rating
                    </label>

                    <StarRatings
                      rating={values?.rating}
                      starRatedColor="red"
                      changeRating={(newRating: number) =>
                        setFieldValue('rating', newRating)
                      }
                      numberOfStars={5}
                      starDimension="40px"
                      starSpacing="5px"
                    />
                  </div>
                  <TextArea
                    className="mt-10"
                    label="YOUR REVIEW"
                    name="comment"
                    isPrimary={false}
                    placeHolder="write a review"
                  />
                  <Button
                    isSubmit
                    variant="primary"
                    text="Submit Review"
                    isValid={isSubmitting || isValid}
                    className="mt-10 px-5 py-2"
                    isSubmitting={isSubmitting}
                  />
                </Form>
              )}
            </Formik>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default React.memo(OrderDetails);
