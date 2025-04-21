import React from 'react';
import AlbumRenderer from './index';

export default {
  title: 'Components/AlbumRenderer',
  component: AlbumRenderer,
  argTypes: {
  },
};

const Template = (args) => <AlbumRenderer {...args} />;

const mockData = {
  musicSrc: '/defaultMusic.mp3', 
  animationSrc: '/music_animation.gif', 
  logoSrc: '/shine_logo.png', 
};

export const Default = Template.bind({});
Default.args = {
  ...mockData,
};

export const NoMusic = Template.bind({});
NoMusic.args = {
    ...mockData,
    musicSrc: null,
}

export const NoAnimation = Template.bind({});
NoAnimation.args = {
    ...mockData,
    animationSrc: null,
}

export const NoLogo = Template.bind({});
NoLogo.args = {
    ...mockData,
    logoSrc: null
}

export const NoData = Template.bind({});
NoData.args = {}