import React from 'react';
import Loader from './index';
import './loader.module.css';

export default {
  title: 'Components/Loader',
  component: Loader,
};

const Template = (args) => <Loader {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Loading = Template.bind({});
Loading.args = {
    loading: true,
};

export const NoLoading = Template.bind({});
NoLoading.args = {
    loading: false
};