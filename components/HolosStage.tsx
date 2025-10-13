import React, { useState } from 'react';
import { motion } from 'motion/react';

interface HolosStageProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isPaused?: boolean;
  isInspectable?: boolean;
  onStageInteraction?: (action: 'grab' | 'rotate' | 'release') => void;
}

export function HolosStage({ 
  isPlaying, 
  currentTime, 
  duration,
  isPaused = false,
  isInspectable = false,
  onStageInteraction 
}: HolosStageProps) {
  const [stageRotation, setStageRotation] = useState({ x: 0, y: 0 });
  const [isManipulating, setIsManipulating] = useState(false);

  const progressPercentage = (currentTime / duration) * 100;
  
  return (
    <div className="relative w-full h-96 perspective-1000 overflow-hidden rounded-3xl">
      {/* VisionOS 26 Mixed Reality Background */}
      <div className="absolute inset-0">
        {/* Real-world living space background - VisionOS style */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1705321963943-de94bb3f0dd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaXZpbmclMjByb29tJTIwaW50ZXJpb3IlMjBtaW5pbWFsaXN0fGVufDF8fHx8MTc1OTYyODUzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
          }}
        />
        
        {/* Apple Vision Pro style depth-of-field blur */}
        <div className="absolute inset-0 bg-black/15 backdrop-blur-[2px]" style={{
          background: `
            radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.25) 70%),
            linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.3) 100%)
          `
        }} />
        
        {/* VisionOS passthrough lighting effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-transparent to-purple-500/12" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/5 to-transparent" />
        
        {/* Apple Vision Pro spatial mesh overlay */}
        <div className="absolute inset-0 opacity-15">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="visionos-mesh" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="rgba(99, 179, 237, 0.4)" />
                <line x1="0" y1="20" x2="40" y2="20" stroke="rgba(99, 179, 237, 0.2)" strokeWidth="0.5" />
                <line x1="20" y1="0" x2="20" y2="40" stroke="rgba(99, 179, 237, 0.2)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#visionos-mesh)" />
          </svg>
        </div>
        
        {/* Hand tracking visualization points */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-400/60 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-purple-400/60 rounded-full animate-pulse shadow-[0_0_8px_rgba(147,51,234,0.6)]" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-cyan-400/60 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.6)]" style={{ animationDelay: '1s' }} />
        
        {/* VisionOS 26 environment lighting indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-white/80 text-xs font-medium">Spatial</span>
        </div>
        
        {/* Passthrough quality indicator */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
          <svg className="w-3 h-3 text-white/80" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
          </svg>
          <span className="text-white/80 text-xs font-medium">HD</span>
        </div>
      </div>
      {/* Stage Platform - floating glass disc */}
      <motion.div 
        className="absolute left-1/2 bottom-8 transform -translate-x-1/2"
        style={{
          transformStyle: 'preserve-3d',
          transform: `translateX(-50%) rotateX(${stageRotation.x}deg) rotateY(${stageRotation.y}deg)`
        }}
        animate={{
          scale: isInspectable ? 1.1 : 1,
          y: isInspectable ? -20 : 0
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onMouseDown={() => {
          if (isInspectable) {
            setIsManipulating(true);
            onStageInteraction?.('grab');
          }
        }}
        onMouseUp={() => {
          setIsManipulating(false);
          onStageInteraction?.('release');
        }}
        className={isInspectable ? 'cursor-grab active:cursor-grabbing' : ''}
      >
        {/* Glass platform */}
        <div className="w-32 h-4 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
        </div>

        {/* Holographic grid lines on platform */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="grid grid-cols-8 grid-rows-2 h-full w-full opacity-30">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="border border-cyan-400/30" />
            ))}
          </div>
        </div>
      </motion.div>

      {/* 3D Avatar - translucent wireframe */}
      <motion.div 
        className="absolute left-1/2 bottom-12 transform -translate-x-1/2"
        style={{
          transformStyle: 'preserve-3d',
          transform: `translateX(-50%) rotateX(${stageRotation.x}deg) rotateY(${stageRotation.y}deg)`
        }}
        animate={{ 
          rotateY: isPlaying && !isPaused ? [0, 360] : stageRotation.y,
          scale: isPaused ? 1.1 : 1,
          opacity: isPaused ? 0.7 : 1
        }}
        transition={{ 
          rotateY: { duration: 8, repeat: isPlaying && !isPaused ? Infinity : 0, ease: "linear" },
          scale: { duration: 0.4 },
          opacity: { duration: 0.4 }
        }}
      >
        {/* Avatar body - wireframe effect */}
        <motion.div 
          className="relative"
          animate={{
            // Avatar moves in 3D space based on scrubber position
            x: Math.sin((currentTime / duration) * Math.PI * 4) * 20,
            z: Math.cos((currentTime / duration) * Math.PI * 3) * 15,
            rotateY: (currentTime / duration) * 720, // Two full rotations during timeline
            rotateX: Math.sin((currentTime / duration) * Math.PI * 2) * 10,
            y: Math.sin((currentTime / duration) * Math.PI * 6) * 8
          }}
          transition={{ 
            duration: 0.3, 
            ease: "easeOut",
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Head */}
          <motion.div 
            className="w-8 h-8 mx-auto mb-2 border-2 border-cyan-300/60 rounded-full bg-cyan-300/10 backdrop-blur-sm"
            animate={{
              rotateZ: Math.sin((currentTime / duration) * Math.PI * 8) * 15,
              scale: 1 + Math.sin((currentTime / duration) * Math.PI * 4) * 0.1
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="absolute inset-1 border border-cyan-300/40 rounded-full" />
          </motion.div>
          
          {/* Torso */}
          <motion.div 
            className="w-12 h-16 mx-auto border-2 border-cyan-300/60 bg-cyan-300/10 backdrop-blur-sm relative"
            animate={{
              rotateX: Math.sin((currentTime / duration) * Math.PI * 3) * 5,
              scaleY: 1 + Math.sin((currentTime / duration) * Math.PI * 5) * 0.05
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Wireframe lines */}
            <div className="absolute inset-2 border border-cyan-300/40" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-cyan-300/40 transform -translate-x-1/2" />
            <div className="absolute left-0 right-0 top-1/2 h-px bg-cyan-300/40 transform -translate-y-1/2" />
          </motion.div>
          
          {/* Arms */}
          <div className="flex justify-between absolute top-8 left-0 right-0">
            <motion.div 
              className="w-2 h-8 border border-cyan-300/60 bg-cyan-300/10 backdrop-blur-sm"
              animate={{ 
                rotateZ: isPlaying 
                  ? [0, 15, -15, 0] 
                  : Math.sin((currentTime / duration) * Math.PI * 6) * 25,
                rotateY: Math.cos((currentTime / duration) * Math.PI * 4) * 20,
                x: Math.sin((currentTime / duration) * Math.PI * 7) * 5
              }}
              transition={{ 
                duration: isPlaying ? 2 : 0.3, 
                repeat: isPlaying ? Infinity : 0,
                ease: "easeOut"
              }}
            />
            <motion.div 
              className="w-2 h-8 border border-cyan-300/60 bg-cyan-300/10 backdrop-blur-sm"
              animate={{ 
                rotateZ: isPlaying 
                  ? [0, -15, 15, 0] 
                  : Math.sin((currentTime / duration) * Math.PI * 6 + Math.PI) * 25,
                rotateY: Math.cos((currentTime / duration) * Math.PI * 4 + Math.PI) * 20,
                x: Math.sin((currentTime / duration) * Math.PI * 7 + Math.PI) * 5
              }}
              transition={{ 
                duration: isPlaying ? 2 : 0.3, 
                repeat: isPlaying ? Infinity : 0, 
                delay: isPlaying ? 0.5 : 0,
                ease: "easeOut"
              }}
            />
          </div>
          
          {/* Legs */}
          <motion.div 
            className="flex justify-center gap-2 mt-1"
            animate={{
              rotateX: Math.sin((currentTime / duration) * Math.PI * 4) * 8,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.div 
              className="w-2 h-12 border border-cyan-300/60 bg-cyan-300/10 backdrop-blur-sm"
              animate={{
                rotateZ: Math.sin((currentTime / duration) * Math.PI * 5) * 10,
                scaleY: 1 + Math.sin((currentTime / duration) * Math.PI * 8) * 0.1
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
            <motion.div 
              className="w-2 h-12 border border-cyan-300/60 bg-cyan-300/10 backdrop-blur-sm"
              animate={{
                rotateZ: Math.sin((currentTime / duration) * Math.PI * 5 + Math.PI) * 10,
                scaleY: 1 + Math.sin((currentTime / duration) * Math.PI * 8 + Math.PI) * 0.1
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          </motion.div>
        </motion.div>

        {/* Frozen effect for pause mode */}
        {isPaused && (
          <div className="absolute inset-0 bg-gradient-to-b from-blue-200/30 to-purple-200/30 backdrop-blur-sm rounded-lg border border-white/30">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-blue-300/20 animate-pulse" />
          </div>
        )}
      </motion.div>

      {/* Volumetric action markers floating in 3D space */}
      <motion.div 
        className="absolute left-1/4 top-1/4"
        animate={{ 
          scale: [1, 1.3, 1], 
          rotateY: [0, 360],
          z: [0, 20, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-4 h-4 bg-yellow-400/80 rounded-full shadow-[0_4px_16px_rgba(255,193,7,0.4)] border border-yellow-300/60">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-full" />
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute right-1/3 top-1/2"
        animate={{ 
          scale: [1, 1.3, 1], 
          rotateY: [0, -360],
          z: [0, 30, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          delay: 1,
          ease: "easeInOut"
        }}
      >
        <div className="w-4 h-4 bg-green-400/80 rounded-full shadow-[0_4px_16px_rgba(76,175,80,0.4)] border border-green-300/60">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-full" />
        </div>
      </motion.div>

      {/* Progress visualization as volumetric light beam */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)]"
          style={{ width: `${progressPercentage}%` }}
          animate={{ 
            boxShadow: isPlaying ? [
              '0_0_8px_rgba(6,182,212,0.6)',
              '0_0_16px_rgba(6,182,212,0.8)',
              '0_0_8px_rgba(6,182,212,0.6)'
            ] : '0_0_4px_rgba(6,182,212,0.4)'
          }}
          transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
        />
      </div>

      {/* Ambient lighting effects */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Environmental shadow casting */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-black/20 rounded-full blur-xl" />
    </div>
  );
}