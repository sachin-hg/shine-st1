import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './index';

describe('Loader Component', () => {
  it('renders the loader when isLoading is true', () => {
    render(<Loader isLoading={true} />);
    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();
  });

  it('does not render the loader when isLoading is false', () => {
    render(<Loader isLoading={false} />);
    const loaderElement = screen.queryByTestId('loader');
    expect(loaderElement).not.toBeInTheDocument();
  });

  it('renders the loader when isLoading is not provided and defaults to true', () => {
    render(<Loader />);
    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();
  });

  it('renders the correct styles', () => {
    render(<Loader isLoading={true} />);
    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toHaveClass('loaderContainer');
  });

  it('does not throw errors when no props are passed', () => {
      expect(() => {
          render(<Loader />);
      }).not.toThrow();
  });
});