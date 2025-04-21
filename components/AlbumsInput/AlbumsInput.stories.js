import React from 'react';
import AlbumsInput from './index';
import styles from './albumsInput.module.css';

export default {
  title: 'Components/AlbumsInput',
  component: AlbumsInput,
  argTypes: {
    title: { control: 'text' },
  },
};

const Template = (args) => <AlbumsInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Default Title',
  image: '/img1.jpg' 
};

export const NoTitle = Template.bind({});
NoTitle.args = {
    image: '/img1.jpg',
  title: '',
};

export const NoImage = Template.bind({});
NoImage.args = {
  title: 'With Title no image',
  image: '',
};

export const CustomTitle = Template.bind({});
CustomTitle.args = {
    image: '/img1.jpg',
  title: 'Custom Title',
};