import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { CheckCircle2 } from 'lucide-react';

interface DropPageProps {
  navigate: (path: string) => void;
}

// Kinetic Animated Number Unit
const AnimatedDigit: React.FC<{ value: string; isAccent?: boolean }> = ({ value, isAccent = false }) => {
  return (
    <div className="relative h-[60px] sm:h-[72px] md:h-[84px] overflow-hidden flex items-center justify-center select-none">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 30, opacity: 0, scale: 0.88 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -30, opacity: 0, scale: 0.88 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`font-display text-5xl sm:text-6xl md:text-7xl leading-none ${
            isAccent ? 'text-accent' : 'text-white'
          }`}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export const DropPage: React.FC<DropPageProps> = ({ navigate }) => {
  const { addToast } = useCart();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Next release countdown: placeholder target ~18 days from now until a real date is set
  const [targetTimestamp] = useState(() => {
    return Date.now() + 18 * 24 * 3600 * 1000 + 14 * 3600 * 1000 + 32 * 60 * 1000 + 45 * 1000;
  });

  const calculateTimeLeft = () => {
    const now = Date.now();
    const diff = Math.max(0, targetTimestamp - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('INVALID EMAIL', 'Please enter a valid email address.', 'error');
      return;
    }
    setSubmitted(true);
    addToast("You're on the list", `We'll email ${email} when the next release is ready.`);
    setEmail('');
  };

  return (
    <main className="bg-white text-black min-h-screen">
      {/* -------------------------------------------------------------
          1. HERO BANNER
          ------------------------------------------------------------- */}
      <section className="relative w-full overflow-hidden bg-black text-white py-28 md:py-36 px-6 md:px-14 flex items-center justify-center text-center">
        {/* Atmospheric Dark Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity filter contrast-125 scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('/placeholder.svg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-accent mb-6 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse" />
            NEXT RELEASE
          </span>

          <h1 className="font-display uppercase leading-[0.8] text-5xl sm:text-7xl md:text-8xl lg:text-[110px] text-white">
            <span>NEW DESIGNS </span>
            <br className="hidden sm:block" />
            <span className="text-accent">ON THE WAY.</span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-white/60 mt-6 max-w-md">
            A handful of new graphic tees, printed in a small batch. Join the list and we'll let you know when they're live.
          </p>

          <p className="font-sans text-xs uppercase tracking-widest text-white/40 mt-3">
            RELEASE DATE: [TO BE CONFIRMED]
          </p>
        </div>
      </section>

      {/* Red divider */}
      <div className="h-0.5 w-full bg-accent" />

      {/* -------------------------------------------------------------
          2. COUNTDOWN TIMER (Animated Digits)
          ------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-white py-20 px-6 md:px-14 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(76,111,255,0.08)_0%,_transparent_70%)]"
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent mb-10 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            NEXT RELEASE // TIME REMAINING
          </p>

          {/* Glowing Digital Timer Boxes with Animated Roll Digits */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 justify-center max-w-2xl mx-auto">
            {/* Days */}
            <div className="countdown-box bg-black text-white p-6 md:p-8 flex flex-col items-center justify-center border-t-2 border-accent/40 shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all hover:border-accent hover:shadow-[0_0_30px_rgba(76,111,255,0.3)] group">
              <AnimatedDigit value={timeLeft.days} />
              <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-white/50 mt-3 group-hover:text-white transition-colors">
                DAYS
              </span>
            </div>

            {/* Hours */}
            <div className="countdown-box bg-black text-white p-6 md:p-8 flex flex-col items-center justify-center border-t-2 border-accent/40 shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all hover:border-accent hover:shadow-[0_0_30px_rgba(76,111,255,0.3)] group">
              <AnimatedDigit value={timeLeft.hours} />
              <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-white/50 mt-3 group-hover:text-white transition-colors">
                HOURS
              </span>
            </div>

            {/* Minutes */}
            <div className="countdown-box bg-black text-white p-6 md:p-8 flex flex-col items-center justify-center border-t-2 border-accent/40 shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all hover:border-accent hover:shadow-[0_0_30px_rgba(76,111,255,0.3)] group">
              <AnimatedDigit value={timeLeft.minutes} />
              <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-white/50 mt-3 group-hover:text-white transition-colors">
                MINUTES
              </span>
            </div>

            {/* Seconds */}
            <div className="countdown-box bg-black text-white p-6 md:p-8 flex flex-col items-center justify-center border-t-2 border-accent shadow-[0_10px_30px_rgba(76,111,255,0.25)] transition-all hover:shadow-[0_0_35px_rgba(76,111,255,0.5)] group">
              <AnimatedDigit value={timeLeft.seconds} isAccent={true} />
              <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-accent mt-3 group-hover:text-white transition-colors font-bold">
                SECONDS
              </span>
            </div>
          </div>

          <p className="font-display text-2xl sm:text-3xl uppercase tracking-widest text-black mt-12">
            NEXT RELEASE
          </p>

          <p className="font-sans text-xs uppercase tracking-widest text-black/50 mt-2">
            [DATE TO BE CONFIRMED] — SHIPPING AUSTRALIA-WIDE
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------------
          3. WAITLIST SIGNUP FORM
          ------------------------------------------------------------- */}
      <section className="bg-[#FAF8F4] text-black py-20 px-6 md:px-14 border-t border-black/10">
        <div className="mx-auto max-w-xl text-center">
          <span className="font-sans text-xs uppercase tracking-widest text-accent block mb-2">
            STAY IN THE LOOP
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase leading-[0.9] text-black mb-4">
            JOIN THE WAITLIST
          </h2>
          <p className="font-sans text-sm text-black/60 mb-8 leading-relaxed">
            Leave your email and we'll send one note when the new tees are available. Nothing else.
          </p>

          {submitted ? (
            <div className="bg-black text-white p-8 border-l-4 border-accent flex flex-col items-center gap-3 animate-fadeIn">
              <CheckCircle2 className="w-10 h-10 text-accent" />
              <h3 className="font-display text-2xl uppercase tracking-wider text-white">
                YOU'RE ON THE LIST
              </h3>
              <p className="font-sans text-xs text-white/70 text-center">
                We'll email you when the next release goes live.
              </p>
            </div>
          ) : (
            <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="ENTER YOUR EMAIL..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border border-black bg-white px-4 py-3.5 text-xs font-sans font-semibold text-black placeholder:text-black/40 outline-none focus:border-accent transition-colors"
              />
              <button
                type="submit"
                className="bg-accent px-8 py-3.5 font-display text-sm uppercase text-white transition-colors hover:bg-black"
              >
                NOTIFY ME
              </button>
            </form>
          )}
        </div>
      </section>

      {/* -------------------------------------------------------------
          4. CURRENT RANGE PREVIEW
          ------------------------------------------------------------- */}
      <section className="bg-white text-black py-20 px-6 md:px-14 border-t border-black/10">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-sans text-xs uppercase tracking-widest text-accent block">
                AVAILABLE NOW
              </span>
              <h2 className="mt-2 font-display text-4xl sm:text-6xl uppercase leading-[0.88] text-black">
                IN STOCK NOW
              </h2>
            </div>

            <button
              onClick={() => navigate('/collection')}
              className="border border-black px-6 py-3 font-sans text-xs uppercase tracking-widest text-black hover:bg-black hover:text-white transition-colors"
            >
              VIEW ALL →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
