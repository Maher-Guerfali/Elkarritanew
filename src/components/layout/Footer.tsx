import { Link } from 'react-router-dom';
import { 
  Store, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary-900 border-t border-primary-800 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <Store className="w-8 h-8 text-accent-500 mr-2" />
              <span className="text-xl font-bold tracking-tight">El Karrita</span>
            </div>
            <p className="text-white/60 mb-6">
              Experience the future of shopping with our cutting-edge e-commerce platform.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-primary-800 rounded-full hover:bg-accent-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-primary-800 rounded-full hover:bg-accent-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-primary-800 rounded-full hover:bg-accent-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-primary-800 rounded-full hover:bg-accent-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/category/new-arrivals" className="text-white/60 hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/bestsellers" className="text-white/60 hover:text-white transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/sale" className="text-white/60 hover:text-white transition-colors">
                  Sale
                </Link>
              </li>
              <li>
                <Link to="/category/clothing" className="text-white/60 hover:text-white transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/category/gadgets" className="text-white/60 hover:text-white transition-colors">
                  Gadgets
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-white/60 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-white/60 hover:text-white transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/60 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-white/60 hover:text-white transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-white/60 hover:text-white transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-accent-500 mr-3 mt-0.5" />
                <span className="text-white/60">
                  Sousse,Khezema EST
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-accent-500 mr-3" />
                <a href="tel:+12345678901" className="text-white/60 hover:text-white transition-colors">
                  (+216) 23237006
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-accent-500 mr-3" />
                <a href="mailto:maher.guerfali@gmail.com" className="text-white/60 hover:text-white transition-colors">
                  maher.guerfali@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-800 text-white/40 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} El Karrita. All rights reserved.</p>
            
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;