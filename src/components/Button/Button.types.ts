import { ButtonHTMLAttributes } from 'react';

export interface ButtonTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  className?: string;
}
