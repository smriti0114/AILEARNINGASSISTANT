import React from 'react'

const Button = ({
    children,
    onClick,
    type='button',
    disabled=false,
    className='',
    variant='primary',
    size='md'
}) => {
    const baseStyles= 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 whitespace-nowrap';

    const variantStyles= {
        primary: 'bg-primary text-surface shadow-sm hover:bg-primary-hover',
        secondary: 'bg-page text-body hover:bg-border-subtle',
        outline: 'bg-surface border border-border-subtle text-body hover:bg-page hover:border-muted'
    };

    const sizeStyles = {
      sm: 'h-9 px-4 text-xs',
      md: 'h-11 px-5 text-sm',
    };

    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={[
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        ].join(' ')}
      >
        {children}
      </button>
    );
}

export default Button