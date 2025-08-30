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
          Refund Policy for Medicine Products
        </h1>
        <p className="my-10">
          At Oshwal Lifesciences Ltd., we are committed to providing
          high-quality medicine products to our customers. Due to the sensitive
          nature of pharmaceuticals, our refund policy is designed to ensure the
          safety and well-being of our customers while adhering to regulatory
          guidelines.
        </p>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">
            1. Refund Request Process
          </h6>
          <ul>
            <li className="mb-1 mt-2">
              If you wish to request a refund, please contact our customer
              support team at{' '}
              <span className="font-medium">info@oshwallifesciences.com</span>{' '}
              or call us at <span className="font-medium">0208006651</span>.
            </li>
            <li className="py-2">
              Provide your order details, including the order number, product
              details, and the reason for the refund request.
            </li>
            <li className="py-2">
              Our team will review your request and respond within 5 business
              days to confirm eligibility for a refund.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">2. Refund Eligibility</h6>
          <ul>
            <li className="mb-1 mt-2">
              Refunds are applicable under the following conditions:
            </li>
            <li className="py-2">
              The medicine product is defective, damaged, or expired at the time
              of delivery.
            </li>
            <li className="py-2">
              The wrong product was delivered (e.g., incorrect medicine or
              dosage).
            </li>
            <li className="py-2">
              The refund request is made within 7 days of the purchase date.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">
            3. Refund Processing Time
          </h6>
          <ul>
            <li className="mb-1 mt-2">
              Once your refund request is approved, Oshwal Lifesciences Ltd.
              will process the refund within 20 business days.
            </li>
            <li className="py-2">
              Refunds will be issued to the original payment method used during
              the purchase.
            </li>
            <li className="py-2">
              Please note that it may take additional time for the refund to
              reflect in your account, depending on your bank or payment
              provider.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">
            4. Non-Refundable Items
          </h6>
          <ul>
            <li className="mb-1 mt-2">
              Due to health and safety regulations, the following items are not
              eligible for refunds:
            </li>
            <li className="py-2">
              Medicine products that have been opened, used, or tampered with.
            </li>
            <li className="py-2">
              Medicine products that are not in their original sealed packaging.
            </li>
            <li className="py-2">
              Prescription medicines, unless they are defective or incorrectly
              dispensed.
            </li>
            <li className="py-2">
              Products that have been stored improperly (e.g., not stored at the
              required temperature).
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">
            5. Return of Defective or Incorrect Products
          </h6>
          <ul>
            <li className="mb-1 mt-2">
              If you receive a defective, expired, or incorrect product, please
              do not use it. Contact us immediately to arrange for a return.
            </li>
            <li className="py-2">
              We will provide instructions for returning the product, and the
              cost of return shipping will be covered by Oshwal Lifesciences
              Ltd.
            </li>
            <li className="py-2">
              Once the returned product is received and inspected, we will
              process your refund or replacement.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">6. Contact Information</h6>
          <p className="my-2">
            For any questions or concerns regarding our Refund Policy, please
            contact us at:
          </p>
          <p className="my-2 font-medium">Phone: 0208006651</p>
          <p className="my-2 font-medium">Email: info@oshwallifesciences.com</p>
          <p className="my-2 font-medium">
            Address: Oshwal Lifesciences Ltd., 3rd Floor, 1 Park Avenue, First
            Parklands Road, Parklands, P.O BOX 650-00606, Nairobi.
          </p>
        </section>
      </Container>
      <Footer />
    </main>
  );
}
