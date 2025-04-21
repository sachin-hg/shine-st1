import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './index';

describe('Login Component', () => {
  it('renders all the text correctly', () => {
    render(<Login />);
    expect(screen.getByText('Enter Pin')).toBeInTheDocument();
  });

  it('renders all form elements', () => {
    render(<Login />);
    expect(screen.getByLabelText('Pin')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('allows user to type in the input field', () => {
    render(<Login />);
    const inputElement = screen.getByLabelText('Pin');
    fireEvent.change(inputElement, { target: { value: '1234' } });
    expect(inputElement.value).toBe('1234');
  });

  it('calls onSubmit when the form is submitted with valid input', async () => {
    const onSubmitMock = jest.fn();
    render(<Login onSubmit={onSubmitMock} />);
    const inputElement = screen.getByLabelText('Pin');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(inputElement, { target: { value: '1234' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith('1234');
    });
  });

  it('handles empty input submission', async () => {
    const onSubmitMock = jest.fn();
    render(<Login onSubmit={onSubmitMock} />);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith('');
    });
  });

  it('handles invalid input submission', async () => {
    const onSubmitMock = jest.fn();
    render(<Login onSubmit={onSubmitMock} />);
    const inputElement = screen.getByLabelText('Pin');
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.change(inputElement, { target: { value: 'abcd' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith('abcd');
    });
  });

  it('does not crash if no onSubmit prop is passed', () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.click(submitButton);
  });
});