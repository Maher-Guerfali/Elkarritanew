import { motion } from 'framer-motion';

interface SlidingBannerProps {
  text: string;
  className?: string;
}

const SlidingBanner = ({ text, className = '' }: SlidingBannerProps) => {
  return (
    <div className={`bg-accent-600 py-6 overflow-hidden ${className}`}>
      <div className="sliding-text">
        <div className="sliding-text-inner whitespace-nowrap">
          {/* Repeat the text to create continuous flow */}
          {Array(10).fill(text).map((text, index) => (
            <span key={index} className="text-3xl font-bold uppercase mr-8">
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlidingBanner;