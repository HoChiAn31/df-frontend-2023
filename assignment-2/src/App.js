import './App.css';
import { ThemeProvider } from './components/ThemeProvider/ThemeProvider';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';

function App() {
    return (
        <ThemeProvider>
            <DefaultLayout />
        </ThemeProvider>
    );
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
export default App;
