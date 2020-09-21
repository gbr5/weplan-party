import React, { createContext, useCallback, useState, useContext } from 'react';

import { DefaultTheme, ThemeProvider } from 'styled-components';

import light from '../styles/themes/light';
import dark from '../styles/themes/dark';

interface IThemeContextData {
  theme: DefaultTheme;
  themeBoolean: boolean;
  toggleTheme(): void;
}

const ThemeContext = createContext<IThemeContextData>({} as IThemeContextData);

const ThemeModeProvider: React.FC = ({ children }) => {
  const currentTheme = localStorage.getItem('@WePlan:theme');
  const [theme, setTheme] = useState(currentTheme === 'light' ? light : dark);
  const [themeBoolean, setThemeBoolean] = useState(currentTheme === 'light');

  const toggleTheme = useCallback(() => {
    setTheme(theme.title === 'light' ? dark : light);
    setThemeBoolean(theme.title === 'light');
  }, [theme]);

  localStorage.setItem('@WePlan:theme', theme.title);

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme, themeBoolean }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

function useToggleTheme(): IThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useToggleTheme must bu used within an AuthProvider');
  }

  return context;
}

export { ThemeModeProvider, useToggleTheme };
