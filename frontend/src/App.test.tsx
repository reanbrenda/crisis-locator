import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';

// Mock the API service
vi.mock('./services/api', () => ({
  CrisisResourceAPI: {
    searchResources: vi.fn(),
    healthCheck: vi.fn()
  }
}));

test('renders crisis resource locator title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Crisis Resource Locator/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders search form', () => {
  render(<App />);
  const locationInput = screen.getByPlaceholderText(/Enter city name/i);
  const categorySelect = screen.getByDisplayValue(/All Categories/i);
  const searchButton = screen.getByText(/Search Resources/i);
  
  expect(locationInput).toBeInTheDocument();
  expect(categorySelect).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
});

test('renders tab navigation', () => {
  render(<App />);
  const searchTab = screen.getByText(/Search Resources/i);
  const savedTab = screen.getByText(/Saved Resources/i);
  
  expect(searchTab).toBeInTheDocument();
  expect(savedTab).toBeInTheDocument();
});