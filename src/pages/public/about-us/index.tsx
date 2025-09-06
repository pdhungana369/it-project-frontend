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
        <h1 className="mb-10 text-center text-2xl font-semibold">About Us</h1>
        <p className="my-10">
          AgroFresh Connect is a platform that connects farmers with buyers. We
          are committed to providing a platform for farmers to sell their
          products and for buyers to buy products from farmers.
        </p>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">1. Our Mission</h6>
          <ul>
            <li className="mb-1 mt-2">
              Our mission is to provide a platform for farmers to sell their
              products and for buyers to buy products from farmers.
            </li>
            <li className="py-2">
              We are committed to providing a platform for farmers to sell their
              products and for buyers to buy products from farmers.
            </li>
            <li className="py-2">
              We are committed to providing a platform for farmers to sell their
              products and for buyers to buy products from farmers.
            </li>
            <li className="py-2">
              We are committed to providing a platform for farmers to sell their
              products and for buyers to buy products from farmers.
            </li>
            <li className="py-2">
              We are committed to providing a platform for farmers to sell their
              products and for buyers to buy products from farmers.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">2. Our Vision</h6>
          <ul>
            <li className="mb-1 mt-2">We use your information to:</li>
            <li className="py-2">
              We are committed to providing a platform for farmers to sell their
              products and for buyers to buy products from farmers.
            </li>
            <li className="py-2">
              Communicate with you about your account and orders.
            </li>
            <li className="py-2">
              We are committed to providing a platform for farmers to sell their
              products and for buyers to buy products from farmers.
            </li>
            <li className="py-2">
              We are committed to providing a platform for farmers to sell their
              products and for buyers to buy products from farmers.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">3. Our Values</h6>
          <ul>
            <li className="mb-1 mt-2">
              We are committed to providing a platform for farmers to sell their
              products and for buyers to buy products from farmers.
            </li>
            <li className="py-2">
              We are committed to providing a platform for farmers to sell their
              products and for buyers to buy products from farmers.
            </li>
            <li className="py-2">
              We are committed to providing a platform for farmers to sell their
              products and for buyers to buy products from farmers.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">4. Our Team</h6>
          <ul>
            <li className="mb-1 mt-2">
              We are committed to providing a platform for farmers to sell their
              products and for buyers to buy products from farmers.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">5. Our History</h6>
          <ul>
            <li className="mb-1 mt-2">You have the right to:</li>
            <li className="py-2">
              We are committed to providing a platform for farmers to sell their
              products and for buyers to buy products from farmers.
            </li>
            <li className="py-2">
              We are committed to providing a platform for farmers to sell their
              products and for buyers to buy products from farmers.
            </li>
            <li className="py-2">
              We are committed to providing a platform for farmers to sell their
              products and for buyers to buy products from farmers.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">6. Our Impact</h6>
          <ul>
            <li className="mb-1 mt-2">
              We are committed to providing a platform for farmers to sell their
              products and for buyers to buy products from farmers. Website
              functionality.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">7. Our Future</h6>
          <ul>
            <li className="mb-1 mt-2">
              We are committed to providing a platform for farmers to sell their
              products and for buyers to buy products from farmers. posted on
              our Website, and your continued use constitutes acceptance of the
              revised policy.
            </li>
          </ul>
        </section>
        <section className="mt-5 pb-10">
          <h6 className="my-2 font-semibold">Our Contact Information</h6>
          <p className="my-2">For privacy-related inquiries, contact us at:</p>
          <p className="my-2 font-medium">Phone: +977 98XXXXXXXX</p>
          <p className="my-2 font-medium">Email: info@agrofreshconnect.com</p>
          <p className="my-2 font-medium">
            Address: AgroFresh Connect, 3rd Floor, Thapathali, Kathmandu.
          </p>
        </section>
      </Container>
      <Footer />
    </main>
  );
}
