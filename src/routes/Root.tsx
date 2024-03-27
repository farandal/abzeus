import AppBar from "@/components/layout/AppBar";
import Footer from "@/components/layout/Footer";

import { ThemeProvider, createTheme } from '@mui/material';
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "@/store";


import {
    Outlet,
    BrowserRouter
} from "react-router-dom";
import { ABZeusConfigState, setInput, setOptions } from "@/state/ABZeusConfigSlice";

import { useEffect } from "react";
import MainWrapper from "@/pages/MainWrapper";


const Root = () => {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#FFF',
            },
        },
    });

    return <ThemeProvider theme={theme}>
        <Provider store={store}>
            <MainWrapper>
                <AppBar />
                <Outlet />
                <Footer />
            </MainWrapper>
        </Provider>
    </ThemeProvider>
};

export default Root;