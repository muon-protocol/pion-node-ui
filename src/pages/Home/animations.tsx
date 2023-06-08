import { FC, ReactNode, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
export const PlanAnimation: FC<{
  children: ReactNode;
  className?: string;
  delay: number;
}> = ({ delay, children, className }) => {
  const controls = useAnimation();

  useEffect(() => {
    window.addEventListener('load', () => {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: delay },
      });
    });
  }, [controls, delay]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 100 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};
