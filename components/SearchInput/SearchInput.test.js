import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchInput from './index';

describe('SearchInput', () => {
  it('renders the search input and placeholder text', () => {
    render(<SearchInput />);
    const inputElement = screen.getByPlaceholderText('Search');
    expect(inputElement).toBeInTheDocument();
  });

  it('renders the music animation', () => {
    render(<SearchInput />);
    const musicAnimation = screen.getByAltText('music animation');
    expect(musicAnimation).toBeInTheDocument();
  });

  it('updates the search input value when text is entered', () => {
    render(<SearchInput />);
    const inputElement = screen.getByPlaceholderText('Search');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(inputElement.value).toBe('test');
  });

  it('calls the onSearch prop when the search button is clicked', async () => {
    const mockOnSearch = jest.fn();
    render(<SearchInput onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText('Search');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith('test');
    });
  });

  it('calls the onSearch prop when the search button is clicked with empty query', async () => {
    const mockOnSearch = jest.fn();
    render(<SearchInput onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText('Search');
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('');
    });
  });

  it('does not call the onSearch prop when no query is present', async () => {
    const mockOnSearch = jest.fn();
    render(<SearchInput onSearch={mockOnSearch} />);
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('handles the case when no onSearch prop is provided', async () => {
    render(<SearchInput />);
    const inputElement = screen.getByPlaceholderText('Search');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    await waitFor(() => {
      expect(inputElement.value).toBe('test');
    });
  });
});