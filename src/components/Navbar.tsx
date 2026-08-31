import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Search, User, Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const { totalItems, setIsCartOpen, setIsSearchOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setIsSearchOpen(true);
    }
  };

  const navLinks = [
    { label: 'DROP', path: '/drop' },
    { label: 'COLLECTION', path: '/collection' },
    { label: 'LOOKBOOK', path: '/lookbook' },
    { label: 'OUR STORY', path: '/our-story' },
  ];

  const moreLinks = [
    { label: 'FAQ & HELP', path: '/faq' },
    { label: 'CUSTOMER REVIEWS', path: '/review' },
    { label: 'CONTACT US', path: '/contact' },
    { label: 'RETURN POLICY', path: '/return-policy' },
    { label: 'PRIVACY POLICY', path: '/privacy-policy' },
  ];

  return (
    <nav
      id="main-nav"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-black/95 border-b border-white/10 backdrop-blur-md py-3 shadow-2xl'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 md:px-14">
        {/* Brand Logo */}
        <button
          onClick={() => {
            navigate('/');
            setMobileMenuOpen(false);
          }}
          className="flex min-h-[44px] items-center gap-4 group focus:outline-none"
        >
          <span
            aria-label="ZENJI"
            className="zenji-logo-chamfer inline-block select-none uppercase leading-none text-white text-3xl md:text-4xl font-anton tracking-tight group-hover:text-[#BC0100] transition-colors"
          >
            ZENJI
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-8 lg:gap-10 md:flex">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`nav-link-glow font-jetbrains text-xs uppercase tracking-[0.2em] font-semibold transition-all py-1 ${
                  isActive
                    ? 'text-[#BC0100] border-b border-[#BC0100] drop-shadow-[0_0_8px_rgba(188,1,0,0.8)]'
                    : 'text-white/80 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          {/* MORE Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className={`nav-link-glow font-jetbrains text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center gap-1.5 py-1 ${
                moreDropdownOpen || ['/faq', '/review', '/contact', '/return-policy', '/privacy-policy'].includes(currentPath)
                  ? 'text-[#BC0100]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              MORE <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180 text-[#BC0100]' : ''}`} />
            </button>

            {moreDropdownOpen && (
              <div className="absolute top-full left-0 mt-3 w-52 bg-[#0A0A0A] border border-white/15 p-2 shadow-2xl flex flex-col gap-1 z-50 animate-fadeIn">
                {moreLinks.map((subLink) => (
                  <button
                    key={subLink.path}
                    onClick={() => {
                      navigate(subLink.path);
                      setMoreDropdownOpen(false);
                    }}
                    className={`text-left px-3 py-2 text-[11px] font-jetbrains uppercase tracking-wider transition-colors ${
                      currentPath === subLink.path
                        ? 'text-[#BC0100] bg-white/5 font-bold'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {subLink.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Actions: Search, Cart, Account, Mobile Toggle */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Search Bar (Desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center"
          >
            <div className="flex items-center h-8 border border-white/25 bg-[#121212] focus-within:border-white/70 transition-all">
              <input
                id="nav-search"
                type="text"
                placeholder="SEARCH..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onClick={() => setIsSearchOpen(true)}
                className="h-full bg-transparent border-0 pl-3 pr-2 text-[11px] font-jetbrains uppercase tracking-widest text-white placeholder:text-white/40 focus:outline-none w-28 focus:w-36 transition-all"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
                className="h-full px-2.5 border-l border-white/25 flex items-center justify-center text-white/70 hover:text-[#BC0100] hover:bg-white/10 transition-colors text-xs font-jetbrains font-bold"
              >
                →
              </button>
            </div>
          </form>

          {/* Search Icon (Mobile) */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
            className="md:hidden flex h-10 w-10 items-center justify-center text-white/80 hover:text-[#BC0100] transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Trigger with Counter Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Open cart"
            className="relative flex h-11 w-11 items-center justify-center text-white transition-colors hover:text-[#BC0100] group"
          >
            <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
            {totalItems > 0 && (
              <span className="absolute top-1.5 right-1 flex h-4 min-w-[16px] items-center justify-center bg-[#BC0100] px-1 text-[9px] font-jetbrains font-bold text-white rounded-none border border-white/20 animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

          {/* Account Icon */}
          <button
            onClick={() => navigate('/login')}
            aria-label="Account"
            className="hidden md:flex h-11 w-11 items-center justify-center text-white/80 transition-colors hover:text-[#BC0100]"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            className="flex md:hidden h-10 w-10 items-center justify-center text-white transition-colors hover:text-[#BC0100]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bottom-0 bg-black/98 border-t border-white/10 z-50 flex flex-col justify-between p-6 overflow-y-auto animate-fadeIn">
          <div className="flex flex-col space-y-6 pt-4">
            <span className="text-[10px] font-jetbrains tracking-widest text-[#BC0100] uppercase">
              // SECTOR NAVIGATION
            </span>
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-2xl font-anton uppercase tracking-wider transition-colors ${
                  currentPath === link.path ? 'text-[#BC0100]' : 'text-white'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="h-px w-full bg-white/10 my-2" />

            <div className="grid grid-cols-2 gap-4">
              {moreLinks.map((subLink) => (
                <button
                  key={subLink.path}
                  onClick={() => {
                    navigate(subLink.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left text-xs font-jetbrains uppercase tracking-wider py-1.5 ${
                    currentPath === subLink.path ? 'text-[#BC0100]' : 'text-white/60'
                  }`}
                >
                  {subLink.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
            <button
              onClick={() => {
                navigate('/login');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 border border-white/20 text-center font-jetbrains text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
            >
              OPERATOR LOGIN
            </button>
            <p className="text-[10px] font-jetbrains text-center text-white/40">
              ● Anime-inspired. Gamer-built. Australia.
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};
