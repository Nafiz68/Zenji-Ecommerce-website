import React from 'react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="relative z-40 w-full overflow-hidden bg-black text-white border-t border-white/10 select-none">
      {/* Mega Background Watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-anton uppercase leading-none text-white/[0.03] text-[120px] md:text-[280px]"
      >
        ZENJI
      </span>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-14 pb-10 pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[32%_1fr] md:gap-16">
          {/* Brand & Lore Column */}
          <div>
            <button
              onClick={() => navigate('/')}
              className="font-anton text-4xl tracking-tighter uppercase text-white hover:text-[#BC0100] transition-colors"
            >
              ZENJI
            </button>
            <p className="mt-4 max-w-[280px] font-ibm text-xs leading-relaxed text-white/50">
              Wear the Arc. Anime-inspired streetwear for gamers and otaku. Every drop limited. No restocks. Ever.
            </p>

            <div className="mt-8">
              <p className="font-jetbrains text-[10px] tracking-widest text-white/35 uppercase mb-4">
                FOLLOW THE LORE
              </p>
              <div className="flex flex-wrap gap-2">
                {/* TikTok Button */}
                <a
                  href="https://www.tiktok.com/@zenji_.shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="flex min-h-[44px] items-center gap-2 text-[11px] font-jetbrains font-bold px-4 py-2 border border-white bg-white text-black hover:bg-[#010101] hover:text-white hover:border-[#010101] transition-colors rounded-none"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16.6 5.82a4.28 4.28 0 0 1-1.05-2.82h-3.11v12.63a2.59 2.59 0 1 1-1.84-2.48V9.94a5.68 5.68 0 1 0 4.95 5.63V9.01a7.34 7.34 0 0 0 4.29 1.37V7.27a4.28 4.28 0 0 1-2.19-1.45z" />
                  </svg>
                  TikTok
                </a>

                {/* Instagram Button */}
                <a
                  href="https://www.instagram.com/zenji_.shop?igsh=a3ppYnA3YnJqMHk%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  style={{
                    background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                  }}
                  className="flex min-h-[44px] items-center gap-2 text-[11px] font-jetbrains font-bold px-4 py-2 text-white border-none transition-opacity hover:opacity-90 rounded-none shadow-md"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  Instagram
                </a>

                {/* Facebook Button */}
                <a
                  href="https://www.facebook.com/people/ZENJI/61592433253702/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  style={{ background: '#1877F2' }}
                  className="flex min-h-[44px] items-center gap-2 text-[11px] font-jetbrains font-bold px-4 py-2 text-white border-none transition-opacity hover:opacity-90 rounded-none shadow-md"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.5c-1.49 0-1.95.93-1.95 1.87v2.25h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
                  </svg>
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Nav Columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4 md:gap-8">
            {/* Column 1: DROPS */}
            <div>
              <h3 className="mb-5 font-jetbrains text-[11px] font-bold tracking-widest text-white/35 uppercase">
                DROPS
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate('/')}
                    className="font-ibm text-[13px] text-white/80 hover:text-[#BC0100] transition-colors text-left"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/drop')}
                    className="font-ibm text-[13px] text-white/80 hover:text-[#BC0100] transition-colors text-left"
                  >
                    Drop
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/collection')}
                    className="font-ibm text-[13px] text-white/80 hover:text-[#BC0100] transition-colors text-left"
                  >
                    Collection
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: EXPLORE */}
            <div>
              <h3 className="mb-5 font-jetbrains text-[11px] font-bold tracking-widest text-white/35 uppercase">
                EXPLORE
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate('/lookbook')}
                    className="font-ibm text-[13px] text-white/80 hover:text-[#BC0100] transition-colors text-left"
                  >
                    Lookbook
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/our-story')}
                    className="font-ibm text-[13px] text-white/80 hover:text-[#BC0100] transition-colors text-left"
                  >
                    Our Story
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/collection')}
                    className="font-ibm text-[13px] text-white/80 hover:text-[#BC0100] transition-colors text-left"
                  >
                    Collection
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: COMMUNITY */}
            <div>
              <h3 className="mb-5 font-jetbrains text-[11px] font-bold tracking-widest text-white/35 uppercase">
                COMMUNITY
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.tiktok.com/@zenji_.shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-ibm text-[13px] text-white/80 hover:text-[#BC0100] transition-colors"
                  >
                    TikTok
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/zenji_.shop?igsh=a3ppYnA3YnJqMHk%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-ibm text-[13px] text-white/80 hover:text-[#BC0100] transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/people/ZENJI/61592433253702/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-ibm text-[13px] text-white/80 hover:text-[#BC0100] transition-colors"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: CONTACT & POLICIES */}
            <div>
              <h3 className="mb-5 font-jetbrains text-[11px] font-bold tracking-widest text-white/35 uppercase">
                CONTACT
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate('/faq')}
                    className="font-ibm text-[13px] text-white/80 hover:text-[#BC0100] transition-colors text-left"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/review')}
                    className="font-ibm text-[13px] text-white/80 hover:text-[#BC0100] transition-colors text-left"
                  >
                    Review
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/privacy-policy')}
                    className="font-ibm text-[13px] text-white/80 hover:text-[#BC0100] transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/terms')}
                    className="font-ibm text-[13px] text-white/80 hover:text-[#BC0100] transition-colors text-left"
                  >
                    Terms
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/return-policy')}
                    className="font-ibm text-[13px] text-white/80 hover:text-[#BC0100] transition-colors text-left"
                  >
                    Return Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/contact')}
                    className="font-ibm text-[13px] text-white/80 hover:text-[#BC0100] transition-colors text-left"
                  >
                    Contact Us
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
          <span className="font-jetbrains text-[11px] text-white/40 text-center md:text-left">
            © 2026 ZENJI. All drops are final. No restocks. Ever.
          </span>

          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
            <div className="flex gap-6 font-jetbrains text-[11px] text-white/40">
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

            <span className="font-jetbrains text-[10px] text-white/40 flex items-center gap-1.5">
              <span className="text-[#EAB308]">●</span> Anime-inspired. Gamer-built. Community-owned.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
