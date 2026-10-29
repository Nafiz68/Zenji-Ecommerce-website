import React from 'react';
import { BRAND } from '../brand';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="relative z-40 w-full overflow-hidden bg-black text-white border-t border-white/10 select-none">
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-14 pb-10 pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[32%_1fr] md:gap-16">
          {/* Brand Column */}
          <div>
            <button
              onClick={() => navigate('/')}
              className="font-display text-4xl tracking-tighter text-white hover:text-accent transition-colors"
            >
              {BRAND.name}
            </button>
            <p className="mt-4 max-w-[280px] font-sans text-xs leading-relaxed text-white/50">
              Clothing designed for everyday wear.
            </p>

            {BRAND.socials.length > 0 && (
              <div className="mt-8">
                <p className="font-sans text-[10px] tracking-widest text-white/35 uppercase mb-4">
                  Follow us
                </p>
                <div className="flex flex-wrap gap-4">
                  {BRAND.socials.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-[13px] text-white/80 hover:text-accent transition-colors"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Nav Columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4 md:gap-8">
            {/* Column 1: Shop */}
            <div>
              <h3 className="mb-5 font-sans text-[11px] font-bold tracking-widest text-white/35 uppercase">
                Shop
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate('/')}
                    className="font-sans text-[13px] text-white/80 hover:text-accent transition-colors text-left"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/drop')}
                    className="font-sans text-[13px] text-white/80 hover:text-accent transition-colors text-left"
                  >
                    New in
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/collection')}
                    className="font-sans text-[13px] text-white/80 hover:text-accent transition-colors text-left"
                  >
                    Shop all
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: About */}
            <div>
              <h3 className="mb-5 font-sans text-[11px] font-bold tracking-widest text-white/35 uppercase">
                About
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate('/lookbook')}
                    className="font-sans text-[13px] text-white/80 hover:text-accent transition-colors text-left"
                  >
                    Lookbook
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/our-story')}
                    className="font-sans text-[13px] text-white/80 hover:text-accent transition-colors text-left"
                  >
                    About us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/collection')}
                    className="font-sans text-[13px] text-white/80 hover:text-accent transition-colors text-left"
                  >
                    Collection
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Follow us (hidden until we have our own accounts) */}
            {BRAND.socials.length > 0 && (
              <div>
                <h3 className="mb-5 font-sans text-[11px] font-bold tracking-widest text-white/35 uppercase">
                  Follow us
                </h3>
                <ul className="space-y-2">
                  {BRAND.socials.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="font-sans text-[13px] text-white/80 hover:text-accent transition-colors">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Column 4: Help & policies */}
            <div>
              <h3 className="mb-5 font-sans text-[11px] font-bold tracking-widest text-white/35 uppercase">
                Help
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate('/faq')}
                    className="font-sans text-[13px] text-white/80 hover:text-accent transition-colors text-left"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/review')}
                    className="font-sans text-[13px] text-white/80 hover:text-accent transition-colors text-left"
                  >
                    Reviews
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/privacy-policy')}
                    className="font-sans text-[13px] text-white/80 hover:text-accent transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/terms')}
                    className="font-sans text-[13px] text-white/80 hover:text-accent transition-colors text-left"
                  >
                    Terms
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/return-policy')}
                    className="font-sans text-[13px] text-white/80 hover:text-accent transition-colors text-left"
                  >
                    Return Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/contact')}
                    className="font-sans text-[13px] text-white/80 hover:text-accent transition-colors text-left"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Subfooter */}
      <div className="relative z-10 border-t border-white/10 bg-black py-6">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-6 md:px-14 md:flex-row">
          <span className="font-sans text-[11px] text-white/40 text-center md:text-left">
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </span>

          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
            <div className="flex gap-6 font-sans text-[11px] text-white/40">
              <button onClick={() => navigate('/privacy-policy')} className="hover:text-white transition-colors">
                Privacy
              </button>
              <button onClick={() => navigate('/terms')} className="hover:text-white transition-colors">
                Terms
              </button>
              <button onClick={() => navigate('/privacy-policy')} className="hover:text-white transition-colors">
                Cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
