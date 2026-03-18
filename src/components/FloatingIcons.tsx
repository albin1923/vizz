import { Phone, MessageCircle } from 'lucide-react';
import { SITE_CONTACT, SITE_LINKS } from '../constants/site';

export default function FloatingIcons() {
  const phone = SITE_CONTACT.phones[0];
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
        className="bg-[#2D7272] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform flex items-center justify-center"
      >
        <Phone size={24} />
      </a>
      <a
        href={SITE_LINKS.whatsappFromPhone(phone)}
        target="_blank"
        rel="noreferrer"
        className="bg-green-500 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform flex items-center justify-center"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
