import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Store, ArrowLeft } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-16">
        <motion.div 
          className="container-custom flex items-center justify-center py-16 min-h-[calc(100vh-64px)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <Store className="w-16 h-16 text-accent-500 mx-auto mb-6" />
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              The page you are looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="btn btn-primary inline-flex items-center">
              <ArrowLeft className="mr-2 w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFoundPage;