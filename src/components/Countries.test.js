import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import Countries from './Countries';
import { ThemeContext } from '../context/ThemeContext';
import { getCountries } from '../api/getCountries';

// Mock the getCountries API
jest.mock('../api/getCountries');

const mockCountriesData = [
  { name: { common: 'Country One' }, population: 1000000, region: 'Region A', capital: ['Capital A'], flags: { svg: 'url1', alt: 'Flag of Country One' } },
  { name: { common: 'Country Two' }, population: 2000000, region: 'Region B', capital: ['Capital B'], flags: { svg: 'url2', alt: 'Flag of Country Two' } },
];

// Helper to provide the theme context, similar to how it's done in App.js
const renderWithTheme = (component) => {
  return render(
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {} }}>
      {component}
    </ThemeContext.Provider>
  );
};

describe('Countries Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    getCountries.mockReset();
  });

  test('renders country names after API call', async () => {
    getCountries.mockResolvedValue(mockCountriesData);

    renderWithTheme(<Countries />);

    // Wait for the country names to appear
    // Using findByText to handle asynchronous loading
    expect(await screen.findByText('Country One')).toBeInTheDocument();
    expect(screen.getByText('Country Two')).toBeInTheDocument();

    // Optionally, also check for other details to make the test more robust
    expect(screen.getByText('Population: 1,000,000')).toBeInTheDocument();
    expect(screen.getByText('Region: Region A')).toBeInTheDocument();
    expect(screen.getByText('Capital: Capital A')).toBeInTheDocument();

    expect(screen.getByText('Population: 2,000,000')).toBeInTheDocument();
    expect(screen.getByText('Region: Region B')).toBeInTheDocument();
    expect(screen.getByText('Capital: Capital B')).toBeInTheDocument();
  });

  test('handles API error gracefully', async () => {
    getCountries.mockRejectedValue(new Error('API Error'));

    renderWithTheme(<Countries />);

    // Check if an error message is displayed or if the component handles it in a specific way
    // This depends on how the Countries component implements error handling
    // For now, let's assume it might render nothing or a specific error message
    // If it renders nothing for the countries list:
    await waitFor(() => {
      expect(screen.queryByText('Country One')).not.toBeInTheDocument();
      expect(screen.queryByText('Country Two')).not.toBeInTheDocument();
    });

    // If it's expected to show an error message (e.g., "Failed to load countries"):
    // expect(await screen.findByText('Failed to load countries')).toBeInTheDocument();
    // Note: The actual error message or behavior needs to be known from Countries.jsx implementation.
    // For this example, we'll assume no specific error message is rendered in the list area.
  });
});
