import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
const ThemeContext = createContext();
function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const value = {
        theme,
        toggleTheme,
    };
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export { ThemeProvider, ThemeContext };
