import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
}

// Mock data - in a real app this would come from an API
const slides: Slide[] = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/7147656/pexels-photo-7147656.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "The Future of Fashion",
    subtitle: "Experience our latest collection of cutting-edge designs",
    cta: "Shop Now",
    link: "/category/new-arrivals"
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/5709656/pexels-photo-5709656.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Next-Gen Gadgets",
    subtitle: "Discover the technology of tomorrow, today",
    cta: "Explore",
    link: "/category/gadgets"
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Limited Edition Drops",
    subtitle: "Exclusive collections available for a limited time only",
    cta: "Shop Collection",
    link: "/limited-edition"
  }
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    // Auto-advance slides
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  return (
    <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => (
          index === currentSlide && (
            <motion.div
              key={slide.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center text-center px-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="max-w-2xl"
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-lg md:text-xl mb-8 text-white/80">{slide.subtitle}</p>
                  <a 
                    href={slide.link} 
                    className="btn btn-primary"
                  >
                    {slide.cta}
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>
      
      {/* Navigation buttons */}
      <button 
        onClick={prevSlide} 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white/80 hover:bg-black/50 hover:text-white transition-all z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={nextSlide} 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white/80 hover:bg-black/50 hover:text-white transition-all z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;