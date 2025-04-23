import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, User, ShoppingCart, Menu, X, Store, 
  TrendingUp, Heart, Package, ChevronDown,
  Sun, Moon
} from 'lucide-react';

const Navbar = () => {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  useEffect(() => {
    // Initialize theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('theme') === 'light';
    setIsDarkMode(!savedTheme);
    if (savedTheme) {
      document.documentElement.classList.add('light-theme');
    }
  }, []);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('light-theme');
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
  };
  
  return (
    <header className={`fixed top-0 left-0 w-full z-40 backdrop-blur-md transition-all duration-300 border-b ${isDarkMode ? 'bg-black/90 border-white/10' : 'bg-white/90 border-black/10'}`}>
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className={`flex items-center ${searchExpanded ? 'md:opacity-100 opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
            <Store className="w-8 h-8 text-accent-500 mr-2" />
            <span className="text-xl font-bold tracking-tight">FUTURESTORE</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center space-x-8 ${searchExpanded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
            <Link to="/category/new-arrivals" className="text-sm font-medium tracking-wide hover:text-accent-400 transition-colors">
              NEW ARRIVALS
            </Link>
            <div className="relative group">
              <button className="flex items-center text-sm font-medium tracking-wide hover:text-accent-400 transition-colors">
                CATEGORIES
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-primary-900 border border-primary-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="py-2 px-3">
                  <Link to="/category/clothing" className="block py-2 hover:text-accent-400">Clothing</Link>
                  <Link to="/category/gadgets" className="block py-2 hover:text-accent-400">Gadgets</Link>
                  <Link to="/category/accessories" className="block py-2 hover:text-accent-400">Accessories</Link>
                  <Link to="/category/footwear" className="block py-2 hover:text-accent-400">Footwear</Link>
                </div>
              </div>
            </div>
            <Link to="/bestsellers" className="text-sm font-medium tracking-wide hover:text-accent-400 transition-colors">
              BESTSELLERS
            </Link>
            <Link to="/sale" className="text-sm font-medium tracking-wide hover:text-accent-400 transition-colors">
              SALE
            </Link>
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className={`search-container ${searchExpanded ? 'expanded absolute left-0 right-0 top-0 mx-4 md:mx-20' : 'collapsed'} overflow-hidden rounded-md ${isDarkMode ? 'bg-primary-800' : 'bg-gray-100'}`}>
              <div className="h-full flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <button 
                    onClick={() => setSearchExpanded(!searchExpanded)} 
                    className="p-3 text-white/70 hover:text-white"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                  
                  <AnimatePresence>
                    {searchExpanded && (
                      <motion.div 
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "100%" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="h-full flex-1"
                      >
                        <input
                          type="text"
                          placeholder="Search products..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className={`w-full bg-transparent border-none outline-none px-2 py-1 ${isDarkMode ? 'placeholder-white/50' : 'placeholder-black/50'}`}
                          autoFocus
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {searchExpanded && (
                  <button 
                    onClick={() => setSearchExpanded(false)}
                    className="p-3 text-white/70 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              {searchExpanded && (
                <div className={`p-4 border-t ${isDarkMode ? 'border-primary-700' : 'border-gray-200'} mt-2`}>
                  <h4 className="font-medium mb-2">Popular Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    <button className={`px-3 py-1 text-xs rounded-full ${isDarkMode ? 'bg-primary-700 hover:bg-primary-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                      Clothing
                    </button>
                    <button className={`px-3 py-1 text-xs rounded-full ${isDarkMode ? 'bg-primary-700 hover:bg-primary-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                      Electronics
                    </button>
                    <button className={`px-3 py-1 text-xs rounded-full ${isDarkMode ? 'bg-primary-700 hover:bg-primary-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                      Accessories
                    </button>
                    <button className={`px-3 py-1 text-xs rounded-full ${isDarkMode ? 'bg-primary-700 hover:bg-primary-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                      Footwear
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Theme Toggle - Desktop Only */}
            <button 
              onClick={toggleTheme}
              className="hidden md:block p-2 text-white/70 hover:text-white"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {/* Account */}
            <Link to="/account" className="p-2 text-white/70 hover:text-white">
              <User className="w-5 h-5" />
            </Link>
            
            {/* Wishlist */}
            <Link to="/wishlist" className="p-2 text-white/70 hover:text-white hidden sm:block">
              <Heart className="w-5 h-5" />
            </Link>
            
            {/* Cart */}
            <Link to="/cart" className="p-2 text-white/70 hover:text-white relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full text-xs flex items-center justify-center">
                3
              </span>
            </Link>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/70 hover:text-white md:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden ${isDarkMode ? 'bg-primary-900 border-primary-800' : 'bg-white border-gray-200'} border-t`}
          >
            <nav className="px-4 py-6 space-y-4">
              <Link 
                to="/category/new-arrivals" 
                className="flex items-center py-2 hover:text-accent-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                <TrendingUp className="w-5 h-5 mr-3" />
                NEW ARRIVALS
              </Link>
              <div className="py-2 space-y-1">
                <h3 className="text-sm font-semibold mb-2">CATEGORIES</h3>
                <Link 
                  to="/category/clothing" 
                  className="block py-2 pl-8 hover:text-accent-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Clothing
                </Link>
                <Link 
                  to="/category/gadgets" 
                  className="block py-2 pl-8 hover:text-accent-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Gadgets
                </Link>
                <Link 
                  to="/category/accessories" 
                  className="block py-2 pl-8 hover:text-accent-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Accessories
                </Link>
              </div>
              <Link 
                to="/bestsellers" 
                className="flex items-center py-2 hover:text-accent-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Package className="w-5 h-5 mr-3" />
                BESTSELLERS
              </Link>
              <Link 
                to="/sale" 
                className="flex items-center py-2 hover:text-accent-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart className="w-5 h-5 mr-3" />
                SALE
              </Link>
              
              {/* Theme Toggle - Mobile Only */}
              <button 
                onClick={toggleTheme}
                className="flex items-center py-2 w-full hover:text-accent-400"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-5 h-5 mr-3" />
                    Switch to Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5 mr-3" />
                    Switch to Dark Mode
                  </>
                )}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;