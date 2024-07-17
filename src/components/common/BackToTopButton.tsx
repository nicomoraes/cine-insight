'use client';

import { useState } from 'react';

import { CaretUp } from '@phosphor-icons/react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';

export default function BackToTopButton() {
  const { scrollYProgress } = useScroll();

  const [showButton, setShowButton] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > 0.1 && !showButton) {
      setShowButton(true);
    }

    if (latest < 0.1 && showButton) {
      setShowButton(false);
    }
  });

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          className='fixed bottom-10 right-10 z-50 rounded-full bg-primary p-2 text-primary-foreground shadow-[0_0_10px_-5px_#000000]'
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0 })}
        >
          <CaretUp className='h-10 w-10' />
          <span className='sr-only'>Voltar para o topo</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
