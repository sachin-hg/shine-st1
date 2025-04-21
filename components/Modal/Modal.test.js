import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './index';

describe('Modal', () => {
  const mockChildren = <div data-testid="mock-children">Test Content</div>;
  const mockOnClose = jest.fn();

  it('renders the modal content when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        {mockChildren}
      </Modal>
    );
    expect(screen.getByTestId('mock-children')).toBeInTheDocument();
  });

  it('does not render the modal content when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose}>
        {mockChildren}
      </Modal>
    );
    expect(screen.queryByTestId('mock-children')).not.toBeInTheDocument();
  });

  it('renders the close button', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        {mockChildren}
      </Modal>
    );
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        {mockChildren}
      </Modal>
    );
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('applies custom styles', () => {
    const customStyles = {
      overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
      content: { padding: '20px' },
    };
    render(
      <Modal isOpen={true} onClose={mockOnClose} styles={customStyles}>
        {mockChildren}
      </Modal>
    );
    const overlay = document.querySelector('.ReactModal__Overlay');
    const content = document.querySelector('.ReactModal__Content');

    expect(overlay).toHaveStyle('background-color: rgba(0, 0, 0, 0.5)');
    expect(content).toHaveStyle('padding: 20px');
  });

  it('does not throw error if no children are provided', () => {
    expect(() => {
        render(<Modal isOpen={true} onClose={mockOnClose}/>)
    }).not.toThrow();
    
  });

  it('does not throw error if no styles are provided', () => {
    expect(() => {
        render(<Modal isOpen={true} onClose={mockOnClose}>{mockChildren}</Modal>)
    }).not.toThrow();
    
  });
});