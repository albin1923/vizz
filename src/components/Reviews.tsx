import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    name: 'JJ',
    text: 'If you are looking for the best photographer and a fresh talented team, connect with them. Personal experience was genuine with awesome ideas and warm interaction.',
  },
  {
    name: 'Shaisan Devasia',
    text: 'Vinu is a star in his profession. I am fully satisfied with the work and the way they customized everything in a pocket-friendly way.',
  },
  {
    name: 'jibin sam jo',
    text: 'I hired Vizz Eyes for my son\'s baptism. Communication was smooth, responses were prompt, and the photos were exceptional.',
  },
  {
    name: 'Jintu Elsa John',
    text: 'Best photography experience with a cooperative and friendly crew. We loved the fast-paced work and the newborn and baptism coverage.',
  },
  {
    name: 'Dhiya Susan',
    text: 'We are very happy with their service. They beautifully captured our baby\'s first event.',
  },
  {
    name: 'Shalumol Chacko',
    text: 'Thank you Vinu chettan and team for making our wedding photos memorable. We are very happy and satisfied with your work.',
  },
  {
    name: 'Google Reviewer',
    text: 'Vizz Eyes Photography exceeded expectations. Their precision, creativity, patience, and attention to detail made the whole shoot comfortable and unforgettable.',
  },
  {
    name: 'Elma Lee',
    text: 'Working with Vizz Eyes for our family photo session was an absolute pleasure. The photos were beautiful and elegant.',
  },
];

export default function Reviews() {
  return (
    <section className="py-24 bg-[#164646] px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extralight tracking-[0.14em] text-white mb-4">CLIENT LOVE</h2>
          <a href="https://maps.app.goo.gl/wSExWeGzN7hNzz1D9" target="_blank" rel="noreferrer" className="text-sm tracking-widest text-[#E2CC8B] hover:text-white transition-colors underline underline-offset-4">Leave a Google Review</a>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <div className="flex gap-1 mb-4 text-[#C8A960]">
                {[...Array(5)].map((_, i) => <Star fill="currentColor" key={i} size={14} />)}
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-4">"{review.text}"</p>
              <p className="text-white tracking-widest text-xs">- {review.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
