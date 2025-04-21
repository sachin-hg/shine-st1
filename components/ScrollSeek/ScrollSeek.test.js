import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScrollSeek from './index';

jest.mock('next/image', () => ({ src, alt }) => <img src={src} alt={alt} />);

describe('ScrollSeek', () => {
  const mockFrames = [
    '/photoFrames/ezgif-frame-001.png',
    '/photoFrames/ezgif-frame-002.png',
  ];

  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
  });

  it('renders without crashing', () => {
    render(<ScrollSeek frames={mockFrames} />);
    expect(screen.getByAltText('frame')).toBeInTheDocument();
  });

  it('renders the first frame by default', () => {
    render(<ScrollSeek frames={mockFrames} />);
    const image = screen.getByAltText('frame');
    expect(image).toHaveAttribute('src', mockFrames[0]);
  });

  it('updates frame on scroll', async () => {
    render(<ScrollSeek frames={mockFrames} />);
    const image = screen.getByAltText('frame');

    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
        expect(image).toHaveAttribute('src', mockFrames[1]);
      });
    
  });

  it('renders the first frame when no frames are passed', () => {
    render(<ScrollSeek frames={[]} />);
    const image = screen.getByAltText('frame');
    expect(image).toHaveAttribute('src', '/photoFrames/ezgif-frame-001.png');
  });

  it('renders the first frame when null frames are passed', () => {
    render(<ScrollSeek frames={null} />);
    const image = screen.getByAltText('frame');
    expect(image).toHaveAttribute('src', '/photoFrames/ezgif-frame-001.png');
  });

  it('renders correctly with many frames', async () => {
    const manyFrames = Array.from({ length: 94 }, (_, i) => `/photoFrames/ezgif-frame-${(i + 1).toString().padStart(3, '0')}.png`);
    render(<ScrollSeek frames={manyFrames} />);
    const image = screen.getByAltText('frame');

    act(() => {
      window.scrollY = 200;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
        expect(image.src).not.toBe(manyFrames[0]);
      });
  });

  it('updates the frame correctly when scrolling past the total number of frames', async () => {
    const fewFrames = ['/photoFrames/ezgif-frame-001.png', '/photoFrames/ezgif-frame-002.png','/photoFrames/ezgif-frame-003.png'];
    render(<ScrollSeek frames={fewFrames} />);
    const image = screen.getByAltText('frame');

    act(() => {
      window.scrollY = 10000;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
        expect(image.src).not.toBe(fewFrames[0]);
      });
  });
});