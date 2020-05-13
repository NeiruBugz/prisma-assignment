import React from 'react';

import { MenuLink } from '../MenuLink';

import { mockLinks } from './sidebar.mock';

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      {mockLinks.map((link, idx) => (
        <MenuLink label={link.label} href={link.href} key={`${link.label}-${link.href}`} />
      ))}
    </aside>
  );
};
