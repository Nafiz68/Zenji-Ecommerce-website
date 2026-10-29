import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { HelpCircle, CheckCircle2 } from 'lucide-react';
import { BRAND } from '../brand';

interface PoliciesPageProps {
  type: 'faq' | 'review' | 'contact' | 'return-policy' | 'privacy-policy' | 'terms' | 'login';
  navigate: (path: string) => void;
}

const DRAFT_NOTE = (
  <p className="font-sans text-xs text-gray-400 mb-6">Draft — to be reviewed before launch.</p>
);

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
    addToast('Message sent', "Thanks — we'll reply within 2 business days.", 'success');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Signed in', 'Welcome back.', 'success');
    navigate('/collection');
  };

  return (
    <main className="min-h-screen bg-white text-black py-16 md:py-24 px-6 md:px-14">
      <div className="mx-auto max-w-[840px]">
        {/* Back Link */}
        <button
          onClick={() => navigate('/')}
          className="mb-8 inline-block font-sans text-xs uppercase tracking-widest text-black/50 hover:text-black transition-colors"
        >
          ← Back to home
        </button>

        {/* -------------------------------------------------------------
            1. FAQ & HELP VIEW
            ------------------------------------------------------------- */}
        {type === 'faq' && (
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-accent block mb-2">
              Help
            </span>
            <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-black mb-8">
              FREQUENTLY ASKED QUESTIONS
            </h1>

            <div className="space-y-6 font-sans text-sm text-gray-700">
              <div className="border border-black/10 p-6 bg-[#FAF8F4]">
                <h3 className="font-display text-xl uppercase text-black mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-accent" />
                  What are the tees made of, and how do they fit?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our tees are made from <strong>heavyweight cotton</strong> with a relaxed fit. Check the size guide on each product page if you're between sizes.
                </p>
              </div>

              <div className="border border-black/10 p-6 bg-[#FAF8F4]">
                <h3 className="font-display text-xl uppercase text-black mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-accent" />
                  Will sold-out designs come back?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Some designs are limited runs and may not return once they sell out. If a design is coming back, we'll say so on its product page.
                </p>
              </div>

              <div className="border border-black/10 p-6 bg-[#FAF8F4]">
                <h3 className="font-display text-xl uppercase text-black mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-accent" />
                  How long does shipping take?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We ship Australia-wide with Australia Post. Delivery usually takes <strong>5 to 10 business days</strong>. Shipping is free on orders over <strong>A$150</strong>.
                </p>
              </div>

              <div className="border border-black/10 p-6 bg-[#FAF8F4]">
                <h3 className="font-display text-xl uppercase text-black mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-accent" />
                  How do I care for my tee?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Turn it inside out and machine wash cold with similar colours. Don't bleach or tumble dry on high heat. Iron inside out and keep the iron off the print.
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
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-accent block mb-2">
              Reviews
            </span>
            <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-black mb-4">
              CUSTOMER REVIEWS
            </h1>
            <div className="border border-black/10 p-6 bg-[#FAF8F4]">
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                No reviews yet — reviews from verified buyers will appear here after our first orders ship.
              </p>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            3. CONTACT US VIEW
            ------------------------------------------------------------- */}
        {type === 'contact' && (
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-accent block mb-2">
              Contact
            </span>
            <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-black mb-4">
              GET IN TOUCH
            </h1>
            <p className="font-sans text-sm text-gray-600 mb-8">
              Questions about an order, sizing, or anything else? Use the form below or email us at <strong className="text-black">{BRAND.email}</strong>.
            </p>

            {contactSent ? (
              <div className="p-8 bg-black text-white text-center space-y-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="font-display text-2xl uppercase">Message sent</h3>
                <p className="font-sans text-xs text-white/70 max-w-sm mx-auto">
                  Thanks — we'll reply within 2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 font-sans">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Your name"
                    className="w-full h-12 px-4 border border-black/20 text-xs font-sans outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-12 px-4 border border-black/20 text-xs font-sans outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold mb-1">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder="How can we help?"
                    className="w-full p-4 border border-black/20 text-xs font-sans outline-none focus:border-black resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-black hover:bg-accent text-white font-display text-base uppercase tracking-wider transition-colors duration-200"
                >
                  Send message →
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
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-accent block mb-2">
              Returns
            </span>
            <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-black mb-4">
              RETURN POLICY
            </h1>
            {DRAFT_NOTE}

            <div className="space-y-6 font-sans text-sm text-gray-700 leading-relaxed">
              <p>
                Our goods come with guarantees that cannot be excluded under the Australian Consumer Law.
              </p>
              <h3 className="font-display text-xl text-black uppercase mt-6">
                Change of mind
              </h3>
              <p>
                If you change your mind or the size isn't right, you can return or exchange an item within <strong>30 days</strong> of delivery, as long as it's unworn, unwashed and has its tags attached. You pay the return shipping.
              </p>
              <h3 className="font-display text-xl text-black uppercase mt-6">
                Faulty, damaged or not as described
              </h3>
              <p>
                If an item is faulty, arrives damaged, or isn't what we described, it's covered by the consumer guarantees. We'll repair, replace or refund it, and there's no fixed short deadline to let us know. Email <strong>{BRAND.email}</strong> with your order number and a photo of the problem.
              </p>
              <h3 className="font-display text-xl text-black uppercase mt-6">
                How to start a return
              </h3>
              <p>
                Email <strong>{BRAND.email}</strong> with your order number and the item you'd like to return or exchange. We'll reply with the next steps. For sizing help before you order, see our <button onClick={() => navigate('/collection')} className="underline text-accent">Size Guide</button>.
              </p>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            5a. PRIVACY POLICY VIEW
            ------------------------------------------------------------- */}
        {type === 'privacy-policy' && (
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-accent block mb-2">
              Legal
            </span>
            <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-black mb-4">
              PRIVACY POLICY
            </h1>
            {DRAFT_NOTE}

            <div className="space-y-6 font-sans text-sm text-gray-700 leading-relaxed">
              <p>
                {BRAND.name} ("we", "us", "our") handles your personal information in line with the Australian Privacy Principles.
              </p>
              <h3 className="font-display text-xl text-black uppercase">
                1. What we collect
              </h3>
              <p>
                Your name, email address, shipping address and order history.
              </p>
              <h3 className="font-display text-xl text-black uppercase">
                2. Why we collect it
              </h3>
              <p>
                To process and deliver your orders, to answer your messages, and to send you emails about new releases — only if you opt in. You can unsubscribe at any time.
              </p>
              <h3 className="font-display text-xl text-black uppercase">
                3. Who we share it with
              </h3>
              <p>
                Only the services we need to run the store: our payment processor, hosting provider, email provider and delivery carrier. We never store your card numbers — payments are handled by our payment processor.
              </p>
              <h3 className="font-display text-xl text-black uppercase">
                4. Accessing, correcting or deleting your data
              </h3>
              <p>
                To see the information we hold about you, correct it, or ask us to delete it, email <strong>{BRAND.email}</strong>.
              </p>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            5b. TERMS OF SERVICE VIEW
            ------------------------------------------------------------- */}
        {type === 'terms' && (
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-accent block mb-2">
              Legal
            </span>
            <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-black mb-4">
              TERMS OF SERVICE
            </h1>
            {DRAFT_NOTE}

            <div className="space-y-6 font-sans text-sm text-gray-700 leading-relaxed">
              <p>
                These terms apply when you buy from {BRAND.name} ("we", "us", "our").
              </p>
              <h3 className="font-display text-xl text-black uppercase">
                1. Prices
              </h3>
              <p>
                All prices are in Australian dollars (AUD) and include GST.
              </p>
              <h3 className="font-display text-xl text-black uppercase">
                2. Orders
              </h3>
              <p>
                All orders are subject to availability. If an item is out of stock or was listed at the wrong price, we may cancel the order and give you a full refund.
              </p>
              <h3 className="font-display text-xl text-black uppercase">
                3. Product images
              </h3>
              <p>
                Product descriptions and images are for illustration. Colours and details may vary slightly from what you see on screen.
              </p>
              <h3 className="font-display text-xl text-black uppercase">
                4. Your consumer rights
              </h3>
              <p>
                Nothing in these terms limits your rights under the Australian Consumer Law. See our <button onClick={() => navigate('/return-policy')} className="underline text-accent">Return Policy</button> for details.
              </p>
              <h3 className="font-display text-xl text-black uppercase">
                5. Governing law
              </h3>
              <p>
                These terms are governed by the laws of [State], Australia.
              </p>
              <p>
                Questions about these terms? Email <strong>{BRAND.email}</strong>.
              </p>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            6. LOGIN (placeholder until the backend exists)
            ------------------------------------------------------------- */}
        {type === 'login' && (
          <div className="max-w-md mx-auto py-6">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-accent block mb-2 text-center">
              Account
            </span>
            <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-black text-center mb-8">
              SIGN IN
            </h1>

            <form onSubmit={handleLogin} className="space-y-4 font-sans bg-[#FAF8F4] p-8 border border-black/10 shadow-sm">
              <div>
                <label className="block text-xs uppercase font-bold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full h-12 px-4 border border-black/20 text-xs font-sans outline-none bg-white focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="w-full h-12 px-4 border border-black/20 text-xs font-sans outline-none bg-white focus:border-black"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-black hover:bg-accent text-white font-display text-base uppercase tracking-wider transition-colors duration-200 mt-4"
              >
                Sign in
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};
