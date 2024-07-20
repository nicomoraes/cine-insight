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
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          initial={{ y: 100, x: '-50%' }}
          className='fixed inset-x-1/2 bottom-10 z-50 inline-flex w-max items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-[0_0_10px_-5px_#000000] transition-colors duration-150 hover:bg-primary/90'
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0 })}
        >
          <CaretUp className='mr-2 h-4 w-4' weight='bold' />
          <span>Voltar para o topo</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
