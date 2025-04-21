import React from 'react';
import Home from './index';
import styles from './home.module.css';

export default {
  title: 'Components/Home',
  component: Home,
  argTypes: {
    // You can define argTypes here if needed
  },
};

const Template = (args) => <Home {...args} />;

export const Default = Template.bind({});
Default.args = {
    // Mock data for the Default story
    text: "Default Text",
};

export const OtherVariation = Template.bind({});
OtherVariation.args = {
    // Mock data for another variation of the component
    text: "Another Variation",
};