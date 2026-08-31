import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const dropsScrollRef = useRef<HTMLDivElement>(null);

  const scrollDrops = (direction: 'left' | 'right') => {
    if (dropsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      dropsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // 4 Featured Sale Showcase Cards in exact order matching live site
  const showcaseProducts = [
    PRODUCTS.find((p) => p.id === 'demon-blood-tee') || PRODUCTS[1],
    PRODUCTS.find((p) => p.id === 'blue-flame-tee') || PRODUCTS[0],
    PRODUCTS.find((p) => p.id === 'will-of-the-sun-tee') || PRODUCTS[2],
    PRODUCTS.find((p) => p.id === 'warrior-spirit-tee') || PRODUCTS[3],
  ];

  return (
    <main className="relative bg-black text-white w-full overflow-hidden">
      {/* -------------------------------------------------------------
          1. HERO SECTION
          ------------------------------------------------------------- */}
      <section
        id="hero-section"
        className="relative h-[85vh] md:h-[calc(100vh-40px)] w-full overflow-hidden bg-black flex items-end justify-start"
        style={{ marginTop: '-68px' }}
      >
        {/* Background Media with Dark Dramatic Gradients */}
        <div className="hero-media absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-60 mix-blend-luminosity scale-105 transition-transform duration-1000"
            style={{
              backgroundImage: `url('https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Blue-flame-5.webp')`,
              backgroundPosition: 'center 25%',
            }}
          />
        </div>

        {/* Ambient Dark Gradients */}
        <div
          className="pointer-events-none absolute inset-0 z-1"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.4) 100%)',
          }}
        />

        {/* Left Bottom Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-14 pb-16 md:pb-24">
          <div className="max-w-2xl">
            {/* Blinking Live System Beacon */}
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#BC0100] animate-pulse-slow shadow-[0_0_10px_#BC0100]" />
              <span className="font-jetbrains text-[11px] font-bold tracking-[0.3em] text-[#BC0100] uppercase flex items-center gap-1">
                SYSTEM // ZENJI
                <span className="animate-ping ml-1 inline-block h-1 w-1 rounded-full bg-[#BC0100]" />
              </span>
            </div>

            {/* Kinetic Title */}
            <h1 className="font-anton uppercase leading-[0.85] text-6xl sm:text-7xl md:text-8xl lg:text-[100px] tracking-tight">
              <span>WEAR YOUR</span>
              <br />
              <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                STORY
              </span>
            </h1>

            {/* CTA Button */}
            <div className="hero-buttons mt-8">
              <button
                onClick={() => navigate('/drop')}
                className="inline-flex items-center gap-2 rounded-none bg-[#BC0100] px-8 md:px-10 py-4 font-anton text-base md:text-lg uppercase text-white transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(188,1,0,0.6)] group"
              >
                SHOP THE DROP
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          2. FOUR WORLDS / ABOUT SPLIT SECTION
          ------------------------------------------------------------- */}
      <section id="four-worlds" className="relative bg-black text-white border-y border-white/10">
        <div className="flex flex-col md:flex-row min-h-[75vh]">
          {/* Left Media Column */}
          <div className="relative w-full md:w-1/2 min-h-[380px] md:min-h-full overflow-hidden bg-[#0A0A0A]">
            <img
              src="https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Warrior-spirit-1.webp"
              alt="ZENJI Cyber Ronin Art"
              className="absolute inset-0 h-full w-full object-cover object-center filter brightness-75 contrast-110 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/90 hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent md:hidden" />
          </div>

          {/* Right Content Column with Kinetic Framer Motion Text */}
          <div className="flex w-full md:w-1/2 flex-col justify-center px-6 md:px-16 py-16 md:py-24 bg-black">
            <motion.div
              className="max-w-[480px]"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#BC0100] animate-pulse" />
                <span className="font-jetbrains text-[11px] tracking-widest text-[#BC0100] uppercase block">
                  ABOUT // ZENJI
                </span>
              </div>
              <motion.span
                aria-hidden="true"
                className="my-4 block h-0.5 w-10 bg-[#BC0100] origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
              />

              <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl uppercase leading-[0.88] text-white mb-6">
                BORN FROM THE <br />
                <span className="text-[#BC0100]">WARRIOR SPIRIT.</span>
              </h2>

              <p className="font-ibm text-[13px] leading-relaxed text-white/70 mb-4">
                ZENJI began with one belief: what you wear should tell a story.
              </p>

              <p className="font-ibm text-[12px] leading-relaxed text-white/50 mb-4">
                Inspired by samurai discipline, anime art and modern street culture, we create premium streetwear for those who choose their own path.
              </p>

              <p className="font-ibm text-[12px] leading-relaxed text-white/50 mb-6">
                Every ZENJI piece combines Japanese-inspired artwork, powerful symbolism and oversized silhouettes to express courage, creativity and individuality.
              </p>

              <blockquote className="font-ibm text-[13px] italic leading-relaxed text-white/70 border-l-2 border-[#BC0100] pl-4 mb-6 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#BC0100]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                "The warrior within refuses to fade into the crowd."
              </blockquote>

              <p className="font-jetbrains text-[10px] uppercase tracking-widest text-white/35 mb-8">
                For the dreamers. Fighters. Creators. Outsiders.
              </p>

              <button
                onClick={() => navigate('/collection')}
                className="font-jetbrains text-xs uppercase tracking-widest text-white border-b border-white pb-1 transition-colors hover:border-[#BC0100] hover:text-[#BC0100] inline-flex items-center gap-1.5 group"
              >
                EXPLORE THE COLLECTION <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          3. ORIGIN DROP / SALE SHOWCASE (Authentic Stackup Animation)
          ------------------------------------------------------------- */}
      <section id="drop-showcase" className="bg-white text-black pt-12 pb-4 relative overflow-hidden">
        {/* Header Bar */}
        <div className="mx-auto max-w-[1440px] px-6 md:px-14 flex items-end justify-between gap-6 mb-10">
          <div>
            <span className="font-jetbrains text-xs uppercase tracking-widest text-[#BC0100] block">
              COLLECTION // THE_ORIGIN_DROP
            </span>
            <h2 className="mt-2 font-anton text-5xl md:text-7xl uppercase leading-[0.88] tracking-tight text-black">
              SALE
            </h2>
          </div>

          <button
            onClick={() => navigate('/collection')}
            className="shrink-0 whitespace-nowrap border border-black px-6 py-3 font-jetbrains text-xs uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-white"
          >
            VIEW_ALL
          </button>
        </div>

        {/* Stackup Deck Container using @react-bits/ScrollStack-JS-CSS */}
        <div className="mx-auto max-w-[1040px] px-4 md:px-8">
          <ScrollStack
            useWindowScroll={true}
            itemDistance={30}
            itemStackDistance={36}
            itemScale={0.025}
            stackPosition="14%"
            scaleEndPosition="8%"
            baseScale={0.93}
            className="w-full"
          >
            {showcaseProducts.map((prod, index) => (
              <ScrollStackItem key={prod.id} itemClassName="relative">
                <article
                  onClick={() => navigate(`/drop/${prod.slug}`)}
                  className="relative mx-auto overflow-hidden bg-black border border-white/12 cursor-pointer group shadow-[0_20px_60px_rgba(0,0,0,0.65)]"
                  style={{
                    height: 'min(780px, 74vh)',
                    width: '100%',
                    maxWidth: '1000px',
                    borderTop: '4px solid #BC0100',
                  }}
                >
                  {/* Product Graphic Background Image */}
                  <img
                    src={prod.images.graphic || prod.images.front}
                    alt={`ZENJI ${prod.name} anime streetwear graphic`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-[center_20%] opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Top-right card badge */}
                  <div className="absolute top-4 right-5 z-20 font-jetbrains text-[10px] uppercase tracking-widest text-white/50 bg-black/60 px-2 py-0.5 border border-white/10">
                    0{index + 1} // 04
                  </div>

                  {/* Gradient info overlay at bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-10"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 55%, transparent 100%)',
                    }}
                  >
                    <span className="font-jetbrains text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[#BC0100] block">
                      COLLECTION <span className="text-white/45">// THE_ORIGIN_DROP</span>
                    </span>

                    <a
                      href={`/drop/${prod.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/drop/${prod.slug}`);
                      }}
                      className="font-anton text-3xl sm:text-4xl md:text-5xl uppercase leading-[0.9] text-white mt-2 block hover:text-[#BC0100] transition-colors"
                    >
                      {prod.name}
                    </a>

                    <div className="flex items-center gap-3 mt-3">
                      <span className="font-anton text-2xl text-[#BC0100] leading-none">
                        {prod.salePrice || prod.price}
                      </span>
                      {prod.onSale && (
                        <span className="font-jetbrains text-xs text-white/40 line-through">
                          {prod.price}
                        </span>
                      )}
                    </div>

                    <a
                      href={`/drop/${prod.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/drop/${prod.slug}`);
                      }}
                      className="mt-6 inline-block font-jetbrains text-xs uppercase tracking-widest text-white border-b border-white/80 pb-1 hover:border-[#BC0100] hover:text-[#BC0100] transition-colors"
                    >
                      SHOP {prod.name} →
                    </a>
                  </div>
                </article>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </section>

      {/* -------------------------------------------------------------
          4. LATEST DROPS (Horizontal Scroller & Product Grid)
          ------------------------------------------------------------- */}
      <section id="latest-drops" className="bg-[#FAF8F4] text-black pt-10 pb-16 border-t border-black/10 relative">
        {/* Header Bar */}
        <div className="mx-auto max-w-[1440px] px-6 md:px-14 flex items-end justify-between gap-6 mb-8">
          <div>
            <span className="font-jetbrains text-xs uppercase tracking-widest text-[#BC0100] block">
              COLLECTION // THE_ORIGIN_DROP
            </span>
            <h2 className="mt-2 font-anton text-5xl md:text-7xl uppercase leading-[0.88] tracking-tight text-black">
              LATEST_DROPS
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex gap-1.5 mr-3">
              <button
                onClick={() => scrollDrops('left')}
                className="w-10 h-10 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollDrops('right')}
                className="w-10 h-10 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => navigate('/drop')}
              className="shrink-0 whitespace-nowrap border border-black px-6 py-3 font-jetbrains text-xs uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-white"
            >
              VIEW_ALL
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div className="relative w-full">
          <div
            ref={dropsScrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto px-6 md:px-14 pb-8 no-scrollbar snap-x snap-mandatory"
          >
            {PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="w-[280px] sm:w-[320px] md:w-[340px] flex-none snap-start"
              >
                <ProductCard product={prod} navigate={navigate} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          5. MANIFESTO / THE ZENJI ETHOS SECTION
          ------------------------------------------------------------- */}
      <section
        id="ethos-section"
        aria-label="The ZENJI Ethos"
        className="relative overflow-hidden bg-black py-28 px-6 md:px-14 border-t border-white/10"
      >
        {/* Background Image with Dark Contrast Overlay */}
        <img
          src="https://res.cloudinary.com/diqbikizp/image/upload/f_auto,q_auto/zenji/products/Demon-blood-5.webp"
          alt="ZENJI Manifesto backdrop"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-30 mix-blend-luminosity filter contrast-125"
        />
        <div className="ethos-overlay" aria-hidden="true" />

        {/* Text Content */}
        <div className="relative z-10 mx-auto max-w-[1440px]">
          <div className="max-w-2xl">
            <span className="font-jetbrains text-[11px] tracking-[0.3em] text-[#BC0100] uppercase block">
              MANIFESTO_001
            </span>
            <div className="my-4 h-0.5 w-12 bg-[#BC0100]" aria-hidden="true" />

            <h2 className="font-anton text-5xl sm:text-6xl md:text-7xl uppercase leading-[0.88] text-white mb-6">
              <span>THE </span>
              <span className="text-[#BC0100]">ZENJI </span>
              <span>ETHOS</span>
            </h2>

            <p className="font-ibm text-sm sm:text-base leading-relaxed text-white/80 max-w-xl">
              We exist at the intersection of technical precision and cultural expression. Our garments are engineered for those navigating an increasingly fragmented world, built from Japanese craftsmanship, anime culture and modern Australian streetwear.
            </p>

            <div className="mt-8">
              <button
                onClick={() => navigate('/our-story')}
                className="inline-flex items-center gap-2 font-jetbrains text-xs uppercase tracking-widest text-white border-b border-white pb-1 hover:border-[#BC0100] hover:text-[#BC0100] transition-colors"
              >
                READ THE FULL STORY →
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
