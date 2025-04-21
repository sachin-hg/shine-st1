import React from 'react';
import AlbumPageContainer from './index';

export default {
  title: 'Components/AlbumPageContainer',
  component: AlbumPageContainer,
};

const Template = (args) => <AlbumPageContainer {...args} />;

const mockAlbumData = {
  id: 'album1',
  title: 'Mock Album 1',
  images: [
    { url: 'https://via.placeholder.com/150', alt: 'Mock Image 1' },
    { url: 'https://via.placeholder.com/150', alt: 'Mock Image 2' },
  ],
};

const mockEmptyAlbumData = {
    id: 'album2',
    title: 'Mock Empty Album',
    images: [],
  };

export const Default = Template.bind({});
Default.args = {
  album: mockAlbumData,
};

export const EmptyAlbum = Template.bind({});
EmptyAlbum.args = {
  album: mockEmptyAlbumData,
};