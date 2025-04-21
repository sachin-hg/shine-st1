import React from 'react';
import { render, screen } from '@testing-library/react';
import Preview from './index';
import PreviewImages from './PreviewImages';
import PreviewTitle from './PreviewTitle';

// Mock the child components
jest.mock('./PreviewImages', () => {
  return jest.fn(() => <div data-testid="mock-preview-images">Mock PreviewImages</div>);
});

jest.mock('./PreviewTitle', () => {
  return jest.fn(() => <div data-testid="mock-preview-title">Mock PreviewTitle</div>);
});

describe('Preview Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders PreviewImages and PreviewTitle with data', () => {
    const previewData = {
      title: 'Test Title',
      images: ['image1.jpg', 'image2.jpg'],
    };
    render(<Preview previewData={previewData} />);

    expect(PreviewImages).toHaveBeenCalledWith(
      expect.objectContaining({ images: previewData.images }),
      expect.anything()
    );
    expect(PreviewTitle).toHaveBeenCalledWith(
      expect.objectContaining({ title: previewData.title }),
      expect.anything()
    );
    expect(screen.getByTestId('mock-preview-images')).toBeInTheDocument();
    expect(screen.getByTestId('mock-preview-title')).toBeInTheDocument();
  });

  it('renders correctly when previewData is empty', () => {
    render(<Preview previewData={{}} />);

    expect(PreviewImages).toHaveBeenCalledWith(
      expect.objectContaining({ images: [] }),
      expect.anything()
    );
    expect(PreviewTitle).toHaveBeenCalledWith(
      expect.objectContaining({ title: undefined }),
      expect.anything()
    );
    expect(screen.getByTestId('mock-preview-images')).toBeInTheDocument();
    expect(screen.getByTestId('mock-preview-title')).toBeInTheDocument();
  });

  it('renders correctly when previewData is undefined', () => {
    render(<Preview />);

    expect(PreviewImages).toHaveBeenCalledWith(
      expect.objectContaining({ images: [] }),
      expect.anything()
    );
    expect(PreviewTitle).toHaveBeenCalledWith(
      expect.objectContaining({ title: undefined }),
      expect.anything()
    );
    expect(screen.getByTestId('mock-preview-images')).toBeInTheDocument();
    expect(screen.getByTestId('mock-preview-title')).toBeInTheDocument();
  });
});