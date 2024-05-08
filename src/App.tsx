import './App.css'

import {
    createBrowserRouter,
    createHashRouter,
    Outlet,
    RouterProvider,
} from "react-router-dom";

import { CSSTransition } from "react-transition-group";

import routes from './Routes';

const userAgent = navigator.userAgent.toLowerCase();
const isElectron = userAgent.indexOf(' electron/') > -1;

const router = isElectron ? createHashRouter(routes) : createBrowserRouter(routes);

function App() {

    return <RouterProvider router={router}>
        <CSSTransition in={true} appear={true} timeout={1300} classNames="page">
            <div className="page-container">
                <Outlet />
            </div>
        </CSSTransition>
    </RouterProvider>

}

export default App