import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextProps {
  theme: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

const useTheme = (): ThemeContextProps => {
  return useContext(ThemeContext);
};

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const getTheme = (): boolean => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme !== null) {
      return JSON.parse(storedTheme);
    }
    return false;
  };

  const [theme, setTheme] = useState<boolean>(getTheme());

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);
  const toggleTheme = (): void => {
    setTheme((prevTheme) => !prevTheme);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export { ThemeProvider, useTheme };