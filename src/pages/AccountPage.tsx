import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Package, 
  Heart, 
  CreditCard, 
  MapPin, 
  Settings, 
  LogOut,
  Store
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Account subpages
const ProfilePage = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">My Profile</h2>
    <div className="bg-primary-900 rounded-lg border border-primary-800 p-6">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 bg-primary-800 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-accent-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold">John Doe</h3>
          <p className="text-white/60">john.doe@example.com</p>
        </div>
      </div>
      
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">First Name</label>
            <input type="text" className="input" defaultValue="John" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Last Name</label>
            <input type="text" className="input" defaultValue="Doe" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input type="email" className="input" defaultValue="john.doe@example.com" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input type="tel" className="input" defaultValue="+1 (234) 567-8901" />
        </div>
        
        <div>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
);

const OrdersPage = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">My Orders</h2>
    <div className="bg-primary-900 rounded-lg border border-primary-800 p-6">
      <div className="mb-6 border-b border-primary-800 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold">Order #10293</h3>
            <p className="text-white/60 text-sm">Placed on 15 Apr 2025</p>
          </div>
          <span className="px-3 py-1 bg-success-500 text-white text-xs font-semibold rounded-full">
            Delivered
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary-800 rounded-lg"></div>
          <div className="w-16 h-16 bg-primary-800 rounded-lg"></div>
          <div className="text-white/60">+2 more items</div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="font-medium">$349.97</span>
          <button className="text-accent-500 hover:text-accent-400 text-sm font-medium">
            View Details
          </button>
        </div>
      </div>
      
      <div className="mb-6 border-b border-primary-800 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold">Order #10285</h3>
            <p className="text-white/60 text-sm">Placed on 02 Apr 2025</p>
          </div>
          <span className="px-3 py-1 bg-warning-500 text-white text-xs font-semibold rounded-full">
            Shipped
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary-800 rounded-lg"></div>
          <div className="text-white/60">+1 more item</div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="font-medium">$129.99</span>
          <button className="text-accent-500 hover:text-accent-400 text-sm font-medium">
            View Details
          </button>
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold">Order #10274</h3>
            <p className="text-white/60 text-sm">Placed on 21 Mar 2025</p>
          </div>
          <span className="px-3 py-1 bg-success-500 text-white text-xs font-semibold rounded-full">
            Delivered
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary-800 rounded-lg"></div>
          <div className="w-16 h-16 bg-primary-800 rounded-lg"></div>
          <div className="w-16 h-16 bg-primary-800 rounded-lg"></div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="font-medium">$219.97</span>
          <button className="text-accent-500 hover:text-accent-400 text-sm font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  </div>
);

const WishlistPage = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-primary-900 rounded-lg border border-primary-800 p-6 flex">
        <div className="w-24 h-24 bg-primary-800 rounded-lg mr-4"></div>
        <div className="flex-1">
          <h3 className="font-bold mb-1">Smart Watch Pro</h3>
          <p className="text-white/60 text-sm mb-2">Next generation smartwatch</p>
          <div className="flex items-center justify-between">
            <span className="font-medium">$299.99</span>
            <button className="btn btn-sm btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
      
      <div className="bg-primary-900 rounded-lg border border-primary-800 p-6 flex">
        <div className="w-24 h-24 bg-primary-800 rounded-lg mr-4"></div>
        <div className="flex-1">
          <h3 className="font-bold mb-1">Tech Hoodie</h3>
          <p className="text-white/60 text-sm mb-2">Temperature-regulating hoodie</p>
          <div className="flex items-center justify-between">
            <span className="font-medium">$89.99</span>
            <button className="btn btn-sm btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
      
      <div className="bg-primary-900 rounded-lg border border-primary-800 p-6 flex">
        <div className="w-24 h-24 bg-primary-800 rounded-lg mr-4"></div>
        <div className="flex-1">
          <h3 className="font-bold mb-1">Hologram Projector</h3>
          <p className="text-white/60 text-sm mb-2">Portable hologram projector</p>
          <div className="flex items-center justify-between">
            <span className="font-medium">$399.99</span>
            <button className="btn btn-sm btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AddressesPage = () => (
  <div>
    <h2 className="text-2xl font-bold mb-6">My Addresses</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-primary-900 rounded-lg border border-primary-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Home</h3>
          <span className="px-3 py-1 bg-accent-500 text-white text-xs font-semibold rounded-full">
            Default
          </span>
        </div>
        <p className="text-white/80 mb-1">John Doe</p>
        <p className="text-white/60 mb-1">123 Future Street</p>
        <p className="text-white/60 mb-1">Apt 4B</p>
        <p className="text-white/60 mb-1">Digital City, DC 10001</p>
        <p className="text-white/60 mb-4">United States</p>
        <div className="flex gap-2">
          <button className="text-accent-500 hover:text-accent-400 text-sm font-medium">Edit</button>
          <span className="text-white/40">|</span>
          <button className="text-error-500 hover:text-error-400 text-sm font-medium">Delete</button>
        </div>
      </div>
      
      <div className="bg-primary-900 rounded-lg border border-primary-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Work</h3>
        </div>
        <p className="text-white/80 mb-1">John Doe</p>
        <p className="text-white/60 mb-1">456 Tech Avenue</p>
        <p className="text-white/60 mb-1">Floor 12</p>
        <p className="text-white/60 mb-1">Future City, FC 20002</p>
        <p className="text-white/60 mb-4">United States</p>
        <div className="flex gap-2">
          <button className="text-accent-500 hover:text-accent-400 text-sm font-medium">Edit</button>
          <span className="text-white/40">|</span>
          <button className="text-error-500 hover:text-error-400 text-sm font-medium">Delete</button>
        </div>
      </div>
      
      <button className="bg-primary-900 rounded-lg border border-dashed border-primary-700 p-6 text-center text-white/70 hover:bg-primary-800 hover:text-white transition-colors">
        <MapPin className="w-8 h-8 mx-auto mb-2" />
        <span className="font-medium">Add New Address</span>
      </button>
    </div>
  </div>
);

const AccountPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const sidebarItems = [
    { path: '/account', label: 'Profile', icon: User },
    { path: '/account/orders', label: 'Orders', icon: Package },
    { path: '/account/wishlist', label: 'Wishlist', icon: Heart },
    { path: '/account/addresses', label: 'Addresses', icon: MapPin },
    { path: '/account/payment', label: 'Payment Methods', icon: CreditCard },
    { path: '/account/settings', label: 'Settings', icon: Settings },
  ];
  
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-16">
        <div className="container-custom py-16">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full md:w-64 flex-shrink-0">
              <div className="bg-primary-900 rounded-lg border border-primary-800 p-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-primary-800 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-accent-500" />
                  </div>
                  <div>
                    <h3 className="font-bold">John Doe</h3>
                    <p className="text-white/60 text-sm">Member since 2025</p>
                  </div>
                </div>
                
                <nav className="space-y-1">
                  {sidebarItems.map((item) => {
                    const isActive = currentPath === item.path || 
                      (currentPath.includes(item.path) && item.path !== '/account');
                    const Icon = item.icon;
                    
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                          isActive 
                            ? 'bg-accent-600 text-white' 
                            : 'text-white/70 hover:bg-primary-800 hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {item.label}
                      </Link>
                    );
                  })}
                  
                  <button className="flex items-center px-3 py-2 rounded-md text-error-500 hover:bg-primary-800 transition-colors w-full">
                    <LogOut className="w-5 h-5 mr-3" />
                    Sign Out
                  </button>
                </nav>
              </div>
            </aside>
            
            {/* Content */}
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              key={currentPath}
            >
              <div className="bg-primary-900 rounded-lg border border-primary-800 p-6">
                <Routes>
                  <Route path="/" element={<ProfilePage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/addresses" element={<AddressesPage />} />
                  <Route path="/payment" element={<div>Payment Methods Page</div>} />
                  <Route path="/settings" element={<div>Settings Page</div>} />
                  <Route path="*" element={
                    <div className="text-center py-12">
                      <Store className="w-12 h-12 text-accent-500 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
                      <p className="text-white/60 mb-6">The page you are looking for doesn't exist.</p>
                      <Link to="/account" className="btn btn-primary">
                        Go to Profile
                      </Link>
                    </div>
                  } />
                </Routes>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AccountPage;