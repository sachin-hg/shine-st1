import React from 'react';
import Carousel from './index';
import styles from './carousel.module.css';

export default {
  title: 'Components/Carousel',
  component: Carousel,
};

const Template = (args) => <Carousel {...args} />;

const mockImages = [
    { src: 'https://via.placeholder.com/300x200?text=Image+1', alt: 'Image 1' },
    { src: 'https://via.placeholder.com/300x200?text=Image+2', alt: 'Image 2' },
    { src: 'https://via.placeholder.com/300x200?text=Image+3', alt: 'Image 3' },
    { src: 'https://via.placeholder.com/300x200?text=Image+4', alt: 'Image 4' },
  ];

export const Default = Template.bind({});
Default.args = {
  children: mockImages.map((image, index) => (
    <div key={index} className={styles.item}>
        <img src={image.src} alt={image.alt} />
    </div>
  )),
  autoPlay: false
};

export const AutoPlay = Template.bind({});
AutoPlay.args = {
  children: mockImages.map((image, index) => (
    <div key={index} className={styles.item}>
        <img src={image.src} alt={image.alt} />
    </div>
  )),
  autoPlay: true,
};

export const EmptyCarousel = Template.bind({});
EmptyCarousel.args = {
  children: [],
  autoPlay: false
};