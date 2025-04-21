import React from 'react';
import AlbumPage from './index';

export default {
  title: 'Components/AlbumPage',
  component: AlbumPage,
  argTypes: {
  },
};

const Template = (args) => <AlbumPage {...args} />;

const mockAlbumData = {
  title: 'Mock Album Title',
  images: [
    { src: 'https://via.placeholder.com/150', alt: 'Mock Image 1' },
    { src: 'https://via.placeholder.com/150', alt: 'Mock Image 2' },
    { src: 'https://via.placeholder.com/150', alt: 'Mock Image 3' },
  ],
  content: 'This is the content of the mock album.',
  tags: ['tag1','tag2', 'tag3']
};

export const Default = Template.bind({});
Default.args = {
  album: mockAlbumData,
};

export const Empty = Template.bind({});
Empty.args = {
  album: {},
};

export const Loading = Template.bind({});
Loading.args = {
    album: {
        loading: true
    }
};
export const NoContent = Template.bind({});
NoContent.args = {
    album: {
        title: 'Mock Album Title',
        images: [
            { src: 'https://via.placeholder.com/150', alt: 'Mock Image 1' },
            { src: 'https://via.placeholder.com/150', alt: 'Mock Image 2' },
            { src: 'https://via.placeholder.com/150', alt: 'Mock Image 3' },
        ],
        content: '',
        tags: []
    }
};