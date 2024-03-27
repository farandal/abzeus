import './App.css'

import {
    createBrowserRouter,
    createHashRouter,
    RouterProvider,
} from "react-router-dom";

import Root from './routes/Root';
import Home from './pages/Home';
import ErrorPage from './routes/ErrorPage';
import ABZeusAlfwet from './components/abzeus/ABZeusAlfwet';

const userAgent = navigator.userAgent.toLowerCase();
const isElectron = userAgent.indexOf(' electron/') > -1;

const routes = [
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "alfwet", element: <ABZeusAlfwet /> }
        ],
    },
    {
        path: "/alfwet",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <ABZeusAlfwet /> }
        ],
    },
    
   //{ path: "*", Component: () => <Root/> },
];

const router = isElectron ? createHashRouter(routes) : createBrowserRouter(routes);

function App() {
    return <RouterProvider router={router} />
}

export default App