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
import MainWrapper from "@/components/MainWrapper";
import SelectionBar from "@/components/layout/SelectionBar";


const Root = () => {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#FFF',
            },
        },
        components: {
            MuiButtonBase: {
              styleOverrides: {
                root: {
                    textTransform: "none",
                },
              },
            },
          }
    });

    return <ThemeProvider theme={theme}>
        <Provider store={store}>
            <MainWrapper>
                <AppBar />
                <Outlet />
                <Footer />
                <SelectionBar/>
            </MainWrapper>
        </Provider>
    </ThemeProvider>
};

export default Root;