import React, { FC } from 'react';
import { ButtonTypes } from './Button.types.';

export const Button: FC<ButtonTypes> = ({ label, onClick, className = 'base-button' }) => {
  return (
    <button className={className} onClick={onClick} type="button">
      {label}
    </button>
  );
};
