import React from 'react';
import AlbumCarousel2 from './index';
import styles from './carousel.module.css';

export default {
  title: 'Components/AlbumCarousel2',
  component: AlbumCarousel2,
  argTypes: {
    
  },
};

const Template = (args) => <AlbumCarousel2 {...args} />;

const mockData = [
  {
    url: 'https://via.placeholder.com/150',
    title: 'Image 1',
    description: 'Description 1',
  },
  {
    url: 'https://via.placeholder.com/150',
    title: 'Image 2',
    description: 'Description 2',
  },
  {
    url: 'https://via.placeholder.com/150',
    title: 'Image 3',
    description: 'Description 3',
  },
  {
    url: 'https://via.placeholder.com/150',
    title: 'Image 4',
    description: 'Description 4',
  },
];

export const Default = Template.bind({});
Default.args = {
  images: mockData,
};

export const Empty = Template.bind({});
Empty.args = {
  images: [],
};

export const WithMultipleImages = Template.bind({});
WithMultipleImages.args = {
  images: [...mockData, ...mockData, ...mockData],
};