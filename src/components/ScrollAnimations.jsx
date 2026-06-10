import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const fadeUp = {
  hidden: { opacity: 0, y: 34, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerGroup = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

export function Reveal({ children, as = 'div', className = '', delay = 0, ...props }) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      variants={{
        hidden: fadeUp.hidden,
        visible: {
          ...fadeUp.visible,
          transition: { ...fadeUp.visible.transition, delay },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.28 }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

export function Stagger({ children, as = 'div', className = '', ...props }) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      variants={staggerGroup}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ children, as = 'div', className = '', ...props }) {
  const Component = motion[as] || motion.div;

  return (
    <Component variants={fadeUp} className={className} {...props}>
      {children}
    </Component>
  );
}

export function ImageReveal({ children, className = '', intensity = 24 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [intensity, -intensity]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, clipPath: 'inset(10% 10% 10% 10%)' }}
      whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <motion.div style={{ y, scale }} className="h-full w-full">
        {children}
      </motion.div>
    </motion.div>
  );
}
