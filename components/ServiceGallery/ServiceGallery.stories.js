import React from 'react';
import ServiceGallery from './index';
import styles from './gallery.module.css';

export default {
  title: 'Components/ServiceGallery',
  component: ServiceGallery,
  argTypes: {
    gallery: { control: 'object' },
  },
};

const Template = (args) => <ServiceGallery {...args} />;

const mockGalleryData = [
  {
    id: '1',
    url: 'https://via.placeholder.com/400x300?text=Service+1',
    alt: 'Service 1',
  },
  {
    id: '2',
    url: 'https://via.placeholder.com/400x300?text=Service+2',
    alt: 'Service 2',
  },
  {
    id: '3',
    url: 'https://via.placeholder.com/400x300?text=Service+3',
    alt: 'Service 3',
  },
  {
    id: '4',
    url: 'https://via.placeholder.com/400x300?text=Service+4',
    alt: 'Service 4',
  },
  {
    id: '5',
    url: 'https://via.placeholder.com/400x300?text=Service+5',
    alt: 'Service 5',
  },
  {
    id: '6',
    url: 'https://via.placeholder.com/400x300?text=Service+6',
    alt: 'Service 6',
  },
  {
    id: '7',
    url: 'https://via.placeholder.com/400x300?text=Service+7',
    alt: 'Service 7',
  },
];

export const Default = Template.bind({});
Default.args = {
  gallery: mockGalleryData,
};

export const EmptyGallery = Template.bind({});
EmptyGallery.args = {
  gallery: [],
};

export const OneImage = Template.bind({});
OneImage.args = {
    gallery: [
        {
            id: '1',
            url: 'https://via.placeholder.com/400x300?text=Service+1',
            alt: 'Service 1',
          }
    ]
}