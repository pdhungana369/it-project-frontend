import {
  Footer,
  Navbar,
  Container,
  TextField,
  TextArea,
  Button,
} from '@components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import toastAlert from '@utils/toast';

// Contact form validation schema
const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .min(10, 'Phone number must be at least 10 digits')
    .required('Phone number is required'),
  subject: Yup.string()
    .min(5, 'Subject must be at least 5 characters')
    .required('Subject is required'),
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .required('Message is required'),
});

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactUs() {
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleSubmit = async (
    values: ContactFormValues,
    { resetForm }: any
  ) => {
    setIsSubmitting(true);

    try {
      // Simulate API call with the form values
      console.log('Submitting contact form:', values);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toastAlert(
        'success',
        'Thank you for your message! We will get back to you soon.'
      );
      resetForm();
    } catch (error) {
      toastAlert('error', 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Section with Banner */}
      <section className="relative h-[500px] overflow-hidden md:h-[600px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/banner.jpg"
            alt="Agriculture Contact Banner"
            className="h-full w-full object-cover"
          />
          {/* Overlay for better text readability */}
          <div className="from-green-900/80 to-green-700/60 absolute inset-0 bg-gradient-to-r"></div>
        </div>

        {/* Content */}
        <Container isSection className="relative z-10 flex h-full items-center">
          <div className="text-center text-white md:text-left">
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
              Contact Us
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed md:mx-0 md:text-xl">
              We'd love to hear from you. Get in touch with AgroFresh Connect
              and let's build a better agricultural marketplace together.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:items-start">
              <div className="flex items-center gap-2">
                <svg
                  className="text-green-300 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-green-100">
                  info@agrofreshconnect.com
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="text-green-300 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-green-100">+977-123-456-7890</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container isSection className="px-4 py-16 md:px-0">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-gray-800 mb-4 text-4xl font-bold">
            Let's Connect & Grow Together
          </h2>
          <p className="text-gray-600 mx-auto max-w-3xl text-lg">
            Whether you're a farmer looking to showcase your produce or a buyer
            seeking fresh agricultural products, we're here to help you succeed
            in the marketplace.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="from-green-50 to-emerald-50 rounded-2xl border border-border bg-gradient-to-br p-8">
              <h3 className="text-gray-800 mb-6 flex items-center gap-3 text-3xl font-bold">
                <span className="rounded-full bg-danger p-2 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </span>
                Get In Touch
              </h3>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                Have questions about our platform? Need help connecting with
                farmers or buyers? Whether you're looking to sell fresh produce
                or source quality agricultural products, our dedicated team is
                here to help you succeed in the agricultural marketplace.
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="border-green-100 rounded-lg border bg-white p-4 shadow-sm">
                  <span className="text-green-600 font-semibold">
                    🌾 For Farmers
                  </span>
                  <p className="text-gray-600 mt-1 text-sm">
                    Sell your produce directly to buyers
                  </p>
                </div>
                <div className="border-green-100 rounded-lg border bg-white p-4 shadow-sm">
                  <span className="text-green-600 font-semibold">
                    🛒 For Buyers
                  </span>
                  <p className="text-gray-600 mt-1 text-sm">
                    Source fresh agricultural products
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-primary p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">
                    Our Address
                  </h3>
                  <p className="text-primary">
                    123 Agriculture Street
                    <br />
                    Kathmandu, Nepal
                    <br />
                    44600
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-primary p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">
                    Phone Number
                  </h3>
                  <p className="text-primary">+977-123-456-7890</p>
                  <p className="text-primary">+977-098-765-4321</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-primary p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">
                    Email Address
                  </h3>
                  <p className="text-primary">info@agrofreshconnect.com</p>
                  <p className="text-primary">support@agrofreshconnect.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-primary p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">
                    Business Hours
                  </h3>
                  <p className="text-primary">
                    Monday - Friday: 9:00 AM - 6:00 PM
                  </p>
                  <p className="text-primary">Saturday: 9:00 AM - 4:00 PM</p>
                  <p className="text-primary">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-8">
              <h3 className="text-lg font-semibold text-primary">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="rounded-full bg-primary p-3 text-white transition-colors hover:bg-primary/80"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="rounded-full bg-primary p-3 text-white transition-colors hover:bg-primary/80"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="rounded-full bg-primary p-3 text-white transition-colors hover:bg-primary/80"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.56-.01-.188 0-.495.074-.754.372-.26.297-.99.968-.99 2.361 0 1.393 1.014 2.74 1.155 2.93.14.19 2.006 3.061 4.861 4.296.68.295 1.211.472 1.625.604.682.217 1.303.186 1.793.113.547-.082 1.759-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="rounded-full bg-primary p-3 text-white transition-colors hover:bg-primary/80"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.017z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-primary">
              Send us a Message
            </h2>
            <p className="mb-8 text-primary">
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>

            <Formik
              initialValues={{
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
              }}
              validationSchema={ContactSchema}
              onSubmit={handleSubmit}
            >
              {({ isValid }) => (
                <Form className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <TextField
                      name="name"
                      label="Full Name"
                      placeholder="Enter your full name"
                      type="text"
                    />
                    <TextField
                      name="email"
                      label="Email Address"
                      placeholder="Enter your email"
                      type="email"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <TextField
                      name="phone"
                      label="Phone Number"
                      placeholder="Enter your phone number"
                      type="tel"
                    />
                    <TextField
                      name="subject"
                      label="Subject"
                      placeholder="Enter message subject"
                      type="text"
                    />
                  </div>

                  <TextArea
                    name="message"
                    label="Message"
                    placeHolder="Tell us about your inquiry or feedback..."
                    rows={6}
                    className="mb-6"
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    text="Send Message"
                    className="w-full py-4 text-lg font-semibold"
                    isValid={isValid}
                    isSubmitting={isSubmitting}
                  />
                </Form>
              )}
            </Formik>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-gray-800 mb-8 text-center text-3xl font-bold">
            Visit Our Office
          </h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5674797982447!2d85.33585087622654!3d27.699759925824605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1925b2271197%3A0x35fe114e0e8d4749!2zUGlwYWwgQm90IE9sZCBCYW5lc2h3b3Ig4KSq4KS_4KSq4KSy4KSs4KWL4KSfIOCkquClgeCksOCkvuCkqOCliyDgpKzgpL7gpKjgpYfgpLbgpY3gpLXgpLA!5e0!3m2!1sen!2snp!4v1757154432612!5m2!1sen!2snp"
            style={{ border: 0 }}
            className="h-96 w-full"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-16">
          <h2 className="text-center text-3xl font-bold text-primary">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <h3 className="text-gray-800 mb-3 text-lg font-semibold">
                How do I become a seller?
              </h3>
              <p className="text-gray-600">
                Simply register on our platform, complete your profile
                verification, and start listing your agricultural products. Our
                team will guide you through the process.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <h3 className="text-gray-800 mb-3 text-lg font-semibold">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept various payment methods including mobile banking, bank
                transfers, and digital wallets to ensure secure and convenient
                transactions.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <h3 className="text-gray-800 mb-3 text-lg font-semibold">
                Do you provide delivery services?
              </h3>
              <p className="text-gray-600">
                Yes, we offer delivery services for orders within our service
                areas. Some products may qualify for free delivery based on
                order value and location.
              </p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <h3 className="text-gray-800 mb-3 text-lg font-semibold">
                How can I track my order?
              </h3>
              <p className="text-gray-600">
                Once your order is confirmed, you'll receive a tracking number.
                You can monitor your order status through your account dashboard
                or our tracking system.
              </p>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </main>
  );
}
