import { Footer } from '@components';
import Container from '@components/container';
import Navbar from '@components/navbar';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function TermsAndConditions() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <main>
      <Navbar />
      <Container isSection className="my-10 px-4 md:px-0">
        <h1 className="mb-10 text-center text-2xl font-semibold">
          Privacy Policy
        </h1>
        <p className="my-10">
          At AgroFresh Connect, we are committed to protecting your privacy.
          This Privacy Policy explains how we collect, use, and safeguard your
          personal information when you use our Website.
        </p>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">
            1. Information We Collect
          </h6>
          <ul>
            <li className="mb-1 mt-2">
              We may collect the following information when you create an
              account or place an order:
            </li>
            <li className="py-2">
              Your full name, email address, and phone number.
            </li>
            <li className="py-2">Your delivery/shipping address.</li>
            <li className="py-2">Your order history and preferences.</li>
            <li className="py-2">
              Payment details processed securely through Khalti (we do not store
              your Khalti PIN/MPIN).
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">
            2. How We Use Your Information
          </h6>
          <ul>
            <li className="mb-1 mt-2">We use your information to:</li>
            <li className="py-2">Process and deliver your orders.</li>
            <li className="py-2">
              Communicate with you about your account and order status (e.g.,
              confirmations, updates).
            </li>
            <li className="py-2">
              Improve our website and your shopping experience.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">3. Data Sharing</h6>
          <ul>
            <li className="mb-1 mt-2">
              We do not sell or rent your personal information. As a college
              project for demonstration purposes, data is stored locally and is
              not shared with any third parties.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">4. Data Security</h6>
          <ul>
            <li className="mb-1 mt-2">
              We implement reasonable security measures to protect your
              information from unauthorized access. Your payment details are
              handled securely by Khalti's payment gateway.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">5. Your Rights</h6>
          <ul>
            <li className="mb-1 mt-2">
              You can access and update your personal information at any time by
              logging into your account on our website.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">
            6. Changes to This Policy
          </h6>
          <ul>
            <li className="mb-1 mt-2">
              We may update this Privacy Policy for project demonstration
              purposes. Any changes will be posted on this page.
            </li>
          </ul>
        </section>
        <section className="mt-5 pb-10">
          <h6 className="my-2 font-semibold">Contact Information</h6>
          <p className="my-2">For privacy-related inquiries, contact us at:</p>
          <p className="my-2 font-medium">Phone: +977 98XXXXXXXX</p>
          <p className="my-2 font-medium">Email: info@agrofreshconnect.com</p>
          <p className="my-2 font-medium">
            Address: AgroFresh Connect, Pipalbot, Mid Baneshwor, Kathmandu,
            Nepal
          </p>
        </section>
      </Container>
      <Footer />
    </main>
  );
}
