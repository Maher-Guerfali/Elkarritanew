import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          {/* Main product image */}
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-2 py-1 text-xs font-semibold bg-accent-600 text-white rounded-md">
                NEW
              </span>
            )}
            
            {product.isFeatured && (
              <span className="px-2 py-1 text-xs font-semibold bg-primary-700 text-white rounded-md">
                FEATURED
              </span>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 bg-primary-800 rounded-full hover:bg-primary-700 transition-colors">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-white/60 text-sm mb-2 line-clamp-1">{product.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
            
            <button className="p-2 bg-accent-600 rounded-full hover:bg-accent-700 transition-colors">
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;