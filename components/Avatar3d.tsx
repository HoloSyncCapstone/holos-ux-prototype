import React from 'react';
import { motion } from 'motion/react';
import { FloatingPanel } from './FloatingPanel';

interface Avatar3DProps {
  isPlaying: boolean;
  viewMode: 'first-person' | 'third-person';
  currentTime: number;
}

export function Avatar3D({ isPlaying, viewMode, currentTime }: Avatar3DProps) {
  return (
    <FloatingPanel className="relative h-96 overflow-hidden" variant="overlay">
      {/* 3D Avatar Viewport */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20">
        {/* Grid floor for depth perception */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-30">
          <div className="grid grid-cols-8 grid-rows-4 h-full w-full">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="border border-white/10" />
            ))}
          </div>
        </div>
        
        {/* Avatar placeholder - would be 3D model in real app */}
        <motion.div 
          className="absolute left-1/2 bottom-16 transform -translate-x-1/2"
          animate={{ 
            rotateY: isPlaying ? [0, 10, -10, 0] : 0,
            y: isPlaying ? [0, -5, 0] : 0 
          }}
          transition={{ 
            duration: 2, 
            repeat: isPlaying ? Infinity : 0,
            ease: "easeInOut" 
          }}
        >
          <div className="w-24 h-32 bg-gradient-to-b from-blue-400/60 to-blue-600/60 rounded-lg shadow-2xl backdrop-blur-sm border border-white/20">
            {/* Simple avatar representation */}
            <div className="w-6 h-6 bg-orange-300/80 rounded-full mx-auto mt-2 mb-1" />
            <div className="w-16 h-20 bg-blue-500/40 rounded-lg mx-auto" />
            <div className="flex gap-1 justify-center mt-1">
              <div className="w-2 h-8 bg-blue-400/60 rounded" />
              <div className="w-2 h-8 bg-blue-400/60 rounded" />
            </div>
          </div>
        </motion.div>

        {/* Action markers - floating at key points */}
        <motion.div 
          className="absolute left-1/3 top-1/3"
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-3 h-3 bg-yellow-400 rounded-full shadow-lg ring-2 ring-yellow-400/50" />
        </motion.div>
        
        <motion.div 
          className="absolute right-1/3 top-1/2"
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg ring-2 ring-green-400/50" />
        </motion.div>
      </div>

      {/* View mode indicator */}
      <div className="absolute top-4 left-4">
        <div className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
          <span className="text-white/90 text-sm">
            {viewMode === 'first-person' ? '1st Person' : '3rd Person'}
          </span>
        </div>
      </div>

      {/* Performance indicator */}
      <div className="absolute top-4 right-4">
        <div className="px-3 py-1 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-400/30">
          <span className="text-green-300 text-sm">92% Accuracy</span>
        </div>
      </div>
    </FloatingPanel>
  );
}