import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Heart, 
  Share,
  ChevronRight,
  Star,
  Truck,
  RotateCcw,
  Shield,
  Plus,
  Minus
} from 'lucide-react';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Product } from '../types';

const fetchProductById = async (id: string) => {
  const res = await fetch(`http://localhost:5000/api/products/${id}`);
  if (!res.ok) {
    throw new Error('Error fetching product');
  }
  return res.json();
};

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useQuery<Product>(
    ['product', id],
    () => fetchProductById(id!),
    { enabled: !!id }
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="container-custom pt-32 pb-16">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="bg-primary-800 rounded-lg h-[500px] w-full" />
                <div className="flex gap-2 mt-4">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="bg-primary-800 w-24 h-24 rounded-lg" />
                  ))}
                </div>
              </div>
              <div>
                <div className="h-8 bg-primary-800 rounded w-3/4 mb-4" />
                <div className="h-6 bg-primary-800 rounded w-1/4 mb-6" />
                <div className="h-4 bg-primary-800 rounded w-full mb-3" />
                <div className="h-4 bg-primary-800 rounded w-full mb-3" />
                <div className="h-4 bg-primary-800 rounded w-3/4 mb-8" />
                <div className="h-12 bg-primary-800 rounded w-full mb-6" />
                <div className="h-12 bg-primary-800 rounded w-full" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="container-custom pt-32 pb-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-8">The product you are looking for does not exist or has been removed.</p>
          <a href="/" className="btn btn-primary">Return to Home</a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-16">
        <div className="container-custom py-16">
          <nav className="flex items-center text-sm mb-8">
            <a href="/" className="text-white/60 hover:text-white">Home</a>
            <ChevronRight className="w-4 h-4 mx-2 text-white/40" />
            <a href={`/category/${product.category}`} className="text-white/60 hover:text-white capitalize">
              {product.category}
            </a>
            <ChevronRight className="w-4 h-4 mx-2 text-white/40" />
            <span className="text-white">{product.name}</span>
          </nav>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-w-3 aspect-h-4 bg-primary-900 rounded-lg overflow-hidden mb-4">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-accent-600 text-white text-sm font-semibold rounded-md">
                    NEW
                  </span>
                )}
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button 
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border-2 ${selectedImage === index ? 'border-accent-500' : 'border-transparent'}`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {Array(5).fill(null).map((_, index) => (
                    <Star key={index} className={`w-4 h-4 ${index < 4 ? 'text-accent-500' : 'text-white/30'}`} />
                  ))}
                  <span className="ml-2 text-white/70">4.0 (36 reviews)</span>
                </div>
                <span className={product.stock > 0 ? 'text-success-500' : 'text-error-500'}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <p className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</p>
              <p className="text-white/70 mb-8">{product.description.split('.')[0]}.</p>
              <div className="flex items-center mb-8">
                <div className="flex items-center border border-primary-700 rounded-md mr-4">
                  <button 
                    onClick={decrementQuantity}
                    className="px-3 py-2 text-white/70 hover:text-white focus:outline-none"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button 
                    onClick={incrementQuantity}
                    className="px-3 py-2 text-white/70 hover:text-white focus:outline-none"
                    disabled={product.stock <= quantity}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-white/70">{product.stock} items available</span>
              </div>
              <div className="flex flex-wrap gap-4 mb-8">
                <button className="btn btn-primary flex-1">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                <button className="btn btn-outline p-3">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="btn btn-outline p-3">
                  <Share className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center">
                  <Truck className="w-5 h-5 text-accent-500 mr-3" />
                  <span className="text-sm text-white/70">Free shipping over $100</span>
                </div>
                <div className="flex items-center">
                  <RotateCcw className="w-5 h-5 text-accent-500 mr-3" />
                  <span className="text-sm text-white/70">30-day returns</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-accent-500 mr-3" />
                  <span className="text-sm text-white/70">2-year warranty</span>
                </div>
              </div>
              <div className="border-t border-primary-800 pt-8">
                <div className="flex mb-6">
                  <button 
                    className={`px-4 py-2 font-medium ${activeTab === 'description' ? 'text-white border-b-2 border-accent-500' : 'text-white/60 hover:text-white'}`}
                    onClick={() => setActiveTab('description')}
                  >
                    Description
                  </button>
                  <button 
                    className={`px-4 py-2 font-medium ${activeTab === 'details' ? 'text-white border-b-2 border-accent-500' : 'text-white/60 hover:text-white'}`}
                    onClick={() => setActiveTab('details')}
                  >
                    Details
                  </button>
                  <button 
                    className={`px-4 py-2 font-medium ${activeTab === 'reviews' ? 'text-white border-b-2 border-accent-500' : 'text-white/60 hover:text-white'}`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    Reviews (36)
                  </button>
                </div>
                <div>
                  {activeTab === 'description' && (
                    <p className="text-white/70">{product.description}</p>
                  )}
                  {activeTab === 'details' && (
                    <div className="space-y-4">
                      <div className="flex border-b border-primary-800 pb-3">
                        <span className="w-1/3 font-medium">Material</span>
                        <span className="w-2/3 text-white/70">Smart Fabric with Temperature Regulation</span>
                      </div>
                      <div className="flex border-b border-primary-800 pb-3">
                        <span className="w-1/3 font-medium">Technology</span>
                        <span className="w-2/3 text-white/70">Embedded Flexible LED</span>
                      </div>
                      <div className="flex border-b border-primary-800 pb-3">
                        <span className="w-1/3 font-medium">Battery Life</span>
                        <span className="w-2/3 text-white/70">50 Washes</span>
                      </div>
                      <div className="flex border-b border-primary-800 pb-3">
                        <span className="w-1/3 font-medium">Care</span>
                        <span className="w-2/3 text-white/70">Machine Washable on Gentle Cycle</span>
                      </div>
                    </div>
                  )}
                  {activeTab === 'reviews' && (
                    <div className="space-y-6">
                      {/* Reviews content */}
                      <button className="text-sm font-medium text-accent-500 hover:text-accent-400">
                        Read more reviews
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;