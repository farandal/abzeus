import { ThemeProvider, createTheme } from '@mui/material';
import './App.css'
import AppBar from './components/layout/AppBar';
import Home from './pages/Home';
import Footer from './components/layout/Footer';
import { store } from './store'
import { Provider } from 'react-redux'


function App() {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#FFF',
            },
        },
    });

    return <ThemeProvider theme={theme}>
        <Provider store={store}>
        <AppBar/>
        <Home />
        <Footer/>
        </Provider>
    </ThemeProvider>

}

export default App
