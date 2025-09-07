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
          AgroFresh Connect brings the best of Nepal's harvest directly from our
          farm to your table. No middlemen. Just fresh, affordable produce.
        </p>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">1. Our Mission</h6>
          <ul>
            <li className="mb-1 mt-2">
              To revolutionize Nepal's agricultural supply chain by using
              technology to connect farmers directly with consumers, ensuring
              fair prices for producers and fresh, affordable food for families.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">2. Our Vision</h6>
          <ul>
            <li className="mb-1 mt-2">
              To become the most trusted online platform in Nepal for fresh,
              farm-direct produce, known for our quality, transparency, and
              convenience.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">3. Our Values</h6>
          <ul>
            <li className="mb-1 mt-2">
              Quality: We are committed to delivering only the freshest and
              highest-quality produce.
            </li>
            <li className="py-2">
              Transparency: We believe in fair prices for both farmers and
              consumers.
            </li>
            <li className="py-2">
              Innovation: We use technology to make the farm-to-table process
              simple and efficient.
            </li>
          </ul>
        </section>
        <section className="my-7">
          <h6 className="my-2 text-lg font-semibold">4. Our Team</h6>
          <ul>
            <li className="mb-1 mt-2">
              We are a team of students and agriculture enthusiasts dedicated to
              supporting local farming and solving real-world problems through
              technology.
            </li>
          </ul>
        </section>
      </Container>
      <Footer />
    </main>
  );
}
