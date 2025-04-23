import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Store, ArrowRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would connect to Firebase Auth
    console.log('Form submitted', { email, password, name });
  };
  
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-16">
        <div className="container-custom flex items-center justify-center py-16 min-h-[calc(100vh-64px)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="bg-primary-900 rounded-lg border border-primary-800 p-8">
              <div className="text-center mb-8">
                <Store className="w-12 h-12 text-accent-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold">
                  {isLogin ? 'Sign in to your account' : 'Create an account'}
                </h1>
                <p className="text-white/60 mt-2">
                  {isLogin 
                    ? 'Enter your credentials to access your account' 
                    : 'Join us for a futuristic shopping experience'}
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                )}
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input pr-10"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/60 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                
                {isLogin && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-accent-600 rounded border-primary-700 bg-primary-800 focus:ring-accent-500"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-white/70">
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <a href="#" className="text-accent-500 hover:text-accent-400">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                )}
                
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>
              
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-primary-800"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-primary-900 text-white/60">
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="btn btn-outline w-full"
                  >
                    Google
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline w-full"
                  >
                    Apple
                  </button>
                </div>
              </div>
              
              <div className="mt-8 text-center text-sm text-white/60">
                {isLogin ? (
                  <>
                    Don't have an account?{' '}
                    <button 
                      onClick={() => setIsLogin(false)}
                      className="text-accent-500 hover:text-accent-400 font-medium"
                    >
                      Create one <ArrowRight className="inline w-3 h-3" />
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button 
                      onClick={() => setIsLogin(true)}
                      className="text-accent-500 hover:text-accent-400 font-medium"
                    >
                      Sign in <ArrowRight className="inline w-3 h-3" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AuthPage;