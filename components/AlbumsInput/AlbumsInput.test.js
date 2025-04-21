import React from 'react';
import { render, screen } from '@testing-library/react';
import AlbumsInput from './index';

describe('AlbumsInput', () => {
  it('should render text and image correctly', () => {
    render(<AlbumsInput />);
    const textElement = screen.getByText(/Create your own album/i);
    const imageElement = screen.getByAltText('Album Cover');
    expect(textElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', expect.stringContaining('img1.jpg'));
  });

  it('should handle edge case: no props passed', () => {
    render(<AlbumsInput />);
    const textElement = screen.getByText(/Create your own album/i);
    const imageElement = screen.getByAltText('Album Cover');
    expect(textElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
  });

  it('should render correct styles', () => {
    const { container } = render(<AlbumsInput />);
    const componentContainer = container.firstChild;
    expect(componentContainer).toHaveClass('container');
    const albumCoverContainer = screen.getByTestId('album-cover-container')
    expect(albumCoverContainer).toHaveClass('albumCover');
  });
});