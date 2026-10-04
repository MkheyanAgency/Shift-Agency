import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#b4f846] via-[#d4ff68] to-[#b4f846] origin-left z-[99999] shadow-[0_0_12px_rgba(180,248,70,0.85)] pointer-events-none"
      style={{ scaleX }}
    />
  );
}
