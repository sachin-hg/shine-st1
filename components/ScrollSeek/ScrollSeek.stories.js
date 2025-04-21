import React from 'react';
import ScrollSeek from './index';
import styles from './scrollSeek.module.css';

export default {
  title: 'Components/ScrollSeek',
  component: ScrollSeek,
  argTypes: {
    // Add any controls for props here if needed
  },
};

const Template = (args) => <ScrollSeek {...args} />;

const mockFrames = Array.from({ length: 94 }, (_, i) => ({
    src: `components/ScrollSeek/photoFrames/ezgif-frame-${(i + 1).toString().padStart(3, '0')}.png`,
    alt: `Frame ${i + 1}`,
  }));

export const Default = Template.bind({});
Default.args = {
  frames: mockFrames,
};

export const Empty = Template.bind({});
Empty.args = {
  frames: [],
};