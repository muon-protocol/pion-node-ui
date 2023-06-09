import { FC, ReactNode, useEffect } from 'react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';

export const MoveUpIn: FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
}> = ({ delay, duration, children, className, y }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        duration: duration || 0.5,
        delay: delay || 0,
        ease: 'easeOut',
      },
    });
  }, [controls, delay, duration]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: y || 100 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export const MoveRightIn: FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}> = ({ delay, duration, children, className }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      x: 0,
      transition: { duration: duration || 0.5, delay: delay || 0 },
    });
  }, [controls, delay, duration]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -50 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export const FadeIn: FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}> = ({ delay, duration, children, className }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: { duration: duration || 0.5, delay: delay || 0 },
    });
  }, [controls, delay, duration]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export const BottomToTop: FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}> = ({ delay, duration, children, className }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: duration || 0.3, delay: delay || 0 },
    });
  }, [controls, delay, duration]);

  return (
    <AnimatePresence>
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 20 }}
        exit={{ opacity: 1, y: 0 }}
        animate={controls}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
