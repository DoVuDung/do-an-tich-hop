import React from 'react';

import classes from './Button1.module.scss';

export default function Button1({
  buttonWidth = '100%',
  buttonFontSize = '1rem',
  buttonColor = 'var(--primary-color)',
  buttonFontWeight,
  type,
  onClick,
  disabled,
  className,
  textColor = '#000',

  ...props
}) {
  return (
    <button
      style={{
        '--button-width': buttonWidth,
        '--button-font-size': buttonFontSize,
        '--button-color': buttonColor,
        '--button-font-weight': buttonFontWeight,
        '--text-color': textColor,
      }}
      type={type || 'button'}
      className={`${classes.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {props.children}
    </button>
  );
}
