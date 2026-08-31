import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

interface CartDrawerProps {
  navigate: (path: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ navigate }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    totalItems,
    freeShippingThreshold,
    freeShippingProgress,
    addToast,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isCartOpen) return null;

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'ZENJI10' || cleanCode === 'AWAKENING15' || cleanCode === 'ORIGIN15') {
      const pct = cleanCode === 'ZENJI10' ? 0.10 : 0.15;
      const discount = subtotal * pct;
      setDiscountAmount(discount);
      setAppliedPromo(cleanCode);
      addToast('PROMO CODE APPLIED', `${cleanCode} (15% OFF SAVED A$${discount.toFixed(2)})`);
    } else {
      addToast('INVALID PROMO CODE', 'Try code "AWAKENING15" or "ZENJI10"', 'error');
    }
  };

  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      addToast('SIMULATED CHECKOUT', 'Sector payload confirmed! Thank you for supporting ZENJI.', 'success');
      clearCart();
      setIsCartOpen(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[99990] overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      />

      {/* Drawer panel */}
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-6">
        <div className="w-screen max-w-md bg-[#0A0A0A] border-l border-white/10 text-white flex flex-col shadow-2xl animate-slideLeft">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black">
            <div>
              <span className="text-[10px] font-jetbrains tracking-widest text-[#BC0100] uppercase block">
                SECTOR // CART
              </span>
              <h2 className="text-2xl font-anton uppercase tracking-wider text-white">
                YOUR DROP ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="p-4 bg-[#141414] border-b border-white/10">
            <div className="flex items-center justify-between text-[11px] font-jetbrains uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#BC0100]" />
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-emerald-400 font-bold">FREE SHIPPING UNLOCKED</span>
                ) : (
                  <span>
                    ADD <strong className="text-white">A${remainingForFreeShipping.toFixed(2)}</strong> FOR FREE SHIPPING
                  </span>
                )}
              </span>
              <span className="font-bold text-white/70">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-black border border-white/10 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  subtotal >= freeShippingThreshold ? 'bg-emerald-500' : 'bg-[#BC0100]'
                }`}
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 border border-white/10 flex items-center justify-center text-white/20 font-anton text-2xl">
                  力
                </div>
                <p className="font-anton text-xl uppercase tracking-wider text-white">
                  YOUR CRATE IS EMPTY
                </p>
                <p className="font-ibm text-xs text-white/50 max-w-xs">
                  All drops are strictly limited. Secure your garments before the archive closes.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/collection');
                  }}
                  className="mt-4 bg-[#BC0100] text-white px-6 py-3 font-anton text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
                >
                  EXPLORE THE COLLECTION →
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemPrice = item.product.onSale && item.product.salePriceNum
                  ? item.product.salePriceNum
                  : item.product.priceNum;

                return (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-4 p-3 bg-black border border-white/10 relative group"
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate(`/drop/${item.product.slug}`);
                      }}
                      className="w-20 h-24 bg-[#181818] flex-shrink-0 cursor-pointer overflow-hidden border border-white/5"
                    >
                      <img
                        src={item.product.images.front}
                        alt={item.product.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4
                            onClick={() => {
                              setIsCartOpen(false);
                              navigate(`/drop/${item.product.slug}`);
                            }}
                            className="font-anton text-sm uppercase tracking-wider text-white hover:text-[#BC0100] transition-colors cursor-pointer"
                          >
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.size)}
                            className="text-white/40 hover:text-[#BC0100] transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-jetbrains text-white/50 bg-white/10 px-1.5 py-0.5 uppercase">
                            SIZE: {item.size}
                          </span>
                          <span className="text-[10px] font-jetbrains text-white/40 uppercase">
                            {item.product.colorway}
                          </span>
                        </div>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex justify-between items-end mt-3">
                        <div className="flex items-center border border-white/20 bg-[#121212]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, -1)}
                            className="p-1.5 text-white/60 hover:text-white transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-jetbrains font-bold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, 1)}
                            className="p-1.5 text-white/60 hover:text-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="font-anton text-base tracking-wide text-white">
                            A${(itemPrice * item.quantity).toFixed(2)}
                          </span>
                          {item.product.onSale && (
                            <span className="block text-[10px] font-jetbrains text-white/40 line-through">
                              A${(item.product.priceNum * item.quantity).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-6 bg-black border-t border-white/10 space-y-4">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="PROMO CODE (e.g. AWAKENING15)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-[#141414] border border-white/20 px-3 py-2 text-xs font-jetbrains uppercase placeholder:text-white/30 text-white outline-none focus:border-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 border border-white/30 font-jetbrains text-xs uppercase hover:bg-white hover:text-black transition-colors"
                >
                  APPLY
                </button>
              </form>

              {/* Subtotal & Discount summary */}
              <div className="space-y-1.5 text-xs font-jetbrains text-white/70 pt-2 border-t border-white/10">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="font-bold text-white">A${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>DISCOUNT ({appliedPromo})</span>
                    <span>-A${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>ESTIMATED SHIPPING (AU)</span>
                  <span>{subtotal >= freeShippingThreshold ? 'FREE' : 'A$9.99'}</span>
                </div>
                <div className="flex justify-between text-base font-anton text-white pt-2 border-t border-white/10">
                  <span className="uppercase">TOTAL (AUD)</span>
                  <span className="text-[#BC0100] text-xl">
                    A${(finalTotal + (subtotal >= freeShippingThreshold ? 0 : 9.99)).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-[#BC0100] hover:bg-white hover:text-black text-white py-4 font-anton text-lg uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-lg disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <span className="animate-pulse">TRANSMITTING ORDER...</span>
                ) : (
                  <>
                    PROCEED TO CHECKOUT <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-jetbrains text-white/40">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-BIT ENCRYPTED • NO RESTOCKS EVER • FINAL SALE</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
