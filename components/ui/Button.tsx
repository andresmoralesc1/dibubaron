'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { playClickSound } from '@/lib/sounds';
import { lightVibration } from '@/lib/haptics';
import { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'youtube' | 'ghost' | 'filter';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  href?: string;
  external?: boolean;
  active?: boolean;
  withSound?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-r from-fun-pink to-fun-purple text-white shadow-lg hover:shadow-xl hover:from-fun-purple hover:to-fun-pink',
  secondary: 'bg-white text-fun-purple border-2 border-fun-purple hover:bg-fun-purple hover:text-white shadow-md',
  youtube: 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl',
  ghost: 'bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800',
  filter: 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md',
};

const activeVariants: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-r from-fun-purple to-fun-pink text-white shadow-xl',
  secondary: 'bg-fun-purple text-white border-2 border-fun-purple shadow-lg',
  youtube: 'bg-red-700 text-white shadow-xl',
  ghost: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white',
  filter: 'bg-gradient-to-r from-fun-pink to-fun-purple text-white shadow-lg',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  href,
  external = false,
  active = false,
  withSound = true,
  className = '',
  onClick,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-fun-purple/30';
  const variantClasses = active ? activeVariants[variant] : variants[variant];
  const sizeClasses = sizes[size];
  const widthClasses = fullWidth ? 'w-full' : '';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (withSound) {
      playClickSound();
      lightVibration();
    }
    onClick?.(e);
  };

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClasses} ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (withSound) {
            playClickSound();
            lightVibration();
          }
        }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClasses} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      {...props}
    >
      {content}
    </motion.button>
  );
}
