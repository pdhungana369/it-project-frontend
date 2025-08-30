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
          At Oshwal Lifesciences Ltd., we are committed to protecting your
          privacy. This Privacy Policy explains how we collect, use, and
          safeguard your personal information when you use our Website.
        </p>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">
            1. Information We Collect
          </h6>
          <ul>
            <li className="mb-1 mt-2">
              We may collect the following information:
            </li>
            <li className="py-2">
              Business name, address, and contact details.
            </li>
            <li className="py-2">
              Names and contact information of authorized representatives.
            </li>
            <li className="py-2">
              Payment information (e.g., M-Pesa details, credit terms).
            </li>
            <li className="py-2">Order history and preferences.</li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">
            2. How We Use Your Information
          </h6>
          <ul>
            <li className="mb-1 mt-2">We use your information to:</li>
            <li className="py-2">Process and fulfill orders.</li>
            <li className="py-2">
              Communicate with you about your account and orders.
            </li>
            <li className="py-2">Improve our services and Website.</li>
            <li className="py-2">
              Comply with legal and regulatory requirements.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">3. Data Sharing</h6>
          <ul>
            <li className="mb-1 mt-2">
              We do not sell or rent your personal information. We may share
              your information with:
            </li>
            <li className="py-2">
              Service providers (e.g., payment processors, delivery partners).
            </li>
            <li className="py-2">
              Regulatory authorities, if required by law.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">4. Data Security</h6>
          <ul>
            <li className="mb-1 mt-2">
              We implement reasonable security measures to protect your
              information from unauthorized access, disclosure, or misuse.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">5. Your Rights</h6>
          <ul>
            <li className="mb-1 mt-2">You have the right to:</li>
            <li className="py-2">
              Access and update your personal information.
            </li>
            <li className="py-2">
              Request deletion of your data, subject to legal obligations.
            </li>
            <li className="py-2">Opt-out of marketing communications.</li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">
            6. Cookies and Tracking
          </h6>
          <ul>
            <li className="mb-1 mt-2">
              Our Website may use cookies to enhance your user experience. You
              can disable cookies in your browser settings, but this may affect
              Website functionality.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">
            7. Changes to This Policy
          </h6>
          <ul>
            <li className="mb-1 mt-2">
              We may update this Privacy Policy periodically. Changes will be
              posted on our Website, and your continued use constitutes
              acceptance of the revised policy.
            </li>
          </ul>
        </section>
        <section className="mt-5 pb-10">
          <h6 className="my-2 font-semibold">11. Contact Information</h6>
          <p className="my-2">For privacy-related inquiries, contact us at:</p>
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
