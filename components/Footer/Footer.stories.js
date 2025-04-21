import React from 'react';
import Footer from './index';

export default {
  title: 'Components/Footer',
  component: Footer,
};

const Template = (args) => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {
  data:{
    address:'123 Main St, Anytown, USA',
    contact:'+1-555-555-5555',
    email:'info@example.com',
  }
};

export const Empty = Template.bind({});
Empty.args = {
  data:{
    address:'',
    contact:'',
    email:'',
  }
};

export const CustomAddress = Template.bind({});
CustomAddress.args = {
  data:{
    address:'456 Oak Ave, Springfield',
    contact:'+1-555-123-4567',
    email:'support@example.com',
  }
};