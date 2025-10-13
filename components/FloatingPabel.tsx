import React from 'react';
import { motion } from 'motion/react';

interface FloatingPanelProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'overlay';
  blur?: boolean;
}

export function FloatingPanel({ 
  children, 
  className = '', 
  variant = 'primary',
  blur = true 
}: FloatingPanelProps) {
  const baseClasses = "rounded-2xl border border-white/20";
  
  const variantClasses = {
    primary: "bg-white/10 backdrop-blur-xl shadow-2xl",
    secondary: "bg-white/5 backdrop-blur-lg shadow-lg",
    overlay: "bg-black/20 backdrop-blur-2xl shadow-xl"
  };

  const blurClasses = blur ? variantClasses[variant] : "bg-white/95 shadow-xl";

  return (
    <motion.div 
      className={`${baseClasses} ${blurClasses} ${className}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      {children}
    </motion.div>
  );
}