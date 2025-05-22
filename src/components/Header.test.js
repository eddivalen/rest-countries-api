import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Header from './Header'; // The component with the theme toggle
import { ThemeProvider, ThemeContext } from '../context/ThemeContext'; // The actual ThemeProvider

// Helper to render with the real ThemeProvider
const renderWithRealThemeProvider = (ui) => {
  return render(
    <ThemeProvider>
      {ui}
    </ThemeProvider>
  );
};

describe('Header Component - Theme Toggling', () => {
  beforeEach(() => {
    // Ensure the body class is clean before each test
    document.body.className = '';
    // localStorage.clear(); // Clear localStorage if theme preference is persisted there
  });

  test('toggles theme on button click', async () => {
    renderWithRealThemeProvider(<Header />);

    // Assuming the button initially shows "Dark Mode" when the theme is light
    // And the ThemeProvider defaults to 'light' theme
    // Or, find by a more generic role if text changes
    let themeToggleButton = screen.getByRole('button', { name: /mode/i }); // Flexible match for "Dark Mode" or "Light Mode"
    
    // Check initial state (assuming light theme is default)
    // The ThemeContext provider in ThemeContext.jsx initializes theme to 'light'
    // and applies `document.body.classList.add(theme)`
    expect(document.body).toHaveClass('light');
    expect(themeToggleButton).toHaveTextContent(/dark mode/i); // Assuming this is the text for light theme

    // First click: Toggle to Dark Mode
    await userEvent.click(themeToggleButton);

    // Assert theme changed to dark
    expect(document.body).toHaveClass('dark');
    expect(document.body).not.toHaveClass('light');
    // Re-query the button if its text changes, or ensure the accessible name is stable
    themeToggleButton = screen.getByRole('button', { name: /mode/i }); 
    expect(themeToggleButton).toHaveTextContent(/light mode/i); // Assuming this is the text for dark theme

    // Second click: Toggle back to Light Mode
    await userEvent.click(themeToggleButton);

    // Assert theme changed back to light
    expect(document.body).toHaveClass('light');
    expect(document.body).not.toHaveClass('dark');
    themeToggleButton = screen.getByRole('button', { name: /mode/i });
    expect(themeToggleButton).toHaveTextContent(/dark mode/i);
  });

  test('initial theme from ThemeProvider is applied', () => {
    // This test specifically checks if the ThemeProvider correctly sets the initial theme
    // The ThemeProvider itself is responsible for this, so this also tests ThemeContext
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );
    // Default theme is 'light' as per ThemeContext.jsx
    expect(document.body).toHaveClass('light');
    const themeToggleButton = screen.getByRole('button', { name: /dark mode/i });
    expect(themeToggleButton).toBeInTheDocument();
  });
});
