import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Camera, Heart, Star, Sparkles, Users, Award } from 'lucide-react';
import { usePhotos } from '../context/PhotoContext';
import { useAuth } from '../context/AuthContext';

/* ─── Accent palette ─── */
const GOLD = '#C8A960';
const GOLD_LIGHT = '#E2CC8B';

/* ─── Floating Particles (2-D decorative animation) ─── */
function FloatingParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 12 + 10,
    delay: Math.random() * 6,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/10"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -40, 0],
            x: [0, 15, -15, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Animated lens/aperture ring (2-D SVG) ─── */
function ApertureRing() {
  return (
    <motion.div
      className="absolute z-[1] pointer-events-none"
      style={{ right: '8%', top: '18%' }}
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
    >
      <svg width="220" height="220" viewBox="0 0 220 220" fill="none" className="opacity-[0.07]">
        <circle cx="110" cy="110" r="100" stroke="white" strokeWidth="1" strokeDasharray="12 8" />
        <circle cx="110" cy="110" r="70" stroke="white" strokeWidth="0.5" strokeDasharray="6 10" />
        <circle cx="110" cy="110" r="40" stroke="white" strokeWidth="0.5" />
      </svg>
    </motion.div>
  );
}

/* ─── Floating geometric shapes (2-D) ─── */
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {/* Diamond */}
      <motion.div
        className="absolute left-[10%] top-[30%] w-16 h-16 border border-white/[0.06] rotate-45"
        animate={{ y: [0, -20, 0], rotate: [45, 55, 45] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Circle */}
      <motion.div
        className="absolute right-[20%] bottom-[25%] w-24 h-24 rounded-full border border-white/[0.05]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Small gold dot */}
      <motion.div
        className="absolute left-[25%] bottom-[20%] w-3 h-3 rounded-full"
        style={{ backgroundColor: GOLD }}
        animate={{ y: [0, -30, 0], opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      {/* Horizontal line */}
      <motion.div
        className="absolute left-[5%] top-[60%] w-32 h-px bg-white/[0.04]"
        animate={{ scaleX: [0, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </div>
  );
}

/* ─── Navbar (translucent + floating) ─── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed z-50 transition-all duration-500 ${
        scrolled
          ? 'top-4 left-4 right-4 md:left-8 md:right-8 bg-[#1A5252]/70 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/20 border border-white/10'
          : 'top-0 left-0 right-0 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex justify-between items-center h-20">
        <Link to="/" className="text-2xl font-light tracking-widest text-white">
          VIZZ <span className="font-bold">EYES</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'HOME', href: '#home' },
            { label: 'GALLERY', to: '/gallery' },
            { label: 'ABOUT', to: '/about' },
            { label: 'CONTACT', to: '/contact' },
          ].map((item) =>
            'to' in item && item.to ? (
              <Link
                key={item.label}
                to={item.to}
                className="relative text-white/60 hover:text-white transition-colors text-sm tracking-widest group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{ backgroundColor: GOLD }} />
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="relative text-white/60 hover:text-white transition-colors text-sm tracking-widest group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300" style={{ backgroundColor: GOLD }} />
              </a>
            )
          )}
          <Link
            to={user ? '/admin' : '/login'}
            className="text-sm tracking-widest px-5 py-2 rounded-full transition-all duration-300 border border-white/20 text-white hover:border-white/60 hover:bg-white/10"
          >
            {user ? 'DASHBOARD' : 'LOGIN'}
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1A5252]/90 backdrop-blur-xl border-t border-white/10 px-6 pb-4 overflow-hidden rounded-b-2xl"
          >
            <a href="#home" onClick={() => setOpen(false)} className="block text-white/70 text-sm tracking-widest py-2 hover:text-white transition-colors">HOME</a>
            <Link to="/gallery" onClick={() => setOpen(false)} className="block text-white/70 text-sm tracking-widest py-2 hover:text-white transition-colors">GALLERY</Link>
            <Link to="/about" onClick={() => setOpen(false)} className="block text-white/70 text-sm tracking-widest py-2 hover:text-white transition-colors">ABOUT</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="block text-white/70 text-sm tracking-widest py-2 hover:text-white transition-colors">CONTACT</Link>
            <Link to={user ? '/admin' : '/login'} className="block text-white font-semibold text-sm tracking-widest py-2">
              {user ? 'DASHBOARD' : 'LOGIN'}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  const { scrollYProgress } = useScroll();
  const imgY = useTransform(scrollYProgress, [0, 0.3], [0, 80]);
  const imgScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: imgY, scale: imgScale }}>
        <img
          src="/gallery/3.jpeg"
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#1A5252]/85 via-[#2D7272]/75 to-[#2D7272]/95" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#1A5252]/40 to-transparent" />

      {/* 2-D animated elements */}
      <FloatingParticles />
      <ApertureRing />
      <FloatingShapes />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="tracking-[0.5em] text-xs mb-6 uppercase"
          style={{ color: GOLD_LIGHT }}
        >
          Premium Photography Agency
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
          className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-[0.15em] text-white mb-4"
        >
          VIZZ{' '}
          <span className="font-semibold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            EYES
          </span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="w-20 h-px mx-auto my-8"
          style={{ backgroundColor: GOLD }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-white/50 text-lg md:text-xl tracking-widest uppercase font-light max-w-xl mx-auto"
        >
          Capturing moments that last forever
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/gallery"
            className="border text-white px-10 py-4 rounded-full hover:bg-white hover:text-[#2D7272] transition-all duration-500 text-sm tracking-widest hover:shadow-lg hover:shadow-white/10"
            style={{ borderColor: `${GOLD}60` }}
          >
            VIEW PORTFOLIO
          </Link>
          <Link
            to="/contact"
            className="px-10 py-4 rounded-full transition-all duration-500 text-sm tracking-widest text-[#1A5252] font-medium hover:shadow-xl hover:shadow-black/10 hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})` }}
          >
            GET IN TOUCH
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1 h-2 rounded-full bg-white/40"
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Features / Services ─── */
const features = [
  { icon: Camera, title: 'Wedding Stories', desc: 'Cinematic coverage of your most precious day, from vows to the final dance.' },
  { icon: Heart, title: 'Engagement Shoots', desc: 'Intimate pre-wedding sessions that celebrate your unique love story.' },
  { icon: Sparkles, title: 'Kids Photography', desc: 'Playful, natural portraits through our sub-brand Wee Eyes.' },
  { icon: Star, title: 'Fine Art Portraits', desc: 'Timeless, gallery-worthy portraits crafted with artistic vision.' },
  { icon: Users, title: 'Family Sessions', desc: 'Candid family moments preserved in beautifully composed frames.' },
  { icon: Award, title: 'Events & Occasions', desc: 'Professional coverage for milestones, birthdays, and celebrations.' },
];

function Features() {
  return (
    <section className="py-28 bg-gradient-to-b from-[#2D7272] to-[#245E5E] relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.03]" style={{ background: `radial-gradient(circle, ${GOLD}, transparent)` }} />

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="tracking-[0.4em] text-xs uppercase mb-3" style={{ color: GOLD }}>What We Offer</p>
          <h2 className="text-3xl md:text-5xl font-extralight tracking-widest text-white">OUR SERVICES</h2>
          <div className="w-12 h-px mx-auto mt-6" style={{ backgroundColor: GOLD }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group p-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm hover:border-white/20 hover:bg-white/[0.06] transition-all duration-500 cursor-default"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-500 group-hover:shadow-lg"
                style={{ backgroundColor: `${GOLD}15`, color: GOLD_LIGHT }}
              >
                <f.icon size={24} />
              </div>
              <h3 className="text-white text-lg tracking-wider font-light mb-3">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed font-light">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Wedding Gallery Preview ─── */
function WeddingGallery() {
  const { photos } = usePhotos();

  return (
    <section id="weddings" className="py-28 bg-[#245E5E]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="tracking-[0.4em] text-xs uppercase mb-3" style={{ color: GOLD }}>Vizz Eyes Weddings</p>
          <h2 className="text-3xl md:text-5xl font-extralight tracking-widest text-white">WEDDING PORTFOLIO</h2>
          <div className="w-12 h-px mx-auto mt-6" style={{ backgroundColor: `${GOLD}60` }} />
        </motion.div>

        {photos.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl shadow-black/20 group cursor-pointer"
          >
            <img
              src={photos[0].url}
              alt={photos[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        ) : (
          <p className="text-center text-white/30 text-sm tracking-widest">Photos coming soon</p>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-14 flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            to="/gallery"
            className="inline-flex items-center justify-center gap-2 text-sm tracking-widest px-8 py-3 rounded-full transition-all duration-300 text-[#1A5252] font-medium hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})` }}
          >
            VIEW FULL GALLERY
          </Link>
          <a
            href="https://www.instagram.com/vizzeyes_weddings"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-sm tracking-widest hover:gap-3 transition-all duration-300 px-6 py-3 rounded-full border border-white/10 hover:border-white/30"
            style={{ color: GOLD_LIGHT }}
          >
            <Instagram size={16} /> FOLLOW ON INSTAGRAM
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Wee Eyes Section ─── */
function WeeEyes() {
  return (
    <section id="wee-eyes" className="py-28 bg-[#2D7272] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-[0.03]" style={{ background: `radial-gradient(circle, ${GOLD}, transparent)` }} />

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="tracking-[0.4em] text-xs uppercase mb-3" style={{ color: GOLD }}>Our Sub-Brand</p>
          <h2 className="text-3xl md:text-5xl font-extralight tracking-widest text-white">
            WEE <span className="font-medium" style={{ color: GOLD_LIGHT }}>EYES</span>
          </h2>
          <div className="w-12 h-px mx-auto mt-6 mb-6" style={{ backgroundColor: `${GOLD}60` }} />
          <p className="text-white/50 max-w-xl mx-auto font-light leading-relaxed">
            A special corner for our littlest stars. Wee Eyes captures the innocent, playful, and heartwarming moments of childhood — from tiny toes to giant smiles.
          </p>

          <div className="mt-10">
            <a
              href="https://www.instagram.com/wee_eyes"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm tracking-widest hover:gap-3 transition-all duration-300 px-6 py-3 rounded-full border border-white/10 hover:border-white/30"
              style={{ color: GOLD_LIGHT }}
            >
              <Instagram size={16} /> FOLLOW WEE EYES
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Stats Bar ─── */
function StatsBar() {
  const stats = [
    { label: 'Weddings Covered', value: '500+' },
    { label: 'Happy Families', value: '1.2K+' },
    { label: 'Years Experience', value: '8+' },
    { label: 'Awards Won', value: '15' },
  ];

  return (
    <section className="py-16 bg-[#1A5252] border-y border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="text-center"
          >
            <p className="text-3xl md:text-4xl font-light tracking-wider mb-2" style={{ color: GOLD_LIGHT }}>{s.value}</p>
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── Contact ─── */
function Contact() {
  return (
    <section id="contact" className="py-28 bg-gradient-to-b from-[#245E5E] to-[#1A5252] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.02]" style={{ background: `radial-gradient(circle, ${GOLD}, transparent)` }} />

      <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="tracking-[0.4em] text-xs uppercase mb-3" style={{ color: GOLD }}>Let's Create Together</p>
          <h2 className="text-3xl md:text-5xl font-extralight tracking-widest text-white mb-6">GET IN TOUCH</h2>
          <div className="w-12 h-px mx-auto mb-12" style={{ backgroundColor: `${GOLD}60` }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-4 text-white/50 font-light"
        >
          <p className="tracking-widest text-sm">hello@vizzeyes.com</p>
          <p className="tracking-widest text-sm">+91 98765 43210</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-6 mt-10"
        >
          <a
            href="https://www.instagram.com/vizzeyes_weddings"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-all duration-300"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://www.instagram.com/wee_eyes"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-all duration-300"
          >
            <Instagram size={18} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10"
        >
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 text-sm tracking-widest px-8 py-3 rounded-full transition-all duration-300 text-[#1A5252] font-medium hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})` }}
          >
            SEND US A MESSAGE
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10 bg-[#0F3D3D]">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-sm tracking-widest text-white/20 font-light">
          © {new Date().getFullYear()} VIZZ EYES
        </span>
        <span className="text-xs tracking-widest text-white/20 font-light">
          PHOTOGRAPHY FOR LIFE'S BEST MOMENTS
        </span>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <div className="min-h-screen bg-[#2D7272]">
      <Navbar />
      <Hero />
      <Features />
      <StatsBar />
      <WeddingGallery />
      <WeeEyes />
      <Contact />
      <Footer />
    </div>
  );
}
