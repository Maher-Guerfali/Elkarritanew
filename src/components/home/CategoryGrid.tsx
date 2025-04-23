import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

// Mock categories data
const categories = [
  {
    id: 1,
    name: "Clothing",
    image: "https://images.pexels.com/photos/6347547/pexels-photo-6347547.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    slug: "clothing"
  },
  {
    id: 2,
    name: "Gadgets",
    image: "https://images.pexels.com/photos/1337753/pexels-photo-1337753.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    slug: "gadgets"
  },
  {
    id: 3,
    name: "Accessories",
    image: "https://images.pexels.com/photos/1374910/pexels-photo-1374910.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    slug: "accessories"
  },
  {
    id: 4,
    name: "Footwear",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    slug: "footwear"
  }
];

const CategoryGrid = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      }
    }
  };
  
  return (
    <section className="py-16 bg-primary-950">
      <div className="container-custom">
        <h2 className="text-3xl font-bold mb-12 text-center">Shop by Category</h2>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.div 
              key={category.id} 
              variants={itemVariants}
              className="relative overflow-hidden rounded-lg group"
            >
              <Link to={`/category/${category.slug}`}>
                <div className="aspect-w-1 aspect-h-1 relative overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h3 className="text-2xl font-bold">{category.name}</h3>
                  <p className="text-white/80 mt-1 mb-4">Explore Collection</p>
                  <span className="inline-block text-sm font-medium py-2 border-b-2 border-accent-500">
                    Shop Now
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryGrid;