import React from 'react';
import { render, screen } from '@testing-library/react';
import UnderConstruction from './index';

describe('UnderConstruction Component', () => {
  it('renders without crashing', () => {
    render(<UnderConstruction />);
    expect(screen.getByTestId('under-construction-container')).toBeInTheDocument();
  });

  it('renders the correct heading text', () => {
    render(<UnderConstruction />);
    const headingElement = screen.getByText(/Under Construction/i);
    expect(headingElement).toBeInTheDocument();
  });

  it('renders the correct description text', () => {
    render(<UnderConstruction />);
    const descriptionElement = screen.getByText(
      /We're working hard to improve our website/i
    );
    expect(descriptionElement).toBeInTheDocument();
  });

  it('renders the background image', () => {
    render(<UnderConstruction />);
    const bgImage = screen.getByAltText(/Under Construction/i);
    expect(bgImage).toBeInTheDocument();
    expect(bgImage.src).toContain('bg.webp');
  });

  it('container has correct styles', () => {
    render(<UnderConstruction />);
    const container = screen.getByTestId('under-construction-container');
    expect(container).toHaveStyle('width: 100vw');
    expect(container).toHaveStyle('height: 100vh');
    expect(container).toHaveStyle('display: flex');
    expect(container).toHaveStyle('flex-direction: column');
    expect(container).toHaveStyle('justify-content: center');
    expect(container).toHaveStyle('align-items: center');
    expect(container).toHaveStyle('background-color: #f5f5f5');
  });

  it('heading has correct styles', () => {
    render(<UnderConstruction />);
    const heading = screen.getByText(/Under Construction/i);
    expect(heading).toHaveStyle('font-size: 2.5rem');
    expect(heading).toHaveStyle('margin-bottom: 1rem');
    expect(heading).toHaveStyle('text-align: center');
  });

  it('description has correct styles', () => {
    render(<UnderConstruction />);
    const description = screen.getByText(/We're working hard to improve our website/i);
    expect(description).toHaveStyle('font-size: 1.2rem');
    expect(description).toHaveStyle('margin-bottom: 2rem');
    expect(description).toHaveStyle('text-align: center');
    expect(description).toHaveStyle('padding: 0 1rem');
  });

  it('image has correct styles', () => {
    render(<UnderConstruction />);
    const image = screen.getByAltText(/Under Construction/i);
    expect(image).toHaveStyle('width: 300px');
    expect(image).toHaveStyle('height: auto');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<UnderConstruction />);
    expect(asFragment()).toMatchSnapshot();
  });
});