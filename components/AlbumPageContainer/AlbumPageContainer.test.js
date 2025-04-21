import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AlbumPageContainer from './index';
import * as nextRouter from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('AlbumPageContainer', () => {
  const mockAlbumData = {
    title: 'Test Album',
    images: [
      { url: 'test1.jpg' },
      { url: 'test2.jpg' },
    ],
    pin: "1234"
  };

  beforeEach(() => {
    nextRouter.useRouter.mockReturnValue({
        query: { slug: ['1234','Test Album'] },
        asPath: "/albums/1234/Test%20Album",
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders AlbumPage with data when data is available', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockAlbumData),
      })
    );

    render(<AlbumPageContainer />);

    await waitFor(() => {
        expect(screen.getByText('Test Album')).toBeInTheDocument();
    });

    expect(screen.getAllByRole('img').length).toBeGreaterThanOrEqual(2); 
  });

  it('renders loading state initially', async () => {
    global.fetch = jest.fn(() => new Promise(() => {})); 
    render(<AlbumPageContainer />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });


  it('renders error message when fetch fails', async () => {
    global.fetch = jest.fn(() => Promise.reject('API is down'));
    render(<AlbumPageContainer />);

    await waitFor(() => {
        expect(screen.getByText('Error loading album data.')).toBeInTheDocument();
    });
  });

  it('renders empty state when no data is returned', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(null),
      })
    );

    render(<AlbumPageContainer />);

    await waitFor(() => {
        expect(screen.getByText('Album data is empty.')).toBeInTheDocument();
    });
  });
});