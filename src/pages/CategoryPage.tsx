import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { useQuery } from 'react-query';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductGrid from '../components/products/ProductGrid';
import { Product } from '../types';

// Category mappings remain unchanged
const categoryInfo = {
  clothing: {
    name: "Clothing",
    description: "Futuristic fashion and smart apparel for the modern lifestyle",
    banner: "https://images.pexels.com/photos/6347547/pexels-photo-6347547.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  gadgets: {
    name: "Gadgets",
    description: "Cutting-edge technology and innovative devices",
    banner: "https://images.pexels.com/photos/1337753/pexels-photo-1337753.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  accessories: {
    name: "Accessories",
    description: "Essential add-ons and smart accessories for your tech lifestyle",
    banner: "https://images.pexels.com/photos/1374910/pexels-photo-1374910.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  footwear: {
    name: "Footwear",
    description: "Advanced footwear with smart features and futuristic designs",
    banner: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  },
  "new-arrivals": {
    name: "New Arrivals",
    description: "The latest additions to our futuristic collection",
    banner: "https://images.pexels.com/photos/7147656/pexels-photo-7147656.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  }
};

const fetchProducts = async (slug: string | undefined) => {
  const endpoint = slug
    ? `http://localhost:5000/api/products?category=${slug}`
    : 'http://localhost:5000/api/products';
  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error('Error fetching products');
  }
  return res.json();
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: products = [], isLoading, error } = useQuery<Product[], Error>(
    ['products', slug],
    () => fetchProducts(slug)
  );
  
  // Get category info or fallback to default values
  const category = slug ? categoryInfo[slug as keyof typeof categoryInfo] : null;
  const categoryName = category?.name || 'Category';
  const categoryDescription = category?.description || 'Explore our products';
  const categoryBanner = category?.banner || '';
  
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-16">
        {/* Category Banner */}
        <div className="relative h-[300px] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${categoryBanner})` }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 w-full p-8">
            <div className="container-custom">
              {/* Breadcrumbs */}
              <nav className="flex items-center text-sm mb-4">
                <Link to="/" className="text-white/60 hover:text-white">Home</Link>
                <ChevronRight className="w-4 h-4 mx-2 text-white/40" />
                <span className="text-white">{categoryName}</span>
              </nav>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl font-bold mb-2">{categoryName}</h1>
                <p className="text-white/70 max-w-2xl">{categoryDescription}</p>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Product Listing */}
        <div className="container-custom py-12">
          <div className="mb-8 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link to="/" className="inline-flex items-center text-white/60 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Link>
              <span className="text-white/40">|</span>
              <span className="text-white/60">
                {isLoading ? 'Loading...' : `${products.length} products found`}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <label className="text-white/60 text-sm">Sort by:</label>
              <select className="bg-primary-800 border border-primary-700 rounded-md px-3 py-2 text-sm">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Best Selling</option>
              </select>
            </div>
          </div>
          
          {error ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-4">Failed to load products</h2>
              <p className="text-white/60">Please try again later.</p>
            </div>
          ) : isLoading ? (
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
          ) : products.length > 0 ? (
            <ProductGrid 
              title=""
              products={products}
            />
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-4">No Products Found</h2>
              <p className="text-white/60 mb-8">
                We couldn't find any products in this category. Check back soon as we update our inventory regularly.
              </p>
              <Link to="/" className="btn btn-primary">Back to Home</Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;