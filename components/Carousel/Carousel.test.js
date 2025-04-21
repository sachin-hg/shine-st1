import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Carousel from './index';

describe('Carousel Component', () => {
  const mockItems = [
    { id: 1, content: 'Item 1', src:"image1.jpg" },
    { id: 2, content: 'Item 2', src:"image2.jpg" },
    { id: 3, content: 'Item 3', src:"image3.jpg" },
  ];

  it('renders carousel items correctly', () => {
    render(<Carousel items={mockItems} />);
    mockItems.forEach(item => {
      expect(screen.getByText(item.content)).toBeInTheDocument();
    });
  });

  it('renders all icons', () => {
    render(<Carousel items={mockItems} />);
    expect(screen.getByAltText('play')).toBeInTheDocument();
    expect(screen.getByAltText('pause')).toBeInTheDocument();
    expect(screen.getByAltText('restart')).toBeInTheDocument();
    expect(screen.getByAltText('fs')).toBeInTheDocument();
  });

  it('starts playing automatically if autoPlay is true', async () => {
    render(<Carousel items={mockItems} autoPlay={true} />);
    
    await waitFor(() => {
        const pauseIcon = screen.getByAltText('pause');
        expect(pauseIcon).toBeInTheDocument();
    });
  });

  it('pauses and plays on button click', async () => {
    render(<Carousel items={mockItems} autoPlay={true} />);
    
    await waitFor(() => {
        const pauseIcon = screen.getByAltText('pause');
        expect(pauseIcon).toBeInTheDocument();
    });

    const pauseButton = screen.getByAltText('pause').closest('button');
    fireEvent.click(pauseButton);

    await waitFor(() => {
        const playIcon = screen.getByAltText('play');
        expect(playIcon).toBeInTheDocument();
    });

    const playButton = screen.getByAltText('play').closest('button');
    fireEvent.click(playButton);

    await waitFor(() => {
        const pauseIcon = screen.getByAltText('pause');
        expect(pauseIcon).toBeInTheDocument();
    });
  });

  it('restarts the carousel on restart button click', async () => {
    render(<Carousel items={mockItems} autoPlay={true} />);

    await waitFor(() => {
        const pauseIcon = screen.getByAltText('pause');
        expect(pauseIcon).toBeInTheDocument();
    });
    const restartButton = screen.getByAltText('restart').closest('button');
    fireEvent.click(restartButton);

    await waitFor(() => {
        const pauseIcon = screen.getByAltText('pause');
        expect(pauseIcon).toBeInTheDocument();
    });
  });

  it('handles edge case with no items passed', () => {
    render(<Carousel />);
    expect(screen.queryByRole('list')).toBeInTheDocument();
    expect(screen.queryByAltText('play')).toBeInTheDocument();
    expect(screen.queryByAltText('pause')).toBeInTheDocument();
    expect(screen.queryByAltText('restart')).toBeInTheDocument();
    expect(screen.queryByAltText('fs')).toBeInTheDocument();
  });

    it('displays item images if there are any', () => {
        render(<Carousel items={mockItems} />);
        mockItems.forEach(item => {
        expect(screen.getByRole('img', { name: item.content })).toBeInTheDocument();
        });
    });
});