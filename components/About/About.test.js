import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import About from '../../components/About/index';

describe('About Component', () => {
  const mockServicethumbnails = [
    { url: 'image1.jpg', tags: ['Service 1', 'pin1'] },
    { url: 'image2.jpg', tags: ['Service 2', 'pin2'] },
    { url: 'image3.jpg', tags: ['Service 3', 'pin3'] },
    { url: 'image4.jpg', tags: ['Service 4', 'pin4'] },
    { url: 'image5.jpg', tags: ['Service 5', 'pin5'] },
  ];

  const mockOpen = jest.fn();
  global.window = Object.create(window);
  Object.defineProperty(window, 'open', {
    value: mockOpen,
    writable: true,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title and subtitle correctly', () => {
    render(<About servicethumbnails={mockServicethumbnails} />);
    expect(screen.getByText('Capturing moments')).toBeInTheDocument();
    expect(screen.getByText(/We understand the importance of preserving memories/)).toBeInTheDocument();
  });

  it('renders carousel with correct number of tiles', () => {
    render(<About servicethumbnails={mockServicethumbnails} />);
    const tiles = screen.getAllByRole('img');
    expect(tiles.length).toBe(mockServicethumbnails.length);
  });
  it('renders images correctly', () => {
    render(<About servicethumbnails={mockServicethumbnails} />);
    const images = screen.getAllByRole('img');
    images.forEach((image, index) => {
      expect(image).toHaveAttribute('alt', mockServicethumbnails[index].tags[0]);
      expect(image).toHaveAttribute('src', mockServicethumbnails[index].url);
    });
  });

  it('renders titles correctly', () => {
    render(<About servicethumbnails={mockServicethumbnails} />);
    const titleElements = screen.getAllByText(/Service/);
    expect(titleElements.length).toBe(mockServicethumbnails.length)
  });

  it('opens link when tile is clicked', () => {
    render(<About servicethumbnails={mockServicethumbnails} />);
    const tile = screen.getAllByText(/Service 1/)[0].closest('div')
    fireEvent.click(tile);
    expect(mockOpen).toHaveBeenCalledWith('/services/pin1', '_blank');
  });

  it('renders without crashing when servicethumbnails is empty', () => {
    render(<About servicethumbnails={[]} />);
    expect(screen.getByText('Capturing moments')).toBeInTheDocument();
    expect(screen.getByText(/We understand the importance of preserving memories/)).toBeInTheDocument();
  });

  it('does not open link when tile has no pin', () => {
    const emptyPinService = [{ url: 'image.jpg', tags: ['No Pin'] }];
    render(<About servicethumbnails={emptyPinService} />);
    const tile = screen.getByText('No Pin').closest('div');
    fireEvent.click(tile);
    expect(mockOpen).not.toHaveBeenCalled();
  });
});