import React from 'react';
import { FaWhatsapp } from 'react-icons/fa6';

const WhatsAppIcon: React.FC = () => {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=+254702156776&amp;text=Hello&nbsp;Oshwal&nbsp;Lifesciences"
      target="_blank"
    >
      <button className="fixed bottom-5 right-5 z-50 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#25d366] shadow-md md:right-16">
        <FaWhatsapp color="#FFFFFF" size={30} />
      </button>
    </a>
  );
};

export default React.memo(WhatsAppIcon);
