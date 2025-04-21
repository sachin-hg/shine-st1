import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AlbumPage from './index';

describe('AlbumPage', () => {
  const mockAlbumData = {
    title: 'Test Album',
    description: 'This is a test album',
    images: [
      { url: '/test-image1.jpg', title: 'Test Image 1' },
      { url: '/test-image2.jpg', title: 'Test Image 2' },
    ],
  };

  it('renders title and description', () => {
    render(<AlbumPage album={mockAlbumData} />);
    expect(screen.getByText('Test Album')).toBeInTheDocument();
    expect(screen.getByText('This is a test album')).toBeInTheDocument();
  });

  it('renders images', async () => {
    render(<AlbumPage album={mockAlbumData} />);
    await waitFor(() => {
      expect(screen.getByAltText('Test Image 1')).toBeInTheDocument();
      expect(screen.getByAltText('Test Image 2')).toBeInTheDocument();
    });
  });
  it('renders correct number of images', async () => {
    render(<AlbumPage album={mockAlbumData} />);
    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images.length).toBe(2);
    });
  });

  it('renders nothing when no data is passed', () => {
    render(<AlbumPage />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

    it('renders nothing if there are no images', async () => {
      const noImages = {
        title: 'Test Album',
        description: 'This is a test album',
        images: [],
      };
    render(<AlbumPage album={noImages} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Album')).toBeInTheDocument();
  });
});