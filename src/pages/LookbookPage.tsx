import React, { useState } from 'react';
import { LOOKBOOK_ITEMS, LookbookItem } from '../data/products';

interface LookbookPageProps {
  navigate: (path: string) => void;
}

export const LookbookPage: React.FC<LookbookPageProps> = ({ navigate }) => {
  const [filter, setFilter] = useState<'ALL' | 'FRONT' | 'BACK' | 'ON MODEL'>('ALL');

  const filteredItems: LookbookItem[] = LOOKBOOK_ITEMS.filter((item) => {
    if (filter === 'ALL') return true;
    return item.category === filter;
  });

  return (
    <main className="bg-white text-black min-h-screen">
      {/* -------------------------------------------------------------
          1. EDITORIAL HEADER (Dark Cyber-Ronin Banner)
          ------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-black text-white py-24 md:py-32 px-6 md:px-14 border-b border-white/10">
        <div className="relative z-10 mx-auto max-w-[1440px]">
          <span className="font-jetbrains text-[10px] md:text-[11px] tracking-[0.4em] text-[#BC0100] uppercase block mb-4">
            THE_ORIGIN_DROP // EDITORIAL
          </span>

          <h1 className="font-anton uppercase leading-[0.85] text-5xl sm:text-7xl md:text-8xl lg:text-[110px] text-white">
            <span className="block">ANIME STREETWEAR —</span>
            <span className="block text-white/90">LOOK BOOK</span>
          </h1>

          <p className="font-ibm text-xs sm:text-sm text-white/50 mt-6 max-w-md">
            The Origin Drop, The Full Visual Archive. Japanese minimalism meets aggressive high-contrast streetwear.
          </p>

          <div className="relative z-10 mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t border-white/10 pt-6 font-jetbrains text-xs text-white/40">
            <span>10 PIECES // THE_ORIGIN_DROP</span>
            <span>ANIME STREETWEAR // AUSTRALIA</span>
          </div>
        </div>

        {/* Ambient Big Year Number in Background */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 font-anton text-[220px] text-white/[0.03] select-none hidden lg:block"
        >
          2026
        </span>
      </section>

      {/* -------------------------------------------------------------
          2. STICKY FILTER BAR
          ------------------------------------------------------------- */}
      <div className="sticky top-[68px] z-30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black bg-white py-4 px-6 md:px-14 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {(['ALL', 'FRONT', 'BACK', 'ON MODEL'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`flex min-h-[40px] items-center border px-4 py-1.5 text-[11px] font-jetbrains uppercase tracking-wider transition-colors ${
                filter === cat
                  ? 'bg-black text-white border-black font-bold'
                  : 'bg-transparent text-black border-black/20 hover:border-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="font-jetbrains text-[11px] uppercase tracking-widest text-black/50">
          {filteredItems.length} IMAGES
        </span>
      </div>

      {/* -------------------------------------------------------------
          3. MASONRY LOOKBOOK GALLERY
          ------------------------------------------------------------- */}
      <section className="bg-white py-12 px-6 md:px-14">
        <div className="mx-auto max-w-[1440px]">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/drop/${item.productId}`)}
                className="group relative block overflow-hidden bg-black border border-black/10 hover:border-black cursor-pointer break-inside-avoid shadow-sm"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={`ZENJI ${item.productName}, ${item.category}`}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 bg-black/0 transition-colors duration-300 group-hover:bg-black/75">
                  {/* Top Tag */}
                  <span className="font-jetbrains text-[10px] uppercase font-bold tracking-widest text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[#BC0100] px-2 py-0.5 w-fit">
                    {item.tag}
                  </span>

                  {/* Bottom Text Slide-up */}
                  <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-anton text-2xl uppercase tracking-wider text-white">
                      {item.productName}
                    </p>
                    <p className="font-jetbrains text-[11px] text-white/60 uppercase tracking-widest mt-0.5">
                      VIEW: {item.category}
                    </p>
                    <p className="font-jetbrains text-xs font-bold text-[#BC0100] uppercase tracking-wider mt-3">
                      VIEW PRODUCT →
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
