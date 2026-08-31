import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, Product } from '../data/products';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  navigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ navigate }) => {
  const { isSearchOpen, setIsSearchOpen } = useCart();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts: Product[] = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.colorway.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.badge && p.badge.toLowerCase().includes(q))
        );
      })
    : PRODUCTS;

  const handleSelectProduct = (slug: string) => {
    setIsSearchOpen(false);
    navigate(`/drop/${slug}`);
  };

  const quickTags = ['SALE 15% OFF', 'BLUE FLAME', 'DEMON BLOOD', 'WARRIOR SPIRIT', 'BUSHIDO', 'LIMITLESS'];

  return (
    <div className="fixed inset-0 z-[99993] flex flex-col items-center justify-start pt-16 px-4 md:px-8">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Container */}
      <div className="relative w-full max-w-3xl bg-[#0C0C0C] border border-white/15 shadow-2xl overflow-hidden z-10 animate-scaleUp">
        {/* Search Header */}
        <div className="p-4 md:p-6 border-b border-white/10 flex items-center gap-3 bg-black">
          <Search className="w-6 h-6 text-[#BC0100] flex-shrink-0" />
          <input
            ref={inputRef}
            type="search"
            placeholder="SEARCH DROPS, COLORWAYS, DESIGNS..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white font-jetbrains text-sm md:text-base outline-none tracking-wider placeholder:text-white/30"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-white/40 hover:text-white p-1"
            >
              CLEAR
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-white/60 hover:text-white border border-white/10 hover:border-white transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Tag Pills */}
        <div className="px-6 py-3 bg-[#141414] border-b border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-jetbrains tracking-widest text-white/40 uppercase">
            QUICK TAGS:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="text-[10px] font-jetbrains uppercase px-2.5 py-1 bg-white/5 border border-white/15 hover:border-[#BC0100] hover:text-[#BC0100] transition-colors text-white/70"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 md:p-6 space-y-3">
          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-white/50 font-jetbrains text-xs">
              NO DROPS FOUND MATCHING "{query.toUpperCase()}".
            </div>
          ) : (
            filteredProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => handleSelectProduct(prod.slug)}
                className="flex items-center justify-between p-3 bg-black border border-white/10 hover:border-white transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-16 bg-[#161616] overflow-hidden border border-white/5 flex-shrink-0">
                    <img
                      src={prod.images.front}
                      alt={prod.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-anton text-base uppercase text-white group-hover:text-[#BC0100] transition-colors">
                        {prod.name}
                      </h4>
                      {prod.onSale && (
                        <span className="text-[9px] font-jetbrains font-bold bg-[#BC0100] text-white px-1.5 py-0.2 uppercase">
                          SALE
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-jetbrains text-white/40 uppercase block mt-0.5">
                      {prod.colorway} • 240GSM COTTON
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="font-anton text-base text-white block">
                      {prod.onSale && prod.salePrice ? prod.salePrice : prod.price}
                    </span>
                    {prod.onSale && (
                      <span className="text-[10px] font-jetbrains text-white/40 line-through block">
                        {prod.price}
                      </span>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
