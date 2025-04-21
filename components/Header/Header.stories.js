import React from 'react';
import Header from './index';
import styles from './header.module.css';
import HeaderContent from './HeaderContent';

export default {
  title: 'Components/Header',
  component: Header,
  decorators: [(Story) => <div className={styles.header}><Story /></div>],
};

const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
};

export const WithContent = Template.bind({});
WithContent.args = {
    children: <HeaderContent/>
};