import React from 'react';
import ServicePagePreview from './index';
import styles from './preview.module.css';

export default {
  title: 'Components/ServicePagePreview',
  component: ServicePagePreview,
  argTypes: {
    className: { control: 'text' },
    title: { control: 'text' },
    images: { control: 'object' },
    href: { control: 'text' },
  },
};

const Template = (args) => <ServicePagePreview {...args} />;

const mockData = {
    title:"Mock Title",
    images:[
        {
            url: "https://via.placeholder.com/150",
            tags:["tag1", "pin1"]
        },
        {
            url: "https://via.placeholder.com/150",
            tags:["tag2", "pin2"]
        },
    ],
    href:"/link"
}

export const Default = Template.bind({});
Default.args = {
  ...mockData
};

export const Empty = Template.bind({});
Empty.args = {
    ...mockData,
    title: "",
    images: [],
    href: ""
};

export const WithOneImage = Template.bind({});
WithOneImage.args = {
    ...mockData,
    images: mockData.images.slice(0, 1)
};

export const WithCustomStyles = Template.bind({});
WithCustomStyles.args = {
    ...mockData,
    className: styles.customStyle,
};