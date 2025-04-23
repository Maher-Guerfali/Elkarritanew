import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { Product } from '../../types';

interface ProductGridProps {
  title: string;
  subtitle?: string;
  products: Product[];
}

const ProductGrid = ({ title, subtitle, products }: ProductGridProps) => {
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading products from API
    const timer = setTimeout(() => {
      setDisplayedProducts(products);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [products]);
  
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">{title}</h2>
          {subtitle && <p className="text-white/70 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
        
        {isLoading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="card animate-pulse">
                <div className="w-full h-[300px] bg-primary-800 rounded-t-lg" />
                <div className="p-4">
                  <div className="h-6 bg-primary-800 rounded mb-2 w-3/4" />
                  <div className="h-4 bg-primary-800 rounded mb-4 w-1/2" />
                  <div className="h-6 bg-primary-800 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {displayedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        )}
        
        <div className="text-center mt-12">
          <button className="btn btn-outline">View All Products</button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;