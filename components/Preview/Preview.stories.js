import React from 'react';
import Preview from './index';
import styles from './preview.module.css';

export default {
  title: 'Components/Preview',
  component: Preview,
  decorators: [
    (Story) => (
      <div className={styles.container}>
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => <Preview {...args} />;

const mockPreviewData = {
  title: 'Mock Preview Title',
  description: 'This is a mock description for the preview.',
  images: [
    { src: 'https://via.placeholder.com/150', alt: 'Mock Image 1' },
    { src: 'https://via.placeholder.com/150', alt: 'Mock Image 2' },
    { src: 'https://via.placeholder.com/150', alt: 'Mock Image 3' },
  ],
};

const mockEmptyPreviewData = {
  title: '',
  description: '',
  images: [],
};
export const Default = Template.bind({});
Default.args = {
  previewData: mockPreviewData,
};

export const EmptyPreview = Template.bind({});
EmptyPreview.args = {
  previewData: mockEmptyPreviewData,
};

export const NoImages = Template.bind({});
NoImages.args = {
    previewData: {
        ...mockPreviewData,
        images: []
    }
}

export const NoTitle = Template.bind({});
NoTitle.args = {
    previewData: {
        ...mockPreviewData,
        title: ""
    }
}

export const NoDescription = Template.bind({});
NoDescription.args = {
    previewData: {
        ...mockPreviewData,
        description: ""
    }
}

export const longTitle = Template.bind({});
longTitle.args = {
  previewData: {
    ...mockPreviewData,
    title: "This is a really long title to test the longTitle",
  },
};

export const longDescription = Template.bind({});
longDescription.args = {
    previewData: {
      ...mockPreviewData,
      description:
        "This is a very very long description to test the longDescription, we need to check how the component handles it.",
    },
  };