import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AlbumCarousel2 from './index';

// Mock the turn.js plugin
jest.mock('./turn/turn.min.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock images
jest.mock('./icons/fs.png', () => 'fs-mocked');
jest.mock('./icons/pause.png', () => 'pause-mocked');
jest.mock('./icons/play.png', () => 'play-mocked');
jest.mock('./icons/restart.png', () => 'restart-mocked');
jest.mock('./icons/thumb.png', () => 'thumb-mocked');
jest.mock('./rotate.png', () => 'rotate-mocked');

describe('AlbumCarousel2', () => {
  const mockAlbums = [
    { id: 1, name: 'Album 1', src: 'image1.jpg' },
    { id: 2, name: 'Album 2', src: 'image2.jpg' },
    { id: 3, name: 'Album 3', src: 'image3.jpg' },
  ];

  it('renders without crashing', () => {
    render(<AlbumCarousel2 albums={mockAlbums} />);
  });

  it('renders all images', () => {
    render(<AlbumCarousel2 albums={mockAlbums} />);
    mockAlbums.forEach((album) => {
      expect(screen.getByRole('img', { name: album.name })).toBeInTheDocument();
    });
  });

  it('renders all icons', () => {
    render(<AlbumCarousel2 albums={mockAlbums} />);
    expect(screen.getByAltText('Full Screen')).toBeInTheDocument();
    expect(screen.getByAltText('Play')).toBeInTheDocument();
    expect(screen.getByAltText('Pause')).toBeInTheDocument();
    expect(screen.getByAltText('Restart')).toBeInTheDocument();
    expect(screen.getByAltText('Thumb')).toBeInTheDocument();
  });

  it('plays and pauses the carousel', async () => {
    render(<AlbumCarousel2 albums={mockAlbums} />);
    const playButton = screen.getByAltText('Play');
    const pauseButton = screen.getByAltText('Pause');
    expect(playButton).toBeInTheDocument();
    fireEvent.click(playButton);
    await waitFor(() => expect(pauseButton).toBeInTheDocument());
    fireEvent.click(pauseButton);
    await waitFor(() => expect(playButton).toBeInTheDocument());
  });

  it('restarts the carousel', async () => {
    render(<AlbumCarousel2 albums={mockAlbums} />);
    const playButton = screen.getByAltText('Play');
    const restartButton = screen.getByAltText('Restart');

    expect(playButton).toBeInTheDocument();
    fireEvent.click(playButton);
    await waitFor(() => expect(restartButton).toBeInTheDocument());
    fireEvent.click(restartButton);

  });

  it('handles the edge case where no data is passed', () => {
    render(<AlbumCarousel2 albums={[]} />);
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('full screen button exists', () => {
      render(<AlbumCarousel2 albums={mockAlbums} />);
      const fsButton = screen.getByAltText('Full Screen');
      expect(fsButton).toBeInTheDocument();
  });

  it('thumb button exists', () => {
      render(<AlbumCarousel2 albums={mockAlbums} />);
      const thumbButton = screen.getByAltText('Thumb');
      expect(thumbButton).toBeInTheDocument();
  });
});