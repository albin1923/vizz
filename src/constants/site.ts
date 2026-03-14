export const SITE_CONTACT = {
  email: 'vizzeyesweddings@gmail.com',
  phones: ['+91 9562 266525', '+91 9526 454754'],
  location: 'Pothenpuram Jn, Pampady, Kerala',
};

const WHATSAPP_BASE = 'https://wa.me/';

const normalizePhone = (phone: string) => phone.replace(/\D/g, '');

export const SITE_LINKS = {
  instagramWedding: 'https://www.instagram.com/vizzeyes_weddings',
  instagramWeeEyes: 'https://www.instagram.com/wee_eyes',
  whatsappFromPhone: (phone: string, message?: string) => {
    const base = `${WHATSAPP_BASE}${normalizePhone(phone)}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
  },
};
