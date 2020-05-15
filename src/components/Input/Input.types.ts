import { InputHTMLAttributes } from 'react';

export interface InputTypes extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: HTMLElement['className'];
}
