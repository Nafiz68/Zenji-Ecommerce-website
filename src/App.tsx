import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { SmoothScroll } from './components/SmoothScroll';
import { SplashIntro } from './components/SplashIntro';
import { KatanaCursor } from './components/KatanaCursor';
import { MarqueeTicker } from './components/MarqueeTicker';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { ToastContainer } from './components/Toast';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { DropPage } from './pages/DropPage';
import { CollectionPage } from './pages/CollectionPage';
import { LookbookPage } from './pages/LookbookPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { PoliciesPage } from './pages/PoliciesPage';

export function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Client-side router navigation
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Determine which page to render based on currentPath
  const renderPage = () => {
    // Product details: /drop/slug or /product/slug
    if (currentPath.startsWith('/drop/') && currentPath !== '/drop') {
      const slug = currentPath.replace('/drop/', '');
      return <ProductDetailPage slug={slug} navigate={navigate} />;
    }

    switch (currentPath) {
      case '/':
        return <HomePage navigate={navigate} />;
      case '/drop':
        return <DropPage navigate={navigate} />;
      case '/collection':
        return <CollectionPage navigate={navigate} />;
      case '/lookbook':
        return <LookbookPage navigate={navigate} />;
      case '/our-story':
        return <OurStoryPage navigate={navigate} />;
      case '/faq':
        return <PoliciesPage type="faq" navigate={navigate} />;
      case '/review':
        return <PoliciesPage type="review" navigate={navigate} />;
      case '/contact':
        return <PoliciesPage type="contact" navigate={navigate} />;
      case '/return-policy':
        return <PoliciesPage type="return-policy" navigate={navigate} />;
      case '/privacy-policy':
        return <PoliciesPage type="privacy-policy" navigate={navigate} />;
      case '/terms':
        return <PoliciesPage type="terms" navigate={navigate} />;
      case '/login':
        return <PoliciesPage type="login" navigate={navigate} />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <SmoothScroll>
      <div className="flex min-h-screen flex-col bg-black text-white selection:bg-[#BC0100] selection:text-white">
        {/* 1. Awakening Intro Animation */}
        <SplashIntro />

        {/* 2. Realistic 3D Katana Custom Cursor & Blade Trail */}
        <KatanaCursor />

        {/* 3. Top Marquee Announcement Ticker */}
        <MarqueeTicker />

        {/* 4. Sticky Navbar */}
        <Navbar currentPath={currentPath} navigate={navigate} />

        {/* 5. Active Page Content with Framer Motion Page Transition */}
        <div className="flex-1 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPath}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 6. Footer */}
        <Footer navigate={navigate} />

        {/* 7. Global Modals & Drawers */}
        <CartDrawer navigate={navigate} />
        <QuickViewModal navigate={navigate} />
        <SearchModal navigate={navigate} />
        <SizeGuideModal />
        <ToastContainer />
      </div>
    </SmoothScroll>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
