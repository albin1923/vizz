import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Instagram, Filter } from 'lucide-react';
import { useState } from 'react';
import { usePhotos } from '../context/PhotoContext';
import { SITE_LINKS } from '../constants/site';

const GOLD = '#C8A960';
const GOLD_LIGHT = '#E2CC8B';

export default function GalleryPage() {
  const { photos } = usePhotos();
  const [filter, setFilter] = useState<'all' | 'wedding' | 'kids'>('all');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = filter === 'all' ? photos : photos.filter((p) => p.category === filter);
  const selectedPhoto = photos.find((p) => p.id === selected);

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

      <div className="max-w-7xl mx-auto px-4 pb-14 sm:pb-20">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-10 sm:py-16"
        >
          <p className="tracking-[0.5em] text-xs uppercase mb-4" style={{ color: GOLD }}>
            Our Work
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extralight tracking-widest text-white">
            GALLERY
          </h1>
          <div className="w-16 h-px mx-auto mt-6" style={{ backgroundColor: GOLD }} />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14"
        >
          <Filter size={16} className="text-white/30 mt-2.5" />
          {(['all', 'wedding', 'kids'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 sm:px-6 py-2 rounded-full text-[11px] sm:text-xs tracking-[0.2em] uppercase transition-all duration-300 border ${
                filter === f
                  ? 'border-white/30 bg-white/10 text-white'
                  : 'border-white/[0.06] text-white/40 hover:text-white/70 hover:border-white/15'
              }`}
            >
              {f === 'all' ? 'All' : f === 'wedding' ? 'Weddings' : 'Kids'}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white/30 text-sm tracking-widest py-20"
          >
            No photos yet. Upload via the admin dashboard.
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filtered.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelected(photo.id)}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl cursor-pointer shadow-lg shadow-black/10"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white text-sm tracking-widest font-light">{photo.title}</p>
                  <p className="text-white/40 text-xs tracking-widest mt-1 uppercase">{photo.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-20"
        >
          <p className="text-white/30 text-sm tracking-widest mb-6">See more on Instagram</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <a
              href={SITE_LINKS.instagramWedding}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm tracking-widest px-6 py-3 rounded-full border border-white/10 hover:border-white/30 transition-all duration-300"
              style={{ color: GOLD_LIGHT }}
            >
              <Instagram size={16} /> @vizzeyes_weddings
            </a>
            <a
              href={SITE_LINKS.instagramWeeEyes}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm tracking-widest px-6 py-3 rounded-full border border-white/10 hover:border-white/30 transition-all duration-300"
              style={{ color: GOLD_LIGHT }}
            >
              <Instagram size={16} /> @wee_eyes
            </a>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white text-sm tracking-widest font-light">{selectedPhoto.title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
