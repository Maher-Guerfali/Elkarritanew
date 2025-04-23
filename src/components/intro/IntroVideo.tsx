import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface IntroVideoProps {
  onComplete: () => void;
  videoPlayed: boolean;
  setVideoPlayed: (played: boolean) => void;
}

const IntroVideo = ({ onComplete, videoPlayed, setVideoPlayed }: IntroVideoProps) => {
  const [fadeAudio, setFadeAudio] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Mock video URL - in production this would be your actual video
  const videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-spinning-around-the-earth-29351-large.mp4";
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // Set to first frame
      videoRef.current.pause();
    }
  }, []);
  
  useEffect(() => {
    if (videoPlayed && videoRef.current) {
      // Start video playback after a short delay
      const playTimer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      }, 500);

      // Set up video end timing
      const videoEndTimer = setTimeout(() => {
        setFadeAudio(true);
        setTimeout(onComplete, 1000); // Fade out and complete after 1 second
      }, 10000); // Total video duration (10 seconds)

      return () => {
        clearTimeout(playTimer);
        clearTimeout(videoEndTimer);
      };
    }
  }, [videoPlayed, onComplete]);
  
  const handleStartClick = () => {
    setVideoPlayed(true);
    setShowVideo(true);
  };
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.video 
        ref={videoRef}
        className="w-full h-full object-cover"
        src={videoUrl}
        muted={fadeAudio}
        playsInline
        preload="auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: showVideo ? 1 : 0 }}
        transition={{ duration: 1 }}
        style={{ opacity: fadeAudio ? 0.5 : 1 }}
      />
      
      {!videoPlayed && (
        <motion.button
          className="absolute px-8 py-4 rounded-lg flex items-center 
                     border-2 border-accent-500 text-accent-500
                     hover:bg-accent-500 hover:text-white transition-all duration-300"
          onClick={handleStartClick}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Play className="mr-2" size={24} />
          Enter Website
        </motion.button>
      )}
    </motion.div>
  );
};

export default IntroVideo;