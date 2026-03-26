import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import Reviews from '../components/Reviews';
import { Menu, X, Instagram, Camera, Heart, Sparkles, Star, Phone, Mail, MapPin } from 'lucide-react';
import { usePhotos } from '../context/PhotoContext';
import { SITE_CONTACT, SITE_LINKS } from '../constants/site';

const GOLD = '#C8A960';
const GOLD_LIGHT = '#E2CC8B';

const NAV_ITEMS = [
  { label: 'HOME', href: '#home' },
  { label: 'GALLERY', to: '/gallery' },
  { label: 'WEE EYES', to: '/wee-eyes' },
  { label: 'ABOUT', to: '/about' },
  { label: 'CONTACT', to: '/contact' },
] as const;

type ServiceItem = {
  icon: typeof Camera;
  title: string;
  desc: string;
  href?: string;
  cta?: string;
};

const SERVICE_ITEMS: ServiceItem[] = [
  {
    icon: Camera,
    title: 'Wedding Photography',
    desc: 'Cinematic wedding coverage from rituals to reception moments.',
    href: SITE_LINKS.instagramWedding,
    cta: 'Open Wedding Instagram',
  },
  {
    icon: Sparkles,
    title: 'Kids Photography',
    desc: 'Playful portraits through our Wee Eyes kids photography brand.',
    href: SITE_LINKS.instagramWeeEyes,
    cta: 'Open Wee Eyes Instagram',
  },
  {
    icon: Heart,
    title: 'Live Streaming',
    desc: 'Professional live streaming for families who cannot attend in person.',
    href: 'https://www.youtube.com/@vizzeyesphotography',
    cta: 'Open YouTube Channel',
  },
  {
    icon: Star,
    title: 'Event Photography',
    desc: 'Beautifully documented events with editorial style and candid energy.',
  },
  {
    icon: Camera,
    title: 'Photo Lamination',
    desc: 'Premium finishing and lamination for long-lasting, vibrant prints.',
  },
  {
    icon: Sparkles,
    title: 'Album Designing',
    desc: 'Story-driven albums designed with refined layouts and color grading.',
  },
];

function Navbar({ hidden }: { hidden?: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener('resize', closeOnResize);
    return () => window.removeEventListener('resize', closeOnResize);
  }, []);

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: hidden ? -150 : 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: hidden ? 0 : 0.12 }}
      className="fixed z-50 top-3 left-[90px] sm:left-[110px] right-3 md:left-auto md:right-10 md:w-auto"
    >
      <div className="h-14 sm:h-16 px-5 sm:px-8 rounded-2xl sm:rounded-full border border-white/15 bg-[#164646]/45 backdrop-blur-xl shadow-2xl shadow-black/20 flex items-center justify-between md:justify-end gap-10">
        <span className="md:hidden text-sm sm:text-base font-light tracking-[0.25em] text-white mr-auto">
          VIZZ <span className="font-semibold">EYES</span>
        </span>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) =>
            'to' in item ? (
              <Link key={item.label} to={item.to} className="text-[11px] tracking-[0.25em] text-white/70 hover:text-white transition-colors">
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={item.href} className="text-[11px] tracking-[0.25em] text-white/70 hover:text-white transition-colors">
                {item.label}
              </a>
            )
          )}
        </div>

        <button onClick={() => setOpen((v) => !v)} className="md:hidden text-white" aria-label="Toggle navigation">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-2 rounded-2xl border border-white/15 bg-[#164646]/85 backdrop-blur-xl p-3"
          >
            {NAV_ITEMS.map((item) =>
              'to' in item ? (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block py-2 px-2 text-xs tracking-[0.25em] text-white/75 hover:text-white"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 px-2 text-xs tracking-[0.25em] text-white/75 hover:text-white"
                >
                  {item.label}
                </a>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 0.3], [0, 60]);
  const imageScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden flex items-center justify-center">
      <motion.div className="absolute inset-0 z-0" style={{ y: imageY, scale: imageScale }}>
        <img src="/gallery/vizz/3.jpeg" alt="Vizz Eyes hero" className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#153f3f]/80 via-[#1c5858]/75 to-[#1c5858]/95" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_30%_30%,rgba(200,169,96,0.18),transparent_50%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-48 z-[2] bg-gradient-to-b from-transparent to-[#1a5252] mix-blend-normal" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20 sm:pt-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="tracking-[0.35em] text-[10px] sm:text-xs uppercase mb-5"
          style={{ color: GOLD_LIGHT }}
        >
          Premium Photography Studio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-6xl md:text-8xl font-extralight tracking-[0.14em] text-white"
        >
          VIZZ <span className="font-semibold">EYES</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-3"
        >
          <Link
            to="/wee-eyes"
            className="inline-block text-sm sm:text-base tracking-[0.45em] uppercase text-white/85 hover:text-white transition-colors"
            style={{ color: GOLD_LIGHT }}
          >
            Wee Eyes
          </Link>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="w-20 h-px mx-auto my-6"
          style={{ backgroundColor: GOLD }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-white/70 text-sm sm:text-lg tracking-[0.18em] uppercase font-light"
        >
          Capturing moments that last forever
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-9 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            to="/gallery"
            className="border text-white px-8 py-3.5 rounded-full hover:bg-white hover:text-[#1A5252] transition-colors text-xs sm:text-sm tracking-[0.2em]"
            style={{ borderColor: `${GOLD}80` }}
          >
            OUR PORTFOLIO
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3.5 rounded-full text-xs sm:text-sm tracking-[0.2em] text-[#1A5252] font-medium hover:brightness-95 transition-all"
            style={{ background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})` }}
          >
            GET IN TOUCH
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  const { photos } = usePhotos();
  const backgrounds = photos.length > 0 ? photos.map((p) => p.url) : ['/gallery/vizz/1.jpeg', '/gallery/vizz/2.jpeg', '/gallery/vizz/3.jpeg'];
  const sectionBackground = backgrounds[1] ?? '/gallery/vizz/2.jpeg';

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <img src={sectionBackground} alt="Services background" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-[#1a5252]/85" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A5252] via-[#1A5252]/80 to-[#1A5252]/95" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <p className="tracking-[0.35em] text-[10px] sm:text-xs uppercase mb-3" style={{ color: GOLD }}>
            What We Offer
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-[0.2em] text-white">
            OUR SERVICES
          </h2>
          <div className="w-14 h-px mx-auto mt-5" style={{ backgroundColor: GOLD }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SERVICE_ITEMS.map((item, idx) => {
            let cardBackground = backgrounds[idx % backgrounds.length] ?? '/gallery/vizz/1.jpeg';
            if (item.title === 'Wedding Photography') {
              cardBackground = '/gallery/vizz/7.jpeg';
            }
            if (item.title === 'Kids Photography') {
              cardBackground = '/gallery/wee/(20).jpeg';
            }
            if (item.title === 'Live Streaming') {
              cardBackground = '/gallery/logo/live.jpeg';
            }
            const Icon = item.icon;
            const card = (
              <div className="group relative min-h-[240px] rounded-2xl overflow-hidden border border-white/20 bg-black/20 shadow-xl shadow-black/20">
                <img src={cardBackground} alt={item.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#00000040] via-[#0f3d3dcc] to-[#0f3d3df0]" />
                <div className="relative z-10 p-5 sm:p-6 flex flex-col h-full justify-between">
                  <div>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${GOLD}35`, color: '#fff' }}
                    >
                      <Icon size={20} />
                    </div>
                    <h3 className="text-white text-base sm:text-lg tracking-wider font-light mb-2">{item.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  {item.href && (
                    <span className="inline-flex mt-4 text-xs tracking-[0.2em] uppercase" style={{ color: GOLD_LIGHT }}>
                      {item.cta}
                    </span>
                  )}
                </div>
              </div>
            );

            if (!item.href) {
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                >
                  {card}
                </motion.div>
              );
            }

            return (
              <motion.a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="block"
              >
                {card}
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { label: 'Baptisms Covered', value: '200+' },
    { label: 'Weddings Covered', value: '500+' },
    { label: 'Happy Families', value: '1.2K+' },
    { label: 'Years Experience', value: '12+' },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#1A5252] border-y border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="text-center"
          >
            <p className="text-2xl sm:text-4xl font-light tracking-wider mb-2" style={{ color: GOLD_LIGHT }}>{s.value}</p>
            <p className="text-white/40 text-[10px] sm:text-xs tracking-[0.25em] uppercase">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function WeddingGallery() {
  const { photos } = usePhotos();

  return (
    <section id="weddings" className="py-16 sm:py-24 bg-[#245E5E]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="tracking-[0.35em] text-[10px] sm:text-xs uppercase mb-3" style={{ color: GOLD }}>
            Vizz Eyes Weddings
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-[0.2em] text-white">WEDDING PORTFOLIO</h2>
          <div className="w-14 h-px mx-auto mt-5" style={{ backgroundColor: `${GOLD}80` }} />
        </motion.div>

        {photos.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-xl mx-auto aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl shadow-black/25"
          >
            <img src={photos[0].url} alt={photos[0].title} loading="lazy" className="w-full h-full object-cover" />
          </motion.div>
        ) : (
          <p className="text-center text-white/40 text-sm tracking-widest">Photos coming soon</p>
        )}

        <div className="text-center mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/gallery"
            className="inline-flex items-center justify-center text-xs sm:text-sm tracking-[0.2em] px-7 py-3 rounded-full text-[#1A5252] font-medium"
            style={{ background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})` }}
          >
            VIEW FULL GALLERY
          </Link>
          <a
            href={SITE_LINKS.instagramWedding}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm tracking-[0.2em] px-6 py-3 rounded-full border border-white/20 hover:border-white/40 transition-colors"
            style={{ color: GOLD_LIGHT }}
          >
            <Instagram size={16} /> FOLLOW ON INSTAGRAM
          </a>
        </div>
      </div>
    </section>
  );
}

function WeeEyes() {
  return (
    <section id="wee-eyes" className="py-16 sm:py-24 bg-[#2D7272]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="tracking-[0.35em] text-[10px] sm:text-xs uppercase mb-3" style={{ color: GOLD }}>
          Our Sub-Brand
        </p>
        <h2 className="text-3xl sm:text-5xl font-extralight tracking-[0.2em] text-white">
          WEE <span style={{ color: GOLD_LIGHT }}>EYES</span>
        </h2>
        <div className="w-14 h-px mx-auto mt-5 mb-5" style={{ backgroundColor: `${GOLD}80` }} />
        <p className="text-white/70 text-sm sm:text-base leading-relaxed">
          A special corner for our littlest stars. Wee Eyes captures innocent smiles,
          playful moods, and warm family emotions with a gentle editorial style.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/wee-eyes"
            className="inline-flex items-center justify-center text-xs sm:text-sm tracking-[0.2em] px-6 py-3 rounded-full border border-white/20 text-white/85 hover:text-white hover:border-white/40"
          >
            OPEN WEE EYES PAGE
          </Link>
          <a
            href={SITE_LINKS.instagramWeeEyes}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm tracking-[0.2em] px-6 py-3 rounded-full border border-white/20 hover:border-white/40"
            style={{ color: GOLD_LIGHT }}
          >
            <Instagram size={16} /> FOLLOW WEE EYES
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const whatsappWedding = SITE_LINKS.whatsappFromPhone(
    SITE_CONTACT.phones[0],
    'Hi Vizz Eyes, I would like to know more about your photography packages.'
  );
  const whatsappAlt = SITE_LINKS.whatsappFromPhone(
    SITE_CONTACT.phones[1],
    'Hi Vizz Eyes, I am interested in booking a shoot.'
  );
  const mapsLocationUrl = "https://www.google.com/search?sxsrf=ANbL-n6GS6EPP7MfdTd_OYFknCsVVbx7xw:1773845568149&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOSN6CYNRLJvE9j-RjW088bfq-Ha-bGWbYQkxVbL5C_2o_sG2tsd2V3txZil1LkkNIDkxnygvs3ZkVvq3L6IfwM41rHdrh7_0kyrrI8foXCBialBABQ%3D%3D&q=Vizz+Eyes+Photography+Reviews#lrd=0x3b0633e958a43b89:0x919c040d5f2c0049,3,,,,";

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#245E5E] to-[#1A5252]">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <p className="tracking-[0.35em] text-[10px] sm:text-xs uppercase mb-3" style={{ color: GOLD }}>Let's Create Together</p>
        <h2 className="text-3xl sm:text-5xl font-extralight tracking-[0.2em] text-white mb-5">GET IN TOUCH</h2>
        <div className="w-14 h-px mx-auto mb-9" style={{ backgroundColor: `${GOLD}80` }} />

        <div className="space-y-3 text-white/85 text-sm sm:text-base">
          <a href={`mailto:${SITE_CONTACT.email}`} className="flex items-center justify-center gap-2 hover:text-white transition-colors">
            <Mail size={16} /> {SITE_CONTACT.email}
          </a>
          <a href={whatsappWedding} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 hover:text-white transition-colors">
            <Phone size={16} /> {SITE_CONTACT.phones[0]} (WhatsApp)
          </a>
          <a href={whatsappAlt} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 hover:text-white transition-colors">
            <Phone size={16} /> {SITE_CONTACT.phones[1]} (WhatsApp)
          </a>
          <a href={mapsLocationUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 hover:text-white transition-colors">
            <MapPin size={16} /> {SITE_CONTACT.location}
          </a>
        </div>

        <div className="mt-8">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm tracking-[0.2em] px-8 py-3 rounded-full text-[#1A5252] font-medium"
            style={{ background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})` }}
          >
            OPEN CONTACT PAGE
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.08] py-8 bg-[#0F3D3D]">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <span className="text-xs sm:text-sm tracking-[0.2em] text-white/30 font-light">
          © {new Date().getFullYear()} VIZZ EYES
          <br />
          Developed by{' '}
          <a href="https://noxusdynamics.tech" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            Noxus Dynamics
          </a>
        </span>
        <Link to="/contact" className="text-xs tracking-[0.2em] text-white/55 hover:text-white transition-colors">
          CONTACT US
        </Link>
      </div>
    </footer>
  );
}

export default function Home() {
  const [hiddenNav, setHiddenNav] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHiddenNav(true);
    } else {
      setHiddenNav(false);
    }
  });

  return (
    <div className="min-h-screen bg-[#2D7272]">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: hiddenNav ? -150 : 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 sm:top-1 sm:left-2 z-[55] flex items-center justify-center mix-blend-screen"
      >
        <Link to="/" aria-label="Vizz Eyes home">
          <img src="/gallery/logo/vizz-logo.png" alt="Vizz Eyes" className="h-16 sm:h-20 md:h-24 w-auto drop-shadow-2xl brightness-125" />
        </Link>
      </motion.div>
      <Navbar hidden={hiddenNav} />
      <Hero />
      <Services />
      <StatsBar />
      <WeddingGallery />
      <WeeEyes />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
}
