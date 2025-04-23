import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroBanner from '../components/home/HeroBanner';
import CategoryGrid from '../components/home/CategoryGrid';
import SlidingBanner from '../components/layout/SlidingBanner';
import ProductGrid from '../components/products/ProductGrid';
import { Product } from '../types';

// Mock product data - in a real app this would come from an API
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Future Tech T-Shirt",
    description: "Futuristic design with smart fabric technology",
    price: 49.99,
    images: ["https://images.pexels.com/photos/9594961/pexels-photo-9594961.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"],
    category: "clothing",
    tags: ["t-shirt", "fashion", "technology"],
    stock: 50,
    isNew: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    description: "Next generation smartwatch with holographic display",
    price: 299.99,
    images: ["https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"],
    category: "gadgets",
    tags: ["watch", "smart", "technology"],
    stock: 25,
    isNew: true,
    isFeatured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    name: "Neo Sneakers",
    description: "Self-lacing sneakers with adaptive cushioning",
    price: 189.99,
    images: ["https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"],
    category: "footwear",
    tags: ["shoes", "sneakers", "fashion"],
    stock: 30,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "4",
    name: "Digital Backpack",
    description: "Backpack with integrated charging station and security",
    price: 129.99,
    images: ["https://images.pexels.com/photos/1546003/pexels-photo-1546003.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"],
    category: "accessories",
    tags: ["backpack", "digital", "accessories"],
    stock: 20,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "5",
    name: "Hologram Projector",
    description: "Portable hologram projector for immersive experiences",
    price: 399.99,
    images: ["https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"],
    category: "gadgets",
    tags: ["projector", "hologram", "technology"],
    stock: 15,
    isFeatured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "6",
    name: "Ultra Sunglasses",
    description: "Smart sunglasses with AR display and UV protection",
    price: 249.99,
    images: ["https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"],
    category: "accessories",
    tags: ["sunglasses", "AR", "fashion"],
    stock: 35,
    isNew: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "7",
    name: "Tech Hoodie",
    description: "Temperature-regulating hoodie with built-in headphones",
    price: 89.99,
    images: ["https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"],
    category: "clothing",
    tags: ["hoodie", "fashion", "technology"],
    stock: 40,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "8",
    name: "Smart Wallet",
    description: "RFID-blocking wallet with location tracking",
    price: 79.99,
    images: ["https://images.pexels.com/photos/1374910/pexels-photo-1374910.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"],
    category: "accessories",
    tags: ["wallet", "smart", "accessories"],
    stock: 45,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate page load
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <motion.div
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={fadeInVariants}
    >
      <div className="pt-16"> {/* Padding-top for fixed navbar */}
        <Navbar />
        
        <main>
          <HeroBanner />
          
          <CategoryGrid />
          
          <SlidingBanner text="Limited Time Offers • Exclusive Drops • Future Tech • Limited Time Offers • Exclusive Drops" />
          
          <ProductGrid 
            title="New Arrivals" 
            subtitle="The latest additions to our futuristic collection" 
            products={mockProducts.filter(p => p.isNew)}
          />
          
          <ProductGrid 
            title="Featured Products" 
            subtitle="Handpicked selections to elevate your lifestyle" 
            products={mockProducts.filter(p => p.isFeatured)}
          />
          
          <section className="py-20 bg-accent-700">
            <div className="container-custom text-center">
              <h2 className="text-4xl font-bold mb-6">Join the Future</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Subscribe to our newsletter for the latest drops, exclusive offers, and futuristic insights.
              </p>
              <div className="max-w-md mx-auto flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="input rounded-r-none flex-grow"
                />
                <button className="btn bg-white text-accent-700 hover:bg-white/90 rounded-l-none">
                  Subscribe
                </button>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </motion.div>
  );
};

export default HomePage;