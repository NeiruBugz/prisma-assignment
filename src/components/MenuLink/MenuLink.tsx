import React, { FC } from 'react';
import { MenuLinkTypes } from './MenuLink.types';

export const MenuLink: FC<MenuLinkTypes> = ({ label, href, className = 'link' }) => (
  <a href={href} className={className}>
    {label}
  </a>
);
