import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { mockLinks } from '../components/Sidebar/sidebar.mock';
import { MenuLink } from '../components/MenuLink';

export default {
  title: 'Sidebar',
  component: Sidebar,
};

export const SimpleLink = () => (
  <Sidebar>
    {mockLinks.map((link, idx) => (
      <MenuLink label={link.label} href={link.href} key={`${link.label}-${link.href}`} />
    ))}
  </Sidebar>
);
