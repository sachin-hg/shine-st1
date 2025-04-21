import React from 'react';
import About from './index';
import styles from './about.module.css';

export default {
  title: 'Components/About',
  component: About,
  decorators: [
    (Story) => (
      <div className={styles.container}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <About {...args} />;

const mockServiceThumbnails = [
  { url: 'https://via.placeholder.com/150', tags: ['Service 1', 'pin1'] },
  { url: 'https://via.placeholder.com/150', tags: ['Service 2', 'pin2'] },
  { url: 'https://via.placeholder.com/150', tags: ['Service 3', 'pin3'] },
  { url: 'https://via.placeholder.com/150', tags: ['Service 4', 'pin4'] },
  { url: 'https://via.placeholder.com/150', tags: ['Service 5', 'pin5'] },
  { url: 'https://via.placeholder.com/150', tags: ['Service 6', 'pin6'] },
  { url: 'https://via.placeholder.com/150', tags: ['Service 7', 'pin7'] },
  { url: 'https://via.placeholder.com/150', tags: ['Service 8', 'pin8'] },
];

export const Default = Template.bind({});
Default.args = {
  servicethumbnails: mockServiceThumbnails,
};

export const Empty = Template.bind({});
Empty.args = {
  servicethumbnails: [],
};

export const SingleThumbnail = Template.bind({});
SingleThumbnail.args = {
  servicethumbnails: [{ url: 'https://via.placeholder.com/150', tags: ['Service 1', 'pin1'] }],
};