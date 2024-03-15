import { ThemeProvider, createTheme } from '@mui/material';
import './App.css'
import Home from './pages/Home';

function App() {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#999999',
            },
        },
    });

    return <ThemeProvider theme={theme}>
        <Home />
    </ThemeProvider>

}

export default App
