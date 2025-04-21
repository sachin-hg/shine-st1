import React from 'react';
import Carouselmage from './index';
import styles from './carouselImage.module.css';

export default {
  title: 'Components/Carouselmage',
  component: Carouselmage,
  argTypes: {
    image: { control: 'object' },
    className: { control: 'text' },
  },
};

const Template = (args) => <Carouselmage {...args} />;

const mockImage = {
    src: '/images/logo.png',
    alt: 'Mock Image',
};

export const Default = Template.bind({});
Default.args = {
    image: mockImage,
    className: styles.defaultClass,
};

export const NoImage = Template.bind({});
NoImage.args = {
    image: null,
    className: styles.noImageClass
};
export const CustomImage = Template.bind({});
CustomImage.args = {
    image: {
        src: '/images/icon.png',
        alt: "Custom Image"
    },
    className: styles.customClass,
};