import React from 'react';
import Gallery from './index';
import styles from './gallery.module.css';

export default {
  title: 'Components/Gallery',
  component: Gallery,
};

const mockImages = [
  { src: 'https://via.placeholder.com/400x300', alt: 'Image 1', title: 'Title 1' },
  { src: 'https://via.placeholder.com/400x300', alt: 'Image 2', title: 'Title 2' },
  { src: 'https://via.placeholder.com/400x300', alt: 'Image 3', title: 'Title 3' },
  { src: 'https://via.placeholder.com/400x300', alt: 'Image 4', title: 'Title 4' },
  { src: 'https://via.placeholder.com/400x300', alt: 'Image 5', title: 'Title 5' },
  { src: 'https://via.placeholder.com/400x300', alt: 'Image 6', title: 'Title 6' },
];

const Template = (args) => <Gallery {...args} />;

export const Default = Template.bind({});
Default.args = {
  images: mockImages,
};

export const Empty = Template.bind({});
Empty.args = {
  images: [],
};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
    images: mockImages,
    className: styles.customGallery,
};