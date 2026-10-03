import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for fluid trailing effect
  const springX = useSpring(mouseX, { damping: 28, stiffness: 250 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 250 });

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-50 w-72 h-72 rounded-full bg-[#b4f846]/10 blur-[90px] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{
        left: springX,
        top: springY
      }}
    />
  );
}
