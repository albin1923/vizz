import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Instagram, Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

const GOLD = '#C8A960';
const GOLD_LIGHT = '#E2CC8B';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

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

      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="tracking-[0.5em] text-xs uppercase mb-4"
          style={{ color: GOLD }}
        >
          Let's Create Together
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-4xl md:text-6xl font-extralight tracking-widest text-white"
        >
          CONTACT
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4 }}
          className="w-16 h-px mx-auto mt-6"
          style={{ backgroundColor: GOLD }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-10"
        >
          <div>
            <h2 className="text-2xl font-light tracking-widest text-white mb-8">GET IN TOUCH</h2>
            <p className="text-white/40 font-light leading-relaxed">
              Ready to capture your special moments? We'd love to hear from you. Reach out for bookings,
              enquiries, or just to say hello.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${GOLD}15`, color: GOLD_LIGHT }}
              >
                <Mail size={18} />
              </div>
              <div>
                <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-1">Email</p>
                <p className="text-white/70 text-sm font-light">hello@vizzeyes.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${GOLD}15`, color: GOLD_LIGHT }}
              >
                <Phone size={18} />
              </div>
              <div>
                <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-1">Phone</p>
                <p className="text-white/70 text-sm font-light">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${GOLD}15`, color: GOLD_LIGHT }}
              >
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-1">Location</p>
                <p className="text-white/70 text-sm font-light">Kerala, India</p>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="pt-4">
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">Follow Us</p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/vizzeyes_weddings"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-white/50 text-xs tracking-widest hover:border-white/30 hover:text-white transition-all duration-300"
              >
                <Instagram size={14} /> @vizzeyes_weddings
              </a>
              <a
                href="https://www.instagram.com/wee_eyes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-white/50 text-xs tracking-widest hover:border-white/30 hover:text-white transition-all duration-300"
              >
                <Instagram size={14} /> @wee_eyes
              </a>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <form
            onSubmit={handleSubmit}
            className="p-8 md:p-10 rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm space-y-6"
          >
            <div>
              <label className="block text-white/30 text-xs tracking-[0.2em] uppercase mb-2">Name</label>
              <input
                type="text"
                required
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-light focus:outline-none focus:border-white/30 transition-colors placeholder-white/20"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-white/30 text-xs tracking-[0.2em] uppercase mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-light focus:outline-none focus:border-white/30 transition-colors placeholder-white/20"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-white/30 text-xs tracking-[0.2em] uppercase mb-2">Event Type</label>
              <select
                required
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-light focus:outline-none focus:border-white/30 transition-colors"
              >
                <option value="" className="bg-[#2D7272]">Select event type</option>
                <option value="wedding" className="bg-[#2D7272]">Wedding</option>
                <option value="engagement" className="bg-[#2D7272]">Engagement</option>
                <option value="kids" className="bg-[#2D7272]">Kids / Wee Eyes</option>
                <option value="family" className="bg-[#2D7272]">Family Session</option>
                <option value="other" className="bg-[#2D7272]">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-white/30 text-xs tracking-[0.2em] uppercase mb-2">Message</label>
              <textarea
                required
                rows={4}
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-light focus:outline-none focus:border-white/30 transition-colors placeholder-white/20 resize-none"
                placeholder="Tell us about your event..."
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-sm tracking-widest font-medium transition-all duration-500 hover:shadow-xl hover:shadow-black/10 hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`,
                color: '#1A5252',
              }}
            >
              {sent ? 'MESSAGE SENT!' : (
                <>
                  <Send size={16} /> SEND MESSAGE
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>

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
