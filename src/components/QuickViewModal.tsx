import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, ArrowRight, Check } from 'lucide-react';

interface QuickViewModalProps {
  navigate: (path: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ navigate }) => {
  const { quickViewProduct, setQuickViewProduct, addToCart, setIsSizeGuideOpen } = useCart();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedImage(quickViewProduct.images.front);
      setSelectedSize(quickViewProduct.sizes[0] || 'M');
      setQuantity(1);
      setAddedAnimation(false);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const currentPrice = quickViewProduct.onSale && quickViewProduct.salePrice
    ? quickViewProduct.salePrice
    : quickViewProduct.price;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setQuickViewProduct(null);
    }, 600);
  };

  const imageList = [
    { label: 'Front', src: quickViewProduct.images.front },
    { label: 'Back', src: quickViewProduct.images.back },
    ...(quickViewProduct.images.side ? [{ label: 'Side', src: quickViewProduct.images.side }] : []),
    ...(quickViewProduct.images.graphic ? [{ label: 'Graphic', src: quickViewProduct.images.graphic }] : []),
    ...(quickViewProduct.images.model ? [{ label: 'Model', src: quickViewProduct.images.model }] : []),
  ];

  return (
    <div className="fixed inset-0 z-[99992] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#0D0D0D] border border-white/15 shadow-2xl overflow-hidden z-10 animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 bg-black/60 border border-white/10 text-white/70 hover:text-white hover:border-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image Viewer */}
          <div className="p-6 bg-black flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
            <div className="relative aspect-[3/4] w-full bg-[#181818] overflow-hidden border border-white/5">
              {quickViewProduct.onSale && (
                <span className="absolute top-3 left-3 z-10 bg-[#BC0100] text-white font-jetbrains text-[9px] font-bold px-2 py-0.5 uppercase tracking-widest">
                  SALE {quickViewProduct.discountPercent}% OFF
                </span>
              )}
              <img
                src={selectedImage || quickViewProduct.images.front}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover object-top transition-all duration-300"
              />
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {imageList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img.src)}
                  className={`relative w-14 h-16 flex-shrink-0 border overflow-hidden transition-all ${
                    selectedImage === img.src
                      ? 'border-[#BC0100] ring-1 ring-[#BC0100]'
                      : 'border-white/15 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[10px] font-jetbrains tracking-widest text-[#BC0100] uppercase block">
                COLLECTION // THE_ORIGIN_DROP
              </span>
              <h3 className="text-3xl font-anton uppercase tracking-wide text-white mt-1">
                {quickViewProduct.name}
              </h3>

              <div className="flex items-center gap-3 mt-3">
                <span className="text-2xl font-anton text-[#BC0100] tracking-wide">
                  {currentPrice}
                </span>
                {quickViewProduct.onSale && (
                  <span className="text-sm font-jetbrains text-white/40 line-through">
                    {quickViewProduct.price}
                  </span>
                )}
                <span className="text-[10px] font-jetbrains uppercase bg-white/10 px-2 py-0.5 text-white/70">
                  {quickViewProduct.colorway}
                </span>
              </div>

              <p className="font-ibm text-xs text-white/60 leading-relaxed mt-4">
                {quickViewProduct.description}
              </p>

              {/* Size Selector */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-jetbrains uppercase tracking-wider text-white font-bold">
                    SELECT SIZE
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[10px] font-jetbrains text-white/50 hover:text-white underline uppercase tracking-widest"
                  >
                    SIZE GUIDE
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[44px] h-10 px-3 font-jetbrains text-xs uppercase font-bold border transition-all ${
                        selectedSize === sz
                          ? 'bg-white text-black border-white'
                          : 'bg-black text-white/70 border-white/20 hover:border-white hover:text-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-6">
                <span className="text-xs font-jetbrains uppercase tracking-wider text-white font-bold block mb-2">
                  QUANTITY
                </span>
                <div className="inline-flex items-center border border-white/20 bg-black">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-white/60 hover:text-white transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-xs font-jetbrains font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-white/60 hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#BC0100] hover:bg-white hover:text-black text-white py-4 font-anton text-base uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-5 h-5" /> ADDED TO SECTOR CRATE
                  </>
                ) : (
                  <>ADD TO CRATE — {currentPrice}</>
                )}
              </button>

              <button
                onClick={() => {
                  setQuickViewProduct(null);
                  navigate(`/drop/${quickViewProduct.slug}`);
                }}
                className="w-full text-center text-xs font-jetbrains text-white/60 hover:text-white uppercase tracking-widest py-2 transition-colors flex items-center justify-center gap-1.5"
              >
                VIEW FULL ARCHIVE SPECS <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
