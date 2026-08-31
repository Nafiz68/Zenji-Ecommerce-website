import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface OurStoryPageProps {
  navigate: (path: string) => void;
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({ navigate }) => {
  const zenjiFacts = [
    {
      label: 'What ZENJI is',
      value: 'ZENJI is an Australian anime streetwear brand.',
    },
    {
      label: 'Founded',
      value: 'ZENJI was founded in 2024.',
    },
    {
      label: 'What we make',
      value: 'ZENJI makes limited-edition anime-inspired graphic tees in 100% heavyweight 240gsm cotton.',
    },
    {
      label: 'Shipping',
      value: 'ZENJI ships Australia-wide, with free shipping on orders over A$150 and standard delivery in 5-10 business days.',
    },
    {
      label: 'Restocks',
      value: 'ZENJI products are limited edition. There are no restocks, ever — once a piece sells out it is gone for good.',
    },
    {
      label: 'Pricing',
      value: 'ZENJI tees are A$39.99, with selected pieces on sale at A$33.99.',
    },
    {
      label: 'Influences',
      value: 'ZENJI draws on samurai discipline, Japanese iconography and modern anime art.',
    },
    {
      label: 'Based in',
      value: 'ZENJI is based in Australia and ships to every Australian state and territory, including Sydney, Melbourne, Brisbane, Perth and Adelaide.',
    },
    {
      label: 'Anime inspiration',
      value: 'ZENJI designs are inspired by series including Jujutsu Kaisen, Demon Slayer, Naruto, One Piece and Dragon Ball, alongside original samurai artwork. Every design is ZENJI’s own — no artwork is licensed from a studio.',
    },
    {
      label: 'Next drop',
      value: 'The Origin Drop is in stock and shipping now, with selected pieces on sale at 15% off.',
    },
  ];

  // Framer Motion Animation Variants with strict typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { y: 35, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  const fadeUpVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const factItemVariants: Variants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <main className="bg-black text-white min-h-screen py-20 px-6 md:px-14 relative overflow-hidden">
      {/* Background Ambient Glow & Kanji Watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-20 font-serif text-[280px] text-white/[0.02] select-none select-none leading-none hidden md:block"
      >
        武
      </span>

      <motion.div
        className="mx-auto max-w-[760px] relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Brand Header */}
        <motion.div variants={lineVariants} className="flex items-center gap-3 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#BC0100] animate-pulse" />
          <span className="font-jetbrains text-[11px] tracking-[0.3em] text-[#BC0100] uppercase block">
            ABOUT // ZENJI
          </span>
        </motion.div>

        {/* Animated Red Line Separator */}
        <motion.span
          aria-hidden="true"
          className="my-4 block h-0.5 w-12 bg-[#BC0100] origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Kinetic Hero Headline */}
        <h1 className="font-anton uppercase leading-[0.88] text-4xl sm:text-6xl md:text-7xl text-white mb-10 overflow-hidden">
          <motion.span variants={lineVariants} className="block">
            ANIME STREETWEAR AUSTRALIA —
          </motion.span>
          <motion.span variants={lineVariants} className="block text-white/90">
            BORN FROM THE
          </motion.span>
          <motion.span variants={lineVariants} className="block text-[#BC0100]">
            WARRIOR SPIRIT.
          </motion.span>
        </h1>

        {/* Narrative Copy with Staggered Fade Up */}
        <motion.div variants={containerVariants} className="space-y-6 font-ibm text-sm md:text-base leading-relaxed text-white/75">
          <motion.p variants={fadeUpVariants}>
            ZENJI began with one belief: what you wear should tell a story.
          </motion.p>
          <motion.p variants={fadeUpVariants}>
            Inspired by samurai discipline, anime art and modern street culture, we create premium streetwear for those who choose their own path.
          </motion.p>
          <motion.p variants={fadeUpVariants}>
            Every ZENJI piece combines Japanese-inspired artwork, powerful symbolism and oversized silhouettes to express courage, creativity and individuality.
          </motion.p>
        </motion.div>

        {/* Highlight Blockquote with Animated Left Border */}
        <motion.blockquote
          variants={fadeUpVariants}
          className="my-10 border-l-2 border-[#BC0100] pl-6 font-ibm text-sm sm:text-base italic leading-relaxed text-white/85 bg-white/[0.02] py-5 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#BC0100]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          "ZENJI is more than a name on a shirt. It represents the warrior within, the part of us that keeps moving forward, stays true to itself and refuses to fade into the crowd."
        </motion.blockquote>

        <motion.p variants={fadeUpVariants} className="font-ibm text-sm md:text-base text-white/75 mb-10 leading-relaxed">
          We design for the dreamers, fighters, creators and outsiders shaping their own future.
        </motion.p>

        {/* Manifesto Slogan */}
        <motion.div variants={lineVariants}>
          <p className="font-anton text-2xl sm:text-3xl md:text-4xl uppercase leading-tight text-white mb-8">
            Wear your story. Wear your spirit. <span className="text-[#BC0100]">Wear ZENJI.</span>
          </p>

          <span className="font-jetbrains text-[11px] uppercase tracking-widest text-white/40 block mb-8">
            For the dreamers. Fighters. Creators. Outsiders.
          </span>

          <button
            onClick={() => navigate('/collection')}
            className="inline-flex items-center gap-2 font-jetbrains text-xs uppercase tracking-widest text-white border-b border-white pb-1 hover:border-[#BC0100] hover:text-[#BC0100] transition-colors group"
          >
            EXPLORE THE COLLECTION <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </motion.div>

        {/* -------------------------------------------------------------
            ABOUT ZENJI FACTS SECTION (Scroll-triggered Stagger)
            ------------------------------------------------------------- */}
        <motion.section
          aria-labelledby="zenji-facts"
          className="mt-20 border-t border-white/10 pt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          <motion.h2
            id="zenji-facts"
            variants={lineVariants}
            className="font-anton text-2xl sm:text-3xl uppercase tracking-wide text-white mb-8"
          >
            About ZENJI
          </motion.h2>

          <dl className="space-y-6 font-ibm text-xs sm:text-sm text-white/70">
            {zenjiFacts.map((fact, idx) => (
              <motion.div
                key={idx}
                variants={factItemVariants}
                className="border-b border-white/5 pb-4 hover:border-white/20 transition-colors"
              >
                <dt className="font-jetbrains text-[10px] uppercase tracking-[0.25em] text-[#BC0100] mb-1">
                  {fact.label}
                </dt>
                <dd className="leading-relaxed text-white/80">{fact.value}</dd>
              </motion.div>
            ))}
          </dl>
        </motion.section>
      </motion.div>
    </main>
  );
};
