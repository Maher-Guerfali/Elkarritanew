import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  ChevronRight, 
  Check,
  ShoppingBag,
  Lock,
  ShieldCheck,
  CreditCardIcon,
  LucideWallet
} from 'lucide-react';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Mock cart items data (simplified from CartPage)
const mockCartItems = [
  {
    id: '1',
    product: {
      id: "1",
      name: "Future Tech T-Shirt",
      price: 49.99,
      images: ["https://images.pexels.com/photos/9594961/pexels-photo-9594961.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"],
    },
    quantity: 2,
  },
  {
    id: '2',
    product: {
      id: "5",
      name: "Hologram Projector",
      price: 399.99,
      images: ["https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"],
    },
    quantity: 1,
  }
];

const paymentMethods = [
  { id: 'credit-card', name: 'Credit Card', icon: CreditCardIcon },
  { id: 'paypal', name: 'PayPal', icon: LucideWallet },
];

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    saveInfo: true,
    paymentMethod: 'credit-card',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  
  // Calculate order summary values
  const subtotal = mockCartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal >= 100 ? 0 : 10.99;
  const tax = subtotal * 0.08; // Simulating 8% tax
  const total = subtotal + shipping + tax;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      // In a real app, this would submit the order to an API
      console.log('Order submitted', { formData, items: mockCartItems });
      
      // Navigate to confirmation page 
      setCurrentStep(3);
    }
  };
  
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-16">
        <div className="container-custom py-16">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          {/* Checkout Steps */}
          <div className="flex items-center mb-8">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-accent-500' : 'text-white/40'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                currentStep > 1 ? 'bg-accent-500 text-white' : 
                currentStep === 1 ? 'border-2 border-accent-500' : 'border-2 border-white/40'
              }`}>
                {currentStep > 1 ? <Check className="w-5 h-5" /> : '1'}
              </div>
              <span className="font-medium">Shipping</span>
            </div>
            
            <ChevronRight className="w-5 h-5 mx-4 text-white/40" />
            
            <div className={`flex items-center ${currentStep >= 2 ? 'text-accent-500' : 'text-white/40'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                currentStep > 2 ? 'bg-accent-500 text-white' : 
                currentStep === 2 ? 'border-2 border-accent-500' : 'border-2 border-white/40'
              }`}>
                {currentStep > 2 ? <Check className="w-5 h-5" /> : '2'}
              </div>
              <span className="font-medium">Payment</span>
            </div>
            
            <ChevronRight className="w-5 h-5 mx-4 text-white/40" />
            
            <div className={`flex items-center ${currentStep >= 3 ? 'text-accent-500' : 'text-white/40'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                currentStep === 3 ? 'bg-accent-500 text-white' : 'border-2 border-white/40'
              }`}>
                {currentStep === 3 ? <Check className="w-5 h-5" /> : '3'}
              </div>
              <span className="font-medium">Confirmation</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-primary-900 rounded-lg border border-primary-800 p-6">
                {/* Step 1: Shipping Information */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="input"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                            First Name
                          </label>
                          <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="input"
                            placeholder="Enter your first name"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                            Last Name
                          </label>
                          <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="input"
                            placeholder="Enter your last name"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium mb-2">
                          Address
                        </label>
                        <input
                          id="address"
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="input"
                          placeholder="Enter your street address"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="apartment" className="block text-sm font-medium mb-2">
                          Apartment, Suite, etc.
                        </label>
                        <input
                          id="apartment"
                          type="text"
                          name="apartment"
                          value={formData.apartment}
                          onChange={handleInputChange}
                          className="input"
                          placeholder="Apartment, suite, unit, etc. (optional)"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium mb-2">
                            City
                          </label>
                          <input
                            id="city"
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="input"
                            placeholder="Enter your city"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium mb-2">
                            ZIP Code
                          </label>
                          <input
                            id="zipCode"
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className="input"
                            placeholder="Enter your ZIP code"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium mb-2">
                            Country
                          </label>
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleSelectChange}
                            className="input"
                            required
                          >
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Australia">Australia</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-2">
                            Phone
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="input"
                            placeholder="Enter your phone number"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="saveInfo"
                          type="checkbox"
                          name="saveInfo"
                          checked={formData.saveInfo}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-accent-600 rounded border-primary-700 bg-primary-800 focus:ring-accent-500"
                        />
                        <label htmlFor="saveInfo" className="ml-2 block text-sm text-white/70">
                          Save this information for next time
                        </label>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4">
                        <Link to="/cart" className="text-accent-500 hover:text-accent-400 inline-flex items-center">
                          <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
                          Back to Cart
                        </Link>
                        
                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          Continue to Payment
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
                
                {/* Step 2: Payment Information */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-bold mb-6">Payment Information</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-4">
                          Select Payment Method
                        </label>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          {paymentMethods.map((method) => {
                            const Icon = method.icon;
                            return (
                              <label 
                                key={method.id}
                                className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${
                                  formData.paymentMethod === method.id 
                                    ? 'border-accent-500 bg-primary-800' 
                                    : 'border-primary-700 hover:border-primary-600'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="paymentMethod"
                                  value={method.id}
                                  checked={formData.paymentMethod === method.id}
                                  onChange={handleInputChange}
                                  className="sr-only"
                                />
                                <Icon className="w-5 h-5 mr-2" />
                                <span>{method.name}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                      
                      {formData.paymentMethod === 'credit-card' && (
                        <div className="space-y-6">
                          <div>
                            <label htmlFor="cardName" className="block text-sm font-medium mb-2">
                              Name on Card
                            </label>
                            <input
                              id="cardName"
                              type="text"
                              name="cardName"
                              value={formData.cardName}
                              onChange={handleInputChange}
                              className="input"
                              placeholder="Enter name on card"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">
                              Card Number
                            </label>
                            <input
                              id="cardNumber"
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              className="input"
                              placeholder="XXXX XXXX XXXX XXXX"
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="expiryDate" className="block text-sm font-medium mb-2">
                                Expiry Date
                              </label>
                              <input
                                id="expiryDate"
                                type="text"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleInputChange}
                                className="input"
                                placeholder="MM/YY"
                                required
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="cvv" className="block text-sm font-medium mb-2">
                                CVV
                              </label>
                              <input
                                id="cvv"
                                type="text"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleInputChange}
                                className="input"
                                placeholder="XXX"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="border-t border-primary-800 pt-6 mt-6">
                        <div className="flex justify-between items-center">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(1)}
                            className="text-accent-500 hover:text-accent-400 inline-flex items-center"
                          >
                            <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
                            Back to Shipping
                          </button>
                          
                          <button
                            type="submit"
                            className="btn btn-primary inline-flex items-center"
                          >
                            <Lock className="w-4 h-4 mr-2" />
                            Complete Order
                          </button>
                        </div>
                      </div>
                    </form>
                  </motion.div>
                )}
                
                {/* Step 3: Confirmation */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
                    
                    <p className="text-white/70 mb-8 max-w-lg mx-auto">
                      Your order has been placed and will be processed shortly. An email with your order 
                      details has been sent to {formData.email}.
                    </p>
                    
                    <div className="bg-primary-800 rounded-lg p-4 mb-6 inline-block">
                      <p className="text-white/70">Order Number</p>
                      <p className="text-xl font-bold">#FTR-38924</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                      <Link to="/account/orders" className="btn btn-outline inline-flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        View Order
                      </Link>
                      
                      <Link to="/" className="btn btn-primary inline-flex items-center justify-center">
                        Continue Shopping
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-primary-900 rounded-lg border border-primary-800 p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {mockCartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-primary-800 rounded-lg overflow-hidden mr-3">
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium line-clamp-1">{item.product.name}</p>
                          <p className="text-white/60 text-sm">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-primary-800 pt-4 mb-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-white/70">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-white/70">Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-white/70">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t border-primary-800 pt-4 flex justify-between font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center text-white/60 text-sm">
                  <ShieldCheck className="w-4 h-4 mr-2 text-accent-500" />
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutPage;