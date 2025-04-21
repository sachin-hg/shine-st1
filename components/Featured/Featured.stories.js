import React from 'react';
import Featured from './index';
import styles from './featured.module.css';

export default {
  title: 'Components/Featured',
  component: Featured,
  argTypes: {
    featured: { control: 'object' },
  },
};

const Template = (args) => <Featured {...args} />;

const mockFeaturedData = [
  {
    image: { src: '/images/featured/ifp.png', alt: 'IFP' },
    title: 'IFP',
    subtitle: 'Indian Federation of Photography',
  },
  {
    image: { src: '/images/featured/junebug.png', alt: 'Junebug' },
    title: 'Junebug',
    subtitle: 'Junebug Weddings',
  },
  {
    image: { src: '/images/featured/llf.png', alt: 'LLF' },
    title: 'LLF',
    subtitle: 'Lookslikefilm',
  },
  {
    image: { src: '/images/featured/risingStar.png', alt: 'Rising Star' },
    title: 'Rising Star',
    subtitle: 'Rising Star Awards',
  },
  {
    image: { src: '/images/featured/tnl.png', alt: 'TNL' },
    title: 'TNL',
    subtitle: 'The Knot Legacy',
  },
  {
    image: { src: '/images/featured/wedmegood.webp', alt: 'WedMeGood' },
    title: 'WedMeGood',
    subtitle: 'WedMeGood Pro',
  },
];

export const Default = Template.bind({});
Default.args = {
  featured: mockFeaturedData,
};

export const Empty = Template.bind({});
Empty.args = {
  featured: [],
};