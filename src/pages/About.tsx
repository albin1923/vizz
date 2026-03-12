import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, Heart, Award, Users } from 'lucide-react';

const GOLD = '#C8A960';
const GOLD_LIGHT = '#E2CC8B';

const timeline = [
  { year: '2018', text: 'Vizz Eyes was founded with a passion for storytelling through the lens.' },
  { year: '2019', text: 'Launched Wee Eyes, our dedicated kids photography sub-brand.' },
  { year: '2021', text: 'Crossed 200+ weddings and expanded our team of creative artists.' },
  { year: '2023', text: 'Recognized as one of the top wedding photography studios in the region.' },
  { year: '2026', text: 'Continuing to craft timeless memories for families across the country.' },
];

const values = [
  { icon: Camera, title: 'Artistic Vision', desc: 'Every frame is composed with intention — we blend documentary style with fine-art sensibility.' },
  { icon: Heart, title: 'Genuine Connection', desc: 'We build real rapport with our clients so every smile and tear captured is authentic.' },
  { icon: Award, title: 'Excellence', desc: 'From equipment to editing, we maintain the highest standards at every step.' },
  { icon: Users, title: 'Client First', desc: 'Your story, your way. We listen, plan, and deliver an experience tailored to you.' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#2D7272]">
      {/* Header */}
      <div className="pt-8 pb-4 px-6 md:px-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm tracking-widest"
        >
          <ArrowLeft size={16} /> BACK
        </Link>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="tracking-[0.5em] text-xs uppercase mb-4"
            style={{ color: GOLD }}
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl md:text-6xl font-extralight tracking-widest text-white"
          >
            ABOUT US
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-16 h-px mx-auto mt-6"
            style={{ backgroundColor: GOLD }}
          />
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-white/60 text-lg leading-relaxed font-light">
            Vizz Eyes is a premium photography agency specialising in weddings, engagements, kids, and family portraits.
            We believe that every love story deserves to be told with care, creativity, and cinematic beauty.
          </p>
          <p className="text-white/40 text-base leading-relaxed font-light mt-6">
            Based in Kerala, we've had the privilege of documenting hundreds of beautiful moments — from intimate temple
            weddings to grand celebrations. Our sub-brand <span style={{ color: GOLD_LIGHT }}>Wee Eyes</span> brings the
            same passion to children's photography, capturing the magic of childhood in every frame.
          </p>
        </motion.div>
      </section>

      {/* Featured Image */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl shadow-black/20"
        >
          <img
            src="/gallery/3.jpeg"
            alt="Vizz Eyes"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gradient-to-b from-[#245E5E] to-[#2D7272]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="tracking-[0.4em] text-xs uppercase mb-3" style={{ color: GOLD }}>What Drives Us</p>
            <h2 className="text-3xl md:text-4xl font-extralight tracking-widest text-white">OUR VALUES</h2>
            <div className="w-12 h-px mx-auto mt-6" style={{ backgroundColor: `${GOLD}60` }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl border border-white/[0.08] bg-white/[0.03]"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${GOLD}15`, color: GOLD_LIGHT }}
                >
                  <v.icon size={22} />
                </div>
                <h3 className="text-white text-lg tracking-wider font-light mb-2">{v.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed font-light">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[#2D7272]">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="tracking-[0.4em] text-xs uppercase mb-3" style={{ color: GOLD }}>Milestones</p>
            <h2 className="text-3xl md:text-4xl font-extralight tracking-widest text-white">OUR JOURNEY</h2>
            <div className="w-12 h-px mx-auto mt-6" style={{ backgroundColor: `${GOLD}60` }} />
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative pl-12 md:pl-0 mb-12 md:w-1/2 ${
                  i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
                }`}
              >
                <div
                  className="absolute left-3 md:left-auto w-3 h-3 rounded-full top-1"
                  style={{
                    backgroundColor: GOLD,
                    ...(i % 2 === 0
                      ? { right: undefined, left: '0.6rem', ['--md-right' as string]: '-6px' }
                      : {}),
                  }}
                />
                <div
                  className={`absolute w-3 h-3 rounded-full top-1 hidden md:block ${
                    i % 2 === 0 ? 'right-[-6px]' : 'left-[-6px]'
                  }`}
                  style={{ backgroundColor: GOLD }}
                />
                <div className="block md:hidden absolute w-3 h-3 rounded-full top-1 left-[0.6rem]" style={{ backgroundColor: GOLD }} />
                <p className="text-sm tracking-widest mb-1" style={{ color: GOLD_LIGHT }}>{item.year}</p>
                <p className="text-white/50 text-sm font-light leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
}
