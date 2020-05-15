import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '../components/Button';

export default {
  title: 'Button',
  component: Button,
};

export const Text = () => (
  <Button onClick={action('clicked')} label="Hello Button" className="datagrid__button base-button" />
);

export const Emoji = () => {
  const label = (
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  );

  return <Button onClick={action('clicked')} label={label} />;
};
