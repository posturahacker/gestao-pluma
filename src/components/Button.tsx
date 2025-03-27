
import React from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  asChild?: boolean;
  icon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    className = '', 
    onClick, 
    type = 'button',
    disabled = false,
    icon,
    ...props 
  }, ref) => {
    const variants = {
      primary: 'bg-psi-400 text-white hover:bg-psi-500 focus:ring-2 focus:ring-psi-300 focus:ring-offset-2 transition-all',
      secondary: 'bg-secondary text-foreground hover:bg-secondary/80 focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 transition-all',
      outline: 'bg-transparent text-psi-500 border border-psi-400 hover:bg-psi-50 focus:ring-2 focus:ring-psi-300 focus:ring-offset-2 transition-all',
      ghost: 'bg-transparent text-foreground hover:bg-secondary focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 transition-all',
      link: 'bg-transparent text-psi-500 underline-offset-4 hover:underline hover:text-psi-700 focus:ring-0 p-0 h-auto transition-all',
    };

    const sizes = {
      sm: 'text-sm px-3 py-1.5 rounded-md',
      md: 'text-base px-5 py-2.5 rounded-lg',
      lg: 'text-lg px-6 py-3 rounded-xl',
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'font-medium flex items-center justify-center gap-2 focus:outline-none disabled:opacity-60 disabled:pointer-events-none',
          variants[variant],
          variant !== 'link' && sizes[size],
          className
        )}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {icon && <span className="inline-flex">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
