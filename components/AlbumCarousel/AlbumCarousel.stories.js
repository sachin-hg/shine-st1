import React from 'react';
import AlbumCarousel from './index';

export default {
  title: 'Components/AlbumCarousel',
  component: AlbumCarousel,
  argTypes: {
    // Add any argTypes if needed, e.g.,
    // albums: { control: 'object' },
  },
};

const Template = (args) => <AlbumCarousel {...args} />;

// Mock data for albums
const mockAlbums = [
  { id: 1, title: 'Album 1', imageUrl: '/path/to/image1.jpg' },
  { id: 2, title: 'Album 2', imageUrl: '/path/to/image2.jpg' },
  { id: 3, title: 'Album 3', imageUrl: '/path/to/image3.jpg' },
  { id: 4, title: 'Album 4', imageUrl: '/path/to/image4.jpg' },
  { id: 5, title: 'Album 5', imageUrl: '/path/to/image5.jpg' },
  // ... more albums
];

// Mock data for icons
const mockIcons = {
  fs: '/path/to/fs.png',
  pause: '/path/to/pause.png',
  play: '/path/to/play.png',
  restart: '/path/to/restart.png',
  thumb: '/path/to/thumb.png',
};

export const Default = Template.bind({});
Default.args = {
  albums: mockAlbums,
  icons: mockIcons,
};

export const Empty = Template.bind({});
Empty.args = {
  albums: [],
  icons: mockIcons,
};

export const WithFewAlbums = Template.bind({});
WithFewAlbums.args = {
  albums: mockAlbums.slice(0, 2),
  icons: mockIcons,
};