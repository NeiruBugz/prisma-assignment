import React from 'react';
import { action } from '@storybook/addon-actions';
import { MenuLink } from '../components/MenuLink';

export default {
  title: 'MenuLink',
  component: MenuLink,
};

export const SimpleLink = () => <MenuLink onClick={action('Clicked fake link')} label="Fake Link" />;
