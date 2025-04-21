import React from 'react';
import Login from './index';
import styles from './login.module.css';

export default {
  title: 'Components/Login',
  component: Login,
  decorators: [
    (Story) => (
      <div className={styles.container}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <Login {...args} />;

export const Default = Template.bind({});
Default.args = {
};

export const WithError = Template.bind({});
WithError.args = {
    error: "Invalid credentials"
};