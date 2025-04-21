import React from 'react';
import ServicePage from './index';
import styles from './services.module.css';

export default {
  title: 'Components/ServicePage',
  component: ServicePage,
  argTypes: {
    data: { control: 'object' },
  },
};

const Template = (args) => <ServicePage {...args} />;

const mockData = {
  title: 'Sample Service',
  description: 'This is a sample service description.',
  images: [
    { url: 'https://via.placeholder.com/400x300?text=Service+Image+1' },
    { url: 'https://via.placeholder.com/400x300?text=Service+Image+2' },
    { url: 'https://via.placeholder.com/400x300?text=Service+Image+3' },
  ],
  tags: ['Tag1', 'Tag2', 'Tag3'],
  pin: 'sample-pin'
};

export const Default = Template.bind({});
Default.args = {
  data: mockData,
};

export const NoImages = Template.bind({});
NoImages.args = {
  data: {
    ...mockData,
    images: [],
  },
};

export const NoTags = Template.bind({});
NoTags.args = {
  data: {
    ...mockData,
    tags: [],
  },
};

export const LongDescription = Template.bind({});
LongDescription.args = {
  data: {
    ...mockData,
    description:
      'This is a very long description to test how the component handles text overflow. '.repeat(10),
  },
};

export const NoData = Template.bind({});
NoData.args = {
    data: {}
};