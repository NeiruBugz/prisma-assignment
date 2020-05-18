import React, { FC } from 'react';
import { InputTypes } from './Input.types';

export const Input: FC<InputTypes> = ({
  label,
  onChange,
  id,
  labelClassName = 'input__label',
  className = 'input--base',
  placeholder,
  defaultValue,
  type = 'text',
}) => (
  <label htmlFor={id} className={labelClassName}>
    {label}
    <input id={id} className={className} placeholder={placeholder} onChange={onChange} type={type} />
  </label>
);
