import React from 'react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  navigate: (path: string) => void;
  dark?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, navigate, dark = false }) => {
  const { setQuickViewProduct } = useCart();

  const handleCardClick = (e: React.MouseEvent) => {
    // If user clicked the quick view button, don't navigate
    if ((e.target as HTMLElement).closest('.quick-view-btn')) {
      return;
    }
    navigate(`/drop/${product.slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group relative flex flex-col overflow-hidden cursor-pointer transition-all duration-300 border ${
        dark
          ? 'bg-[#121212] border-white/10 hover:border-white'
          : 'bg-white border-black/10 hover:border-black shadow-sm hover:shadow-md'
      }`}
    >
      {/* Aspect Ratio Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EAE8E3]">
        {/* Sale Ribbon / Badge */}
        {product.onSale && (
          <span
            style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              position: 'absolute',
              top: '22px',
              left: '-30px',
              width: '120px',
              padding: '4px 0',
              transform: 'rotate(-45deg)',
              textAlign: 'center',
              fontSize: '9px',
              fontWeight: 'bold',
              backgroundColor: '#BC0100',
              color: '#ffffff',
              letterSpacing: '0.5px',
              zIndex: 20,
            }}
            className="uppercase shadow-md select-none pointer-events-none"
          >
            SALE {product.discountPercent || 15}% OFF
          </span>
        )}

        {product.badge === 'LIMITED' && !product.onSale && (
          <div className="absolute top-3 right-3 z-20">
            <span className="bg-black/90 text-white font-jetbrains text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest border border-white/20">
              LIMITED
            </span>
          </div>
        )}

        {/* Front Image */}
        <img
          src={product.images.front}
          alt={`ZENJI ${product.name}, front view`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top opacity-100 transition-opacity duration-300 group-hover:opacity-0"
        />

        {/* Back Image (Revealed on Hover) */}
        <img
          src={product.images.back}
          alt={`ZENJI ${product.name}, back view`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Quick View Button Slide-Up Trigger */}
        <div
          className="absolute bottom-0 left-0 z-30 flex h-11 w-full translate-y-full items-center justify-center transition-transform duration-300 group-hover:translate-y-0 bg-black/90 backdrop-blur-sm quick-view-btn"
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
        >
          <span className="font-jetbrains text-[11px] uppercase tracking-widest text-white hover:text-[#BC0100] transition-colors flex items-center gap-1">
            QUICK VIEW →
          </span>
        </div>
      </div>

      {/* Product Metadata Bar */}
      <div className={`p-4 border-t ${dark ? 'border-white/10 bg-[#0E0E0E]' : 'border-black bg-white'}`}>
        <span
          className={`block truncate text-sm font-anton uppercase tracking-widest transition-colors ${
            dark ? 'text-white group-hover:text-[#BC0100]' : 'text-black group-hover:text-[#BC0100]'
          }`}
        >
          {product.name}
        </span>

        <div className="mt-2 flex flex-col gap-0.5">
          {product.onSale && product.salePrice ? (
            <div className="flex items-baseline gap-2.5">
              <span className="font-anton text-2xl leading-none tracking-wide text-[#BC0100]">
                {product.salePrice}
              </span>
              <span className="font-jetbrains text-xs tracking-wider text-gray-400 line-through">
                {product.price}
              </span>
            </div>
          ) : (
            <span
              className={`font-anton text-2xl leading-none tracking-wide ${
                dark ? 'text-white' : 'text-black'
              }`}
            >
              {product.price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
