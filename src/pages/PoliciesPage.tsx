import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Star, HelpCircle, CheckCircle2 } from 'lucide-react';

interface PoliciesPageProps {
  type: 'faq' | 'review' | 'contact' | 'return-policy' | 'privacy-policy' | 'terms' | 'login';
  navigate: (path: string) => void;
}

export const PoliciesPage: React.FC<PoliciesPageProps> = ({ type, navigate }) => {
  const { addToast } = useCart();
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail.includes('@')) {
      addToast('ERROR', 'Please enter a valid email address.', 'error');
      return;
    }
    setContactSent(true);
    addToast('MESSAGE TRANSMITTED', 'Support unit has logged your transmission.', 'success');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('OPERATOR LOGGED IN', `Welcome back, operative. Sector clear.`, 'success');
    navigate('/collection');
  };

  return (
    <main className="min-h-screen bg-white text-black py-16 md:py-24 px-6 md:px-14">
      <div className="mx-auto max-w-[840px]">
        {/* Back Link */}
        <button
          onClick={() => navigate('/')}
          className="mb-8 inline-block font-jetbrains text-xs uppercase tracking-widest text-black/50 hover:text-black transition-colors"
        >
          ← RETURN TO BASE
        </button>

        {/* -------------------------------------------------------------
            1. FAQ & HELP VIEW
            ------------------------------------------------------------- */}
        {type === 'faq' && (
          <div>
            <span className="font-jetbrains text-xs uppercase tracking-[0.3em] text-[#BC0100] block mb-2">
              SECTOR // HELP & FAQ
            </span>
            <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-tight text-black mb-8">
              FREQUENTLY ASKED QUESTIONS
            </h1>

            <div className="space-y-6 font-ibm text-sm text-gray-700">
              <div className="border border-black/10 p-6 bg-[#FAF8F4]">
                <h3 className="font-anton text-xl uppercase text-black mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#BC0100]" />
                  What is the fit and fabric of ZENJI shirts?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  All ZENJI tees are crafted from custom-milled <strong>100% heavyweight 240gsm cotton</strong>. They feature a relaxed, boxy drop-shoulder streetwear cut designed for modern comfort and durability.
                </p>
              </div>

              <div className="border border-black/10 p-6 bg-[#FAF8F4]">
                <h3 className="font-anton text-xl uppercase text-black mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#BC0100]" />
                  Do you restock sold out items?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  <strong>No restocks, ever.</strong> Every drop is produced in strictly limited quantities. Once a design is sold out, it is archived permanently in the ZENJI vault.
                </p>
              </div>

              <div className="border border-black/10 p-6 bg-[#FAF8F4]">
                <h3 className="font-anton text-xl uppercase text-black mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#BC0100]" />
                  How fast is shipping across Australia?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We ship Australia-wide via Australia Post. Standard transit time is <strong>5 to 10 business days</strong>. Orders over <strong>A$150</strong> automatically qualify for free shipping.
                </p>
              </div>

              <div className="border border-black/10 p-6 bg-[#FAF8F4]">
                <h3 className="font-anton text-xl uppercase text-black mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#BC0100]" />
                  How should I wash and care for my shirt?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Turn the garment inside out before washing. Machine wash cold with similar colors. Do not bleach or tumble dry on high heat. Iron inside out away from the screen-printed artwork.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            2. CUSTOMER REVIEWS VIEW
            ------------------------------------------------------------- */}
        {type === 'review' && (
          <div>
            <span className="font-jetbrains text-xs uppercase tracking-[0.3em] text-[#BC0100] block mb-2">
              COMMUNITY // VERIFIED FEEDBACK
            </span>
            <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-tight text-black mb-4">
              OPERATIVE REVIEWS
            </h1>
            <p className="font-ibm text-sm text-gray-500 mb-10">
              Real feedback from verified streetwear collectors across Australia.
            </p>

            <div className="space-y-6">
              {[
                {
                  name: 'KAI T. (MELBOURNE)',
                  item: 'BLUE FLAME TEE — SIZE L',
                  rating: 5,
                  comment:
                    'The 240gsm cotton is insanely thick and structured. The oversized drape is perfection and the back graphic has zero cracking after multiple washes.',
                },
                {
                  name: 'MARCUS L. (SYDNEY)',
                  item: 'DEMON BLOOD TEE — SIZE XL',
                  rating: 5,
                  comment:
                    'Best anime streetwear brand in Australia by far. Print quality is elite and the color accuracy is spot on. Worth every cent.',
                },
                {
                  name: 'CHLOE D. (BRISBANE)',
                  item: 'WILL OF THE SUN TEE — SIZE S',
                  rating: 5,
                  comment:
                    'Shipped in 3 days. The solar gold print pops intensely in person. Can’t wait for the Awakening drop in September!',
                },
                {
                  name: 'JAKE R. (PERTH)',
                  item: 'WARRIOR SPIRIT TEE — SIZE M',
                  rating: 5,
                  comment:
                    'Heavy duty collar, perfect streetwear drop-shoulder cut. Will definitely cop again before The Origin Drop archives.',
                },
              ].map((rev, i) => (
                <div key={i} className="border border-black/10 p-6 bg-white shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-anton text-lg uppercase text-black">{rev.name}</h4>
                      <span className="font-jetbrains text-[10px] text-gray-400 uppercase tracking-wider block">
                        {rev.item}
                      </span>
                    </div>
                    <div className="flex text-[#BC0100]">
                      {[...Array(rev.rating)].map((_, r) => (
                        <Star key={r} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="font-ibm text-xs sm:text-sm text-gray-700 leading-relaxed mt-3">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            3. CONTACT US VIEW
            ------------------------------------------------------------- */}
        {type === 'contact' && (
          <div>
            <span className="font-jetbrains text-xs uppercase tracking-[0.3em] text-[#BC0100] block mb-2">
              COMMUNICATIONS // SUPPORT
            </span>
            <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-tight text-black mb-4">
              CONTACT ZENJI
            </h1>
            <p className="font-ibm text-sm text-gray-600 mb-8">
              For order inquiries, collaborations, or sizing questions, send a transmission directly to our support team at <strong className="text-black">support@zenji.shop</strong>.
            </p>

            {contactSent ? (
              <div className="p-8 bg-black text-white text-center space-y-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="font-anton text-2xl uppercase">TRANSMISSION CONFIRMED</h3>
                <p className="font-ibm text-xs text-white/70 max-w-sm mx-auto">
                  Our Melbourne operations center will reply within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 font-jetbrains">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold mb-1">
                    OPERATOR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="ENTER YOUR NAME"
                    className="w-full h-12 px-4 border border-black/20 text-xs font-ibm outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold mb-1">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="NAME@DOMAIN.COM"
                    className="w-full h-12 px-4 border border-black/20 text-xs font-ibm outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold mb-1">
                    MESSAGE / INQUIRY
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder="DESCRIBE YOUR INQUIRY..."
                    className="w-full p-4 border border-black/20 text-xs font-ibm outline-none focus:border-black resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-black hover:bg-[#BC0100] text-white font-anton text-base uppercase tracking-wider transition-colors duration-200"
                >
                  TRANSMIT MESSAGE →
                </button>
              </form>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------
            4. RETURN POLICY VIEW
            ------------------------------------------------------------- */}
        {type === 'return-policy' && (
          <div>
            <span className="font-jetbrains text-xs uppercase tracking-[0.3em] text-[#BC0100] block mb-2">
              LOGISTICS // RETURNS
            </span>
            <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-tight text-black mb-8">
              RETURN POLICY
            </h1>

            <div className="space-y-6 font-ibm text-sm text-gray-700 leading-relaxed">
              <p>
                Because all ZENJI items are limited edition and produced in strict one-off capsule batches, <strong>all sales are final</strong>. We do not accept returns or exchanges for change of mind or incorrect size choice once an item has been dispatched.
              </p>
              <h3 className="font-anton text-xl text-black uppercase mt-6">
                Damaged or Defective Items
              </h3>
              <p>
                In the rare event that an item arrives with a manufacturing defect or damage in transit, please contact us at <strong>support@zenji.shop</strong> within 7 days of receiving your order with clear photos of the issue and your order confirmation number.
              </p>
              <h3 className="font-anton text-xl text-black uppercase mt-6">
                Size Verification
              </h3>
              <p>
                Please refer closely to our <button onClick={() => navigate('/collection')} className="underline text-[#BC0100]">Size Guide</button> before confirming your order.
              </p>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            5. PRIVACY POLICY & TERMS VIEW
            ------------------------------------------------------------- */}
        {(type === 'privacy-policy' || type === 'terms') && (
          <div>
            <span className="font-jetbrains text-xs uppercase tracking-[0.3em] text-[#BC0100] block mb-2">
              LEGAL // GOVERNANCE
            </span>
            <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-tight text-black mb-8">
              {type === 'privacy-policy' ? 'PRIVACY & COOKIES' : 'TERMS OF SERVICE'}
            </h1>

            <div className="space-y-6 font-ibm text-sm text-gray-700 leading-relaxed">
              <p>
                ZENJI ("we", "us", "our") is dedicated to safeguarding your personal data and ensuring transparent compliance with Australian Privacy Principles (APPs).
              </p>
              <h3 className="font-anton text-xl text-black uppercase">
                1. Data Collection & Usage
              </h3>
              <p>
                We only collect data necessary to process your transactions, coordinate Australia Post delivery, and notify you regarding drop releases if you have joined the waitlist.
              </p>
              <h3 className="font-anton text-xl text-black uppercase">
                2. Security Protocols
              </h3>
              <p>
                All payment processing is handled through PCI-DSS compliant payment gateways with 256-bit encryption. We never store raw credit card credentials on our servers.
              </p>
              <h3 className="font-anton text-xl text-black uppercase">
                3. Intellectual Property
              </h3>
              <p>
                All original artwork, typography, branding logos, and Cyber-Ronin aesthetic assets are proprietary to ZENJI Australia.
              </p>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            6. OPERATOR LOGIN
            ------------------------------------------------------------- */}
        {type === 'login' && (
          <div className="max-w-md mx-auto py-6">
            <span className="font-jetbrains text-xs uppercase tracking-[0.3em] text-[#BC0100] block mb-2 text-center">
              SYSTEM // AUTHENTICATION
            </span>
            <h1 className="font-anton text-4xl sm:text-5xl uppercase tracking-tight text-black text-center mb-8">
              OPERATOR LOGIN
            </h1>

            <form onSubmit={handleLogin} className="space-y-4 font-jetbrains bg-[#FAF8F4] p-8 border border-black/10 shadow-sm">
              <div>
                <label className="block text-xs uppercase font-bold mb-1">
                  OPERATOR IDENTIFIER (EMAIL)
                </label>
                <input
                  type="email"
                  required
                  placeholder="AGENT@ZENJI.SHOP"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full h-12 px-4 border border-black/20 text-xs font-ibm outline-none bg-white focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold mb-1">
                  ACCESS CIPHER (PASSWORD)
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="w-full h-12 px-4 border border-black/20 text-xs font-ibm outline-none bg-white focus:border-black"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-black hover:bg-[#BC0100] text-white font-anton text-base uppercase tracking-wider transition-colors duration-200 mt-4"
              >
                ENTER SYSTEM →
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};
