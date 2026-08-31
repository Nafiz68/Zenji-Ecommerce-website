import React, { useState } from 'react';
import { PRODUCTS, Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ArrowUpDown } from 'lucide-react';

interface CollectionPageProps {
  navigate: (path: string) => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({ navigate }) => {
  const [filter, setFilter] = useState<'ALL' | 'SALE' | 'FULL_PRICE'>('ALL');
  const [sort, setSort] = useState<'DEFAULT' | 'PRICE_ASC' | 'PRICE_DESC' | 'NAME'>('DEFAULT');

  // Filter products
  const filtered = PRODUCTS.filter((p) => {
    if (filter === 'SALE') return p.onSale;
    if (filter === 'FULL_PRICE') return !p.onSale;
    return true;
  });

  // Sort products
  const sorted: Product[] = [...filtered].sort((a, b) => {
    const priceA = a.onSale && a.salePriceNum ? a.salePriceNum : a.priceNum;
    const priceB = b.onSale && b.salePriceNum ? b.salePriceNum : b.priceNum;

    if (sort === 'PRICE_ASC') return priceA - priceB;
    if (sort === 'PRICE_DESC') return priceB - priceA;
    if (sort === 'NAME') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <main className="bg-white text-black min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-14">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-8 border-b border-black/15 gap-6">
          <div>
            <span className="font-jetbrains text-xs uppercase tracking-[0.3em] text-[#BC0100] block mb-2">
              COLLECTION // THE_ORIGIN_DROP
            </span>
            <h1 className="font-anton text-5xl sm:text-6xl md:text-8xl uppercase tracking-tight text-black leading-none">
              ALL DROPS
            </h1>
          </div>

          <p className="font-ibm text-xs text-gray-500 max-w-xs text-left md:text-right">
            10 limited edition pieces engineered in 240gsm luxury cotton. Final release — no restocks.
          </p>
        </div>

        {/* Filter & Sort Controls Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-gray-200">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-4 py-2 text-xs font-jetbrains uppercase tracking-wider transition-colors border ${
                filter === 'ALL'
                  ? 'bg-black text-white border-black'
                  : 'bg-transparent text-black border-gray-300 hover:border-black'
              }`}
            >
              ALL PIECES ({PRODUCTS.length})
            </button>
            <button
              onClick={() => setFilter('SALE')}
              className={`px-4 py-2 text-xs font-jetbrains uppercase tracking-wider transition-colors border ${
                filter === 'SALE'
                  ? 'bg-[#BC0100] text-white border-[#BC0100]'
                  : 'bg-transparent text-black border-gray-300 hover:border-[#BC0100] hover:text-[#BC0100]'
              }`}
            >
              ON SALE (15% OFF)
            </button>
            <button
              onClick={() => setFilter('FULL_PRICE')}
              className={`px-4 py-2 text-xs font-jetbrains uppercase tracking-wider transition-colors border ${
                filter === 'FULL_PRICE'
                  ? 'bg-black text-white border-black'
                  : 'bg-transparent text-black border-gray-300 hover:border-black'
              }`}
            >
              FULL ARCHIVE
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <ArrowUpDown className="w-4 h-4 text-gray-500" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="bg-white border border-gray-300 px-3 py-2 text-xs font-jetbrains uppercase tracking-wider text-black outline-none focus:border-black cursor-pointer w-full sm:w-auto"
            >
              <option value="DEFAULT">SORT: FEATURED</option>
              <option value="PRICE_ASC">PRICE: LOW TO HIGH</option>
              <option value="PRICE_DESC">PRICE: HIGH TO LOW</option>
              <option value="NAME">ALPHABETICAL (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {sorted.map((product) => (
            <ProductCard key={product.id} product={product} navigate={navigate} />
          ))}
        </div>

        {/* Archive Guarantee Callout */}
        <div className="mt-20 p-8 bg-black text-white border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-jetbrains text-[10px] tracking-widest text-[#BC0100] uppercase block">
              POLICY // ZERO RESTOCKS
            </span>
            <h3 className="font-anton text-2xl uppercase tracking-wider text-white mt-1">
              THE ZENJI ARCHIVE COMMITMENT
            </h3>
            <p className="font-ibm text-xs text-white/60 mt-1 max-w-xl">
              Each garment in The Origin Drop is limited to a single manufacturing run. Once sold out, designs are archived permanently in the vault.
            </p>
          </div>
          <button
            onClick={() => navigate('/our-story')}
            className="shrink-0 px-6 py-3 border border-white text-xs font-jetbrains uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
          >
            LEARN MORE →
          </button>
        </div>
      </div>
    </main>
  );
};
