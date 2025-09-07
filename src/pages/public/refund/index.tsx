import { Footer } from '@components';
import Container from '@components/container';
import Navbar from '@components/navbar';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function RefundPolicy() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <main>
      <Navbar />
      <Container isSection className="my-10 px-4 md:px-0">
        <h1 className="mb-10 text-center text-2xl font-semibold">
          Refund Policy
        </h1>
        <p className="my-10">
          Thank you for shopping with AgroFresh Connect. Due to the perishable
          nature of our farm-fresh products, we have a strict policy regarding
          refunds to ensure the highest quality and fairness for all our
          customers.
        </p>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">
            1. Eligibility for Refunds & Returns
          </h6>
          <ul>
            <li className="py-2">
              We do not accept returns or offer refunds for a simple change of
              mind or incorrect order placement. Refunds will only be considered
              if you receive a product that is spoiled, damaged, or defective
              upon delivery, or if you received an incorrect item that you did
              not order.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">
            2. Process for Requesting a Refund
          </h6>
          <ul>
            <li className="py-2">
              To be eligible for a refund, you must notify us within 24 hours of
              receiving your order. You must contact us at
              info@agrofreshconnect.com with your Order ID and a clear
              photograph of the damaged or incorrect product for our review.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">3. Approved Refunds</h6>
          <ul>
            <li className="mb-1 mt-2">
              Once your claim is approved, we will process a refund to your
              original Khalti payment method. Please allow 5-7 business days for
              the refund to be reflected in your account.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">
            4. Non-Refundable Items
          </h6>
          <ul>
            <li className="mb-1 mt-2">
              The following are not eligible for a refund: products that have
              been partially consumed or used, products discarded without
              notifying us and providing evidence, and issues reported after the
              24-hour window.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">5. Contact Us</h6>
          <ul>
            <li className="mb-1 mt-2">
              If you have any questions about our Refund Policy, please contact
              us at info@agrofreshconnect.com.
            </li>
          </ul>
        </section>
      </Container>
      <Footer />
    </main>
  );
}
