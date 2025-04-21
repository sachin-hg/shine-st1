import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AlbumCarousel from './index';

const mockData = [
  { id: 1, src: '/test-image1.jpg', alt: 'Test Image 1' },
  { id: 2, src: '/test-image2.jpg', alt: 'Test Image 2' },