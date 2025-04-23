import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroBanner from '../components/home/HeroBanner';
import CategoryGrid from '../components/home/CategoryGrid';
import SlidingBanner from '../components/layout/SlidingBanner';
import ProductGrid from '../components/products/ProductGrid';
import { Product } from '../types';

const fetchProducts = async () => {
  const res = await fetch('http://localhost:5000/api/products');
  if (!res.ok) {
    throw new Error('Error fetching products');
  }
  return res.json();
};

const HomePage = () => {
  const { data: products = [], isLoading, error } = useQuery<Product[]>('products', fetchProducts);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoading) setIsLoaded(true);
  }, [isLoading]);

  const newArrivals = products.filter(p => p.isNew);
  const featured = products.filter(p => p.isFeatured);

  if (error) return <div>Error loading products</div>;

  return (
    <motion.div
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
      }}
    >
      <div className="pt-16">
        <Navbar />
        <main>
          <HeroBanner />
          <CategoryGrid />
          <SlidingBanner text="Limited Time Offers • Exclusive Drops • Future Tech • Limited Time Offers • Exclusive Drops" />
          <ProductGrid 
            title="New Arrivals" 
            subtitle="The latest additions to our futuristic collection" 
            products={newArrivals}
          />
          <ProductGrid 
            title="Featured Products" 
            subtitle="Handpicked selections to elevate your lifestyle" 
            products={featured}
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