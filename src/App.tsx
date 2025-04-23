import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import IntroVideo from './components/intro/IntroVideo';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [videoPlayed, setVideoPlayed] = useState(false);

  // Skip intro if returning user
  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const handleVideoComplete = () => {
    localStorage.setItem('hasSeenIntro', 'true');
    setVideoPlayed(true);
    
    // Small delay to allow for smooth transition
    setTimeout(() => {
      setShowIntro(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatePresence>
        {showIntro && (
          <IntroVideo 
            onComplete={handleVideoComplete}
            videoPlayed={videoPlayed}
            setVideoPlayed={setVideoPlayed}
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        {!showIntro && (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/account/*" element={<AccountPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;