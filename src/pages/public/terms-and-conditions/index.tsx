import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Footer } from '@components';
import Container from '@components/container';
import Navbar from '@components/navbar';
import { termsConditions } from '@static-data';

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
          Terms & Conditions
        </h1>
        <p className="my-10">
          Welcome to the AgroFresh Connect website ("Website"). By accessing or
          using our Website, you agree to comply with and be bound by the
          following Terms and Conditions. If you do not agree to these terms,
          please do not use our Website.
        </p>
        {termsConditions?.map((item) => (
          <section className="my-7" key={item?.sectionTitle}>
            <h6 className="my-2 text-lg font-semibold">{item?.sectionTitle}</h6>
            <p className=""> {item?.content} </p>
          </section>
        ))}
        <section className="mt-5 pb-10">
          <h6 className="my-2 font-semibold">Contact Information</h6>
          <p className="my-2">For inquiries, contact us at:</p>
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
