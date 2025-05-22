import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import App from './App'; // Assuming App.js is the main component
import { ThemeContext } from './context/ThemeContext';
import { getCountries } from './api/getCountries';

// Mock the getCountries API
jest.mock('./api/getCountries');

// Mock react-router-dom if App.js uses it
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'), // import and retain default behavior
//   BrowserRouter: ({ children }) => <div>{children}</div>, // Simplistic mock for BrowserRouter
//   Routes: ({ children }) => <div>{children}</div>,
//   Route: ({ element }) => element,
//   Link: ({ children }) => <a>{children}</a>, // Mock Link if used and causes issues
// }));


const mockCountriesData = [
  { name: { common: 'Albania' }, population: 2800000, region: 'Europe', capital: ['Tirana'], flags: { svg: 'url_albania', alt: 'Flag of Albania' } },
  { name: { common: 'Brazil' }, population: 214000000, region: 'Americas', capital: ['Brasilia'], flags: { svg: 'url_brazil', alt: 'Flag of Brazil' } },
  { name: { common: 'Canada' }, population: 38000000, region: 'Americas', capital: ['Ottawa'], flags: { svg: 'url_canada', alt: 'Flag of Canada' } },
];

const renderAppWithTheme = () => {
  // Mock toggleTheme if it's not relevant to the test, or provide a more complete mock if needed
  const mockToggleTheme = jest.fn();
  return render(
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme: mockToggleTheme }}>
      <App />
    </ThemeContext.Provider>
  );
};

describe('App Component - Search Functionality', () => {
  beforeEach(() => {
    // Reset mocks and mock implementation before each test
    getCountries.mockReset();
    getCountries.mockResolvedValue(mockCountriesData); // Default mock behavior
  });

  test('filters countries based on search input', async () => {
    renderAppWithTheme();

    // Wait for initial countries to load
    expect(await screen.findByText('Albania')).toBeInTheDocument();
    expect(screen.getByText('Brazil')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();

    // Find the search input (assuming it has a placeholder or label text)
    // Placeholder text might be "Search for a country..."
    const searchInput = screen.getByPlaceholderText(/search for a country/i);
    expect(searchInput).toBeInTheDocument();

    // Simulate user typing "Brazil" into the search input
    await userEvent.type(searchInput, 'Brazil');

    // Wait for the UI to update based on the search
    await waitFor(() => {
      expect(screen.getByText('Brazil')).toBeInTheDocument();
    });

    // Assert that only "Brazil" is visible
    expect(screen.getByText('Brazil')).toBeInTheDocument();
    expect(screen.queryByText('Albania')).not.toBeInTheDocument();
    expect(screen.queryByText('Canada')).not.toBeInTheDocument();

    // Clear the search input to see if all countries reappear
    await userEvent.clear(searchInput);

    await waitFor(async () => {
      expect(await screen.findByText('Albania')).toBeInTheDocument();
    });
    expect(screen.getByText('Brazil')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();
  });
});
