import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Instagram } from 'lucide-react';
import { usePhotos } from '../context/PhotoContext';
import { SITE_LINKS } from '../constants/site';

const GOLD = '#C8A960';
const GOLD_LIGHT = '#E2CC8B';

const fallbackKids = ['/gallery/wee/(1).jpg.jpeg', '/gallery/wee/(2).jpg.jpeg', '/gallery/wee/(4).jpg.jpeg'];

export default function WeeEyesPage() {
  const { getByCategory } = usePhotos();
  const kidsPhotos = getByCategory('kids');

  return (
    <div className="min-h-screen bg-[#2D7272]">
      <div className="pt-5 pb-4 px-4 sm:px-6 md:px-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs sm:text-sm tracking-widest"
        >
          <ArrowLeft size={16} /> BACK
        </Link>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-10 sm:py-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="tracking-[0.35em] text-[10px] sm:text-xs uppercase mb-4"
          style={{ color: GOLD }}
        >
          Vizz Eyes Kids
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="flex flex-col justify-center items-center gap-3"
        >
          <img loading="lazy" src="/gallery/logo/wee-logo.png" alt="Wee Eyes Logo" className="h-24 md:h-32 object-contain" />
          <span className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-[0.2em] text-white">
            WEE <span style={{ color: GOLD_LIGHT }}>EYES</span>
          </span>
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.25 }}
          className="w-16 h-px mx-auto mt-6"
          style={{ backgroundColor: GOLD }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-white/65 text-sm sm:text-base max-w-2xl mx-auto mt-6 leading-relaxed"
        >
          Wee Eyes is our playful kids photography vertical. We focus on natural expressions,
          tiny details, and joyful portraits that families treasure for life.
        </motion.p>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-14 sm:pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {(kidsPhotos.length > 0 ? kidsPhotos.map((p) => p.url) : fallbackKids).map((src, i) => (
            <motion.div
              key={`${src}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="aspect-[4/5] rounded-2xl overflow-hidden shadow-lg shadow-black/20"
            >
              <img loading="lazy" src={src} alt="Wee Eyes" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-14">
          <a
            href={SITE_LINKS.instagramWeeEyes}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm tracking-widest px-6 py-3 rounded-full border border-white/15 hover:border-white/35 transition-colors"
            style={{ color: GOLD_LIGHT }}
          >
            <Instagram size={16} /> FOLLOW WEE EYES ON INSTAGRAM
          </a>
        </div>
      </section>
    </div>
  );
}
