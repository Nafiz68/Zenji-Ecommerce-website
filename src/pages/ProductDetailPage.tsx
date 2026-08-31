import React, { useState, useEffect } from 'react';
import { PRODUCTS, Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { Plus, Minus, Check, ChevronDown, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, navigate }) => {
  const { addToCart, setIsSizeGuideOpen } = useCart();
  const product: Product = PRODUCTS.find((p) => p.slug === slug || p.id === slug) || PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState<string>(product.images.front);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  // Accordion states
  const [openAccordion, setOpenAccordion] = useState<string>('details');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImage(product.images.front);
    setSelectedSize(product.sizes[0] || 'M');
    setQuantity(1);
    setAddedAnimation(false);
  }, [slug, product]);

  const imageList = [
    { label: 'Front', src: product.images.front },
    { label: 'Back', src: product.images.back },
    ...(product.images.side ? [{ label: 'Side', src: product.images.side }] : []),
    ...(product.images.graphic ? [{ label: 'Graphic', src: product.images.graphic }] : []),
    ...(product.images.model ? [{ label: 'Model', src: product.images.model }] : []),
  ];

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 800);
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const displayPrice = product.onSale && product.salePrice ? product.salePrice : product.price;

  return (
    <main className="min-h-screen bg-white text-black pb-20 pt-8 md:pt-12">
      <div className="mx-auto max-w-[1440px] px-6 md:px-14">
        {/* Back Link */}
        <button
          onClick={() => navigate('/collection')}
          className="mb-8 inline-block font-jetbrains text-xs uppercase tracking-widest text-black/50 hover:text-black transition-colors"
        >
          ← BACK TO COLLECTION
        </button>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
          {/* -------------------------------------------------------------
              LEFT: MULTI-IMAGE GALLERY (7 cols on desktop)
              ------------------------------------------------------------- */}
          <div className="md:col-span-7 flex flex-col gap-4">
            {/* Primary Large Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EAE8E3] border border-black/10 shadow-sm">
              {product.onSale && (
                <span
                  style={{
                    fontFamily: 'var(--font-jetbrains), monospace',
                    position: 'absolute',
                    top: '24px',
                    left: '-32px',
                    width: '128px',
                    padding: '5px 0',
                    transform: 'rotate(-45deg)',
                    textAlign: 'center',
                    fontSize: '9px',
                    fontWeight: 'bold',
                    backgroundColor: '#BC0100',
                    color: '#fff',
                    letterSpacing: '0.5px',
                    zIndex: 20,
                  }}
                  className="uppercase select-none"
                >
                  SALE {product.discountPercent}% OFF
                </span>
              )}

              <img
                src={selectedImage}
                alt={product.name}
                className="h-full w-full object-cover object-top transition-opacity duration-300"
              />

              <span className="pointer-events-none absolute bottom-4 right-4 bg-black/60 px-2.5 py-1 font-jetbrains text-[9px] text-white">
                SCROLL TO BROWSE ↕
              </span>
            </div>

            {/* Thumbnails Row */}
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {imageList.map((img, idx) => {
                const isSelected = selectedImage === img.src;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img.src)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden border transition-all ${
                      isSelected
                        ? 'border-black ring-2 ring-black'
                        : 'border-black/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={`${product.name} angle ${idx + 1}`}
                      className="h-full w-full object-cover object-top"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* -------------------------------------------------------------
              RIGHT: PRODUCT ORDER & DETAILS (5 cols on desktop)
              ------------------------------------------------------------- */}
          <div className="md:col-span-5 flex flex-col justify-start space-y-6">
            {/* Header */}
            <div>
              <span className="font-jetbrains text-xs font-bold uppercase tracking-[0.25em] text-[#BC0100] block">
                COLLECTION // THE_ORIGIN_DROP
              </span>

              <h1 className="font-anton text-4xl sm:text-5xl uppercase tracking-tight text-black mt-2 leading-none">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-anton text-3xl text-[#BC0100] tracking-wide">
                  {displayPrice}
                </span>
                {product.onSale && (
                  <span className="font-jetbrains text-sm text-gray-400 line-through">
                    {product.price}
                  </span>
                )}
                <span className="font-jetbrains text-xs uppercase bg-black/5 px-2 py-0.5 text-black/70">
                  {product.colorway}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="font-ibm text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-b border-gray-100 py-4">
              {product.description}
            </p>

            {/* Size Variant Selector */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <span className="font-jetbrains text-xs font-bold uppercase tracking-wider text-black">
                  SIZE: <span className="text-[#BC0100]">{selectedSize}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="font-jetbrains text-xs text-gray-500 hover:text-black underline uppercase tracking-widest"
                >
                  SIZE GUIDE
                </button>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`h-12 font-jetbrains text-xs uppercase font-bold border transition-all ${
                        isSelected
                          ? 'bg-black text-white border-black shadow-md'
                          : 'bg-white text-black border-gray-300 hover:border-black'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <span className="font-jetbrains text-xs font-bold uppercase tracking-wider text-black block mb-2">
                QUANTITY
              </span>
              <div className="inline-flex items-center border border-black bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-black hover:bg-black hover:text-white transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 font-jetbrains text-sm font-bold text-black">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-black hover:bg-black hover:text-white transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full bg-[#BC0100] hover:bg-black text-white py-4 px-6 font-anton text-lg uppercase tracking-wider transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-5 h-5" /> ADDED TO SECTOR CRATE
                  </>
                ) : (
                  <>ADD TO CRATE — {displayPrice}</>
                )}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 py-4 border-t border-gray-200 text-center font-jetbrains text-[10px] text-gray-500 uppercase">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#BC0100]" />
                <span>AU EXPRESS SHIP</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#BC0100]" />
                <span>240GSM COTTON</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-[#BC0100]" />
                <span>ZERO RESTOCKS</span>
              </div>
            </div>

            {/* -------------------------------------------------------------
                ACCORDION SPECIFICATIONS
                ------------------------------------------------------------- */}
            <div className="border-t border-gray-200 divide-y divide-gray-200 pt-2 font-jetbrains">
              {/* 01. Product Details */}
              <div>
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'details' ? '' : 'details')}
                  className="w-full py-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-black"
                >
                  <span>01 // PRODUCT DETAILS</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordion === 'details' ? 'rotate-180 text-[#BC0100]' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'details' && (
                  <ul className="pb-4 space-y-1.5 font-ibm text-xs text-gray-600 list-disc list-inside">
                    {product.details.map((dt, i) => (
                      <li key={i}>{dt}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* 02. Shipping & Delivery */}
              <div>
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? '' : 'shipping')}
                  className="w-full py-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-black"
                >
                  <span>02 // SHIPPING & DELIVERY</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordion === 'shipping' ? 'rotate-180 text-[#BC0100]' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pb-4 space-y-2 font-ibm text-xs text-gray-600 leading-relaxed">
                    <p>• <strong>Free Australia-wide shipping</strong> on orders over A$150.</p>
                    <p>• Standard domestic delivery: 5-10 business days via Australia Post.</p>
                    <p>• Tracking number provided via email upon dispatch from our Australian hub.</p>
                  </div>
                )}
              </div>

              {/* 03. Archive & Restock Policy */}
              <div>
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'restocks' ? '' : 'restocks')}
                  className="w-full py-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-black"
                >
                  <span>03 // NO RESTOCKS COMMITMENT</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordion === 'restocks' ? 'rotate-180 text-[#BC0100]' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'restocks' && (
                  <div className="pb-4 font-ibm text-xs text-gray-600 leading-relaxed">
                    ZENJI pieces are strictly limited. Once a drop sells out, it will never be reproduced. All pieces are final release.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            YOU MIGHT ALSO LIKE (Related Products)
            ------------------------------------------------------------- */}
        <section className="mt-28 border-t border-black/10 pt-16">
          <div className="mb-10">
            <span className="font-jetbrains text-xs uppercase tracking-[0.3em] text-[#BC0100] block mb-1">
              SECTOR RECOMMENDATIONS
            </span>
            <h2 className="font-anton text-4xl uppercase text-black">
              YOU MIGHT ALSO LIKE
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} navigate={navigate} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
