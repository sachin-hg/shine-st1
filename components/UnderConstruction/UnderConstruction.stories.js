import React from 'react';
import UnderConstruction from './index';
import styles from './underConstruction.module.css';

export default {
  title: 'Components/UnderConstruction',
  component: UnderConstruction,
  decorators: [
    (Story) => (
      <div className={styles.container}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <UnderConstruction {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Under Construction',
  message: 'This page is currently under construction. Please check back later.',
};

export const CustomMessage = Template.bind({});
CustomMessage.args = {
  title: 'Coming Soon',
  message: 'We are working hard to bring you something amazing. Stay tuned!',
};