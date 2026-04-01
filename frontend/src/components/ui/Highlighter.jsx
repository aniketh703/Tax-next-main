import React from 'react';
import { motion } from 'framer-motion';

/**
 * Highlighter Component
 * Wraps text with a subtle background animation that simulates a marker highlight.
 * Triggered when the component enters the viewport.
 */
export const Highlighter = ({ 
  children, 
  color = "rgba(26, 77, 46, 0.12)", 
  delay = 0.2,
  duration = 0.8,
  className = "" 
}) => {
  return (
    <span className={`relative inline-block font-semibold ${className}`}>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ 
          delay, 
          duration, 
          ease: [0.65, 0, 0.35, 1] 
        }}
        style={{
          content: '""',
          position: 'absolute',
          left: '-2px',
          right: '-2px',
          bottom: '2px',
          height: '42%',
          backgroundColor: color,
          zIndex: -1,
          transformOrigin: 'left',
        }}
      />
      {children}
    </span>
  );
};

export default Highlighter;
