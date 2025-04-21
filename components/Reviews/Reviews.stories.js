import React from 'react';
import Reviews from './index';
import styles from './reviews.module.css';

export default {
  title: 'Components/Reviews',
  component: Reviews,
};

const mockReviews = [
  {
    id: 1,
    name: 'John Doe',
    review: 'Amazing service! I would definitely recommend them to anyone.',
    image: '/img1.jpg', 
  },
  {
    id: 2,
    name: 'Jane Smith',
    review: 'I loved the quality of their work. They captured all the special moments perfectly.',
    image: '/img1.jpg',
  },
  {
    id: 3,
    name: 'Peter Jones',
    review: 'Great team! They were very professional and friendly.',
    image: '/img1.jpg',
  },
];

const Template = (args) => <Reviews {...args} />;

export const Default = Template.bind({});
Default.args = {
  reviews: mockReviews,
};

export const EmptyReviews = Template.bind({});
EmptyReviews.args = {
  reviews: [],
};

export const SingleReview = Template.bind({});
SingleReview.args = {
    reviews: [mockReviews[0]]
};

export const ManyReviews = Template.bind({});
ManyReviews.args = {
    reviews: [...mockReviews, ...mockReviews, ...mockReviews]
};