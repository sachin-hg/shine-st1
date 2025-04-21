import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AlbumRenderer from './index';

jest.mock('./music_animation.gif', () => 'music_animation.gif');
jest.mock('./shine_logo.png', () => 'shine_logo.png');
jest.mock('./defaultMusic.mp3', () => 'defaultMusic.mp3');

describe('AlbumRenderer', () => {
  it('renders without crashing', () => {
    render(<AlbumRenderer />);
    expect(screen.getByTestId('album-renderer')).toBeInTheDocument();
  });

  it('renders music animation', () => {
    render(<AlbumRenderer />);
    const musicAnimation = screen.getByAltText('Music Animation');
    expect(musicAnimation).toBeInTheDocument();
    expect(musicAnimation.src).toContain('music_animation.gif');
  });

  it('renders shine logo', () => {
    render(<AlbumRenderer />);
    const shineLogo = screen.getByAltText('Shine Logo');
    expect(shineLogo).toBeInTheDocument();
    expect(shineLogo.src).toContain('shine_logo.png');
  });

  it('loads default music when no music prop is provided', async () => {
    render(<AlbumRenderer />);
    const audio = screen.getByTestId('audio-element');
    await waitFor(() => {
      expect(audio.src).toContain('defaultMusic.mp3');
    });
  });

  it('renders all images', async () => {
    const mockImages = [
      { url: 'image1.jpg', title: 'Image 1' },
      { url: 'image2.jpg', title: 'Image 2' },
    ];
    render(<AlbumRenderer images={mockImages} />);

    await waitFor(() => {
      mockImages.forEach(image => {
        const img = screen.getByAltText(image.title);
        expect(img).toBeInTheDocument();
        expect(img.src).toContain(image.url);
      });
    });
  });

  it('renders correctly when no images are provided', () => {
    render(<AlbumRenderer images={[]} />);
    expect(screen.queryByAltText('Image 1')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Image 2')).not.toBeInTheDocument();
  });

  it('renders correctly when no data is provided', async () => {
    render(<AlbumRenderer />);
    expect(screen.getByTestId('album-renderer')).toBeInTheDocument();
    const audio = screen.getByTestId('audio-element');
    await waitFor(() => {
      expect(audio.src).toContain('defaultMusic.mp3');
    });
    const musicAnimation = screen.getByAltText('Music Animation');
    expect(musicAnimation).toBeInTheDocument();
    expect(musicAnimation.src).toContain('music_animation.gif');
  });
});