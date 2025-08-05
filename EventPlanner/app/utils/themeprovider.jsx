import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const theme = {
    backgroundColor: isDarkTheme ? '#1C2526' : '#EFF0F1FF',
    textColor: isDarkTheme ? '#D8CFCFFF' : '#000000',
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;