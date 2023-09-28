import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
const ThemeContext = createContext();
const useTheme = () => {
    return useContext(ThemeContext);
};
function ThemeProvider({ children }) {
    const getTheme = () => {
        return JSON.parse(localStorage.getItem('theme')) || false;
    };

    const [theme, setTheme] = useState(getTheme());

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme));
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => !prevTheme);
    };

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export { ThemeProvider, useTheme };
