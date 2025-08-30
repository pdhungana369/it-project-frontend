import { Container } from '@components';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#1c2a4d] px-4 py-10 md:px-0">
      <Container isSection className="grid grid-cols-12 gap-5 md:gap-10">
        <div className="col-span-12 mb-8 md:col-span-4 md:mb-0">
          <Link to="/" className="text-2xl font-semibold text-[#d1dbe5]">
            Salon Hub
          </Link>
          <p className="mt-4 w-full leading-6 text-[#d1dbe5] md:max-w-[17rem]"></p>
        </div>
        <div className="col-span-6 flex flex-col text-white md:col-span-2">
          <h4 className="mb-3 font-bold">Legal</h4>
          <Link
            className="inline-block py-3 text-sm text-[#d1dbe5] hover:text-danger"
            to="/terms-and-conditions"
          >
            Terms & Conditions
          </Link>
          <Link
            className="inline-block py-3 text-sm text-[#d1dbe5] hover:text-danger"
            to="/privacy-policy"
          >
            Privacy Policy
          </Link>
          <Link
            className="inline-block py-3 text-sm text-[#d1dbe5] hover:text-danger"
            to="/refund-policy"
          >
            Refund Policy
          </Link>
        </div>

        <div className="col-span-6 flex flex-col text-white md:col-span-2">
          <h4 className="mb-3 font-bold">Useful Links</h4>
          <Link
            className="py-3 text-sm text-[#d1dbe5] hover:text-danger"
            to="https://oshwallifesciences.com/contact-us"
            target="_blank"
          >
            Contact Us
          </Link>
          <Link
            className="inline-block py-3 text-sm text-[#d1dbe5] hover:text-danger"
            to="https://oshwallifesciences.com/about-us"
            target="_blank"
          >
            About Us
          </Link>
        </div>

        <div className="col-span-12 flex flex-col text-white md:col-span-3">
          <h4 className="mb-3 font-bold">Contact Details</h4>
          <div>
            <p className="mt-3 text-sm font-semibold">Location</p>
            <p className="py-3 text-[#d1dbe5]">
              Salon Hub. 3rd Floor Trade Tower, Thapathali, Kathamdnu. P.O BOX
              650-00606, Kathmandu Nepal
            </p>
          </div>
          <div className="py-2">
            <p className="text-sm font-semibold">Number</p>
            <a
              className="inline-block py-2 text-[#d1dbe5]"
              href="tel:0208006651"
            >
              +977 98XXXXXXXX
            </a>
          </div>
          <div className="py-2">
            <p className="text-sm font-semibold">Email</p>
            <a
              className="inline-block py-2 text-sm text-[#d1dbe5]"
              href="mailto:info@oshwallifesciences.com"
            >
              info@salonhub.com
            </a>
          </div>
        </div>
      </Container>
      <p className="pt-10 text-center text-white">
        © {new Date().getFullYear()} Salon Hub. All Rights Reserved
      </p>
    </footer>
  );
}
