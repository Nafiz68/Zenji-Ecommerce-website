import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { BRAND } from '../brand';

interface OurStoryPageProps {
  navigate: (path: string) => void;
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({ navigate }) => {
  const brandFacts = [
    {
      label: 'What we are',
      value: `${BRAND.name} is an Australian online store for original graphic tees.`,
    },
    {
      label: 'Founded',
      value: '[Founding story — to be written]',
    },
    {
      label: 'What we make',
      value: 'Graphic tees in heavyweight cotton, printed in small batches. [Fabric weight — to be confirmed]',
    },
    {
      label: 'Shipping',
      value: 'We ship Australia-wide. [Delivery times and free-shipping threshold — to be confirmed]',
    },
    {
      label: 'Print runs',
      value: 'Each design is printed in a small run. When a run sells out, we decide whether to print it again.',
    },
    {
      label: 'Pricing',
      value: '[Pricing — to be confirmed]',
    },
    {
      label: 'Design',
      value: 'Every design is our own, drawn in-house.',
    },
    {
      label: 'Fit',
      value: 'A relaxed everyday fit. Check the size guide on each product page.',
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
      <motion.div
        className="mx-auto max-w-[760px] relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Brand Header */}
        <motion.div variants={lineVariants} className="flex items-center gap-3 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-sans text-[11px] tracking-[0.3em] text-accent uppercase block">
            ABOUT {BRAND.name}
          </span>
        </motion.div>

        {/* Animated Red Line Separator */}
        <motion.span
          aria-hidden="true"
          className="my-4 block h-0.5 w-12 bg-accent origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Kinetic Hero Headline */}
        <h1 className="font-display uppercase leading-[0.88] text-4xl sm:text-6xl md:text-7xl text-white mb-10 overflow-hidden">
          <motion.span variants={lineVariants} className="block">
            ORIGINAL GRAPHIC TEES —
          </motion.span>
          <motion.span variants={lineVariants} className="block text-white/90">
            MADE FOR
          </motion.span>
          <motion.span variants={lineVariants} className="block text-accent">
            EVERYDAY WEAR.
          </motion.span>
        </h1>

        {/* Narrative Copy with Staggered Fade Up */}
        <motion.div variants={containerVariants} className="space-y-6 font-sans text-sm md:text-base leading-relaxed text-white/75">
          <motion.p variants={fadeUpVariants}>
            {BRAND.name} makes graphic tees we actually want to wear, and sells them online across Australia.
          </motion.p>
          <motion.p variants={fadeUpVariants}>
            We draw every design ourselves and print it on heavyweight cotton, in small batches, so each run gets proper attention.
          </motion.p>
          <motion.p variants={fadeUpVariants}>
            No gimmicks. Just good tees, made carefully, that get better the more you wear them.
          </motion.p>
        </motion.div>

        {/* Highlight Blockquote with Animated Left Border */}
        <motion.blockquote
          variants={fadeUpVariants}
          className="my-10 border-l-2 border-accent pl-6 font-sans text-sm sm:text-base italic leading-relaxed text-white/85 bg-white/[0.02] py-5 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          [Founding story — to be written]
        </motion.blockquote>

        <motion.p variants={fadeUpVariants} className="font-sans text-sm md:text-base text-white/75 mb-10 leading-relaxed">
          If a tee doesn't feel right after a few washes, we haven't done our job.
        </motion.p>

        {/* Manifesto Slogan */}
        <motion.div variants={lineVariants}>
          <p className="font-display text-2xl sm:text-3xl md:text-4xl uppercase leading-tight text-white mb-8">
            Fewer things, made properly. <span className="text-accent">That's the idea.</span>
          </p>

          <span className="font-sans text-[11px] uppercase tracking-widest text-white/40 block mb-8">
            Designed and shipped from Australia.
          </span>

          <button
            onClick={() => navigate('/collection')}
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-white border-b border-white pb-1 hover:border-accent hover:text-accent transition-colors group"
          >
            EXPLORE THE COLLECTION <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </motion.div>

        {/* -------------------------------------------------------------
            ABOUT FACTS SECTION (Scroll-triggered Stagger)
            ------------------------------------------------------------- */}
        <motion.section
          aria-labelledby="brand-facts"
          className="mt-20 border-t border-white/10 pt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          <motion.h2
            id="brand-facts"
            variants={lineVariants}
            className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-white mb-8"
          >
            About {BRAND.name}
          </motion.h2>

          <dl className="space-y-6 font-sans text-xs sm:text-sm text-white/70">
            {brandFacts.map((fact, idx) => (
              <motion.div
                key={idx}
                variants={factItemVariants}
                className="border-b border-white/5 pb-4 hover:border-white/20 transition-colors"
              >
                <dt className="font-sans text-[10px] uppercase tracking-[0.25em] text-accent mb-1">
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
