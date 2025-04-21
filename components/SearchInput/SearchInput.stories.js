import React from 'react';
import SearchInput from './index';
import styles from './searchInput.module.css';

export default {
  title: 'Components/SearchInput',
  component: SearchInput,
  argTypes: {
    
  },
};

const Template = (args) => <SearchInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  
};

export const WithText = Template.bind({});
WithText.args = {
    text : 'Search something',
};

export const WithAnimation = Template.bind({});
WithAnimation.args = {
    
};