import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Trash2, 
  ChevronRight, 
  Plus, 
  Minus, 
  ShoppingBag,
  ShoppingCart,
  ArrowRight,
  Lock
} from 'lucide-react';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Product } from '../types';

// Mock cart items data
const mockCartItems = [
  {
    id: '1',
    product: {
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
    quantity: 2,
    productId: '1'
  },
  {
    id: '2',
    product: {
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
    quantity: 1,
    productId: '5'
  }
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  
  // Calculate order summary values
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal >= 100 ? 0 : 10.99;
  const discount = couponApplied ? subtotal * 0.1 : 0; // Simulating a 10% discount
  const total = subtotal + shipping - discount;
  
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  const handleApplyCoupon = () => {
    // In a real app, this would verify the coupon with an API
    if (couponCode.toUpperCase() === 'FUTURE10') {
      setCouponApplied(true);
    }
  };
  
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-16">
        <div className="container-custom py-16">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-primary-900 rounded-lg border border-primary-800 overflow-hidden">
                  <div className="p-6 border-b border-primary-800">
                    <h2 className="text-xl font-bold mb-4">Cart Items ({cartItems.length})</h2>
                    
                    <div className="space-y-6">
                      {cartItems.map((item) => (
                        <motion.div 
                          key={item.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col sm:flex-row gap-4"
                        >
                          <div className="w-full sm:w-24 h-24 bg-primary-800 rounded-lg overflow-hidden">
                            <img 
                              src={item.product.images[0]} 
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <h3 className="font-bold">{item.product.name}</h3>
                              <span className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</span>
                            </div>
                            
                            <p className="text-white/60 text-sm mb-4">{item.product.description.substring(0, 60)}...</p>
                            
                            <div className="flex justify-between items-center">
                              <div className="flex items-center border border-primary-700 rounded-md">
                                <button 
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  className="px-3 py-1 text-white/70 hover:text-white focus:outline-none"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-4 py-1">{item.quantity}</span>
                                <button 
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="px-3 py-1 text-white/70 hover:text-white focus:outline-none"
                                  disabled={item.quantity >= item.product.stock}
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              
                              <button 
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-error-500 hover:text-error-400 flex items-center"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                <span className="text-sm">Remove</span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex gap-4">
                      <input 
                        type="text" 
                        placeholder="Coupon code" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="input flex-1"
                      />
                      <button 
                        onClick={handleApplyCoupon}
                        className="btn btn-outline"
                        disabled={couponApplied}
                      >
                        {couponApplied ? 'Applied' : 'Apply'}
                      </button>
                    </div>
                    
                    {couponApplied && (
                      <p className="text-success-500 text-sm mt-2">
                        Coupon "FUTURE10" applied successfully!
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link to="/" className="text-accent-500 hover:text-accent-400 inline-flex items-center">
                    <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <div className="bg-primary-900 rounded-lg border border-primary-800 p-6 sticky top-24">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-white/70">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-white/70">Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    
                    {couponApplied && (
                      <div className="flex justify-between text-success-500">
                        <span>Discount (10%)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="border-t border-primary-800 pt-4 flex justify-between font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Link 
                    to="/checkout" 
                    className="btn btn-primary w-full flex items-center justify-center"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Checkout
                  </Link>
                  
                  <div className="mt-4 text-center text-white/60 text-sm">
                    <p>Secure Checkout</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-primary-900 rounded-lg border border-primary-800">
              <ShoppingCart className="w-16 h-16 text-white/30 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-white/60 mb-8 max-w-md mx-auto">
                Looks like you haven't added any products to your cart yet.
                Explore our catalog to find amazing futuristic products.
              </p>
              <Link to="/" className="btn btn-primary inline-flex items-center">
                <ShoppingBag className="mr-2 w-5 h-5" />
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;