export const groupItemVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { type: 'spring', stiffness: 500, damping: 30 },
};
