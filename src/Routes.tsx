import Root from './routes/Root';
import Home from './pages/Home';
import ErrorPage from './routes/ErrorPage';
import ABZeusAlfwet from './components/abzeus/ABZeusAlfwet';
import Letter from './pages/alfwet/Letter';
import Philosophy from './pages/Philosophy';


const routes = [
    {
        path: "/",
        name: "Translator",
        icon: <></>,
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "alfwet", element: <ABZeusAlfwet /> }
        ],
    },
    {
        path: "/filosofia",
        name: "Philosophy",
        icon: <div className='abzeus'>Ψ</div>,
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Philosophy /> }
        ],
    },
    {
        path: "/alfwet",
        name: "Alfwet",
        icon:<div className='abzeus'>AB</div>,
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <ABZeusAlfwet /> },
            { path: "a", element: <Letter letter='a' uppercase ><>A</></Letter>},
            { path: "b", element: <Letter letter='b' uppercase ><>B</></Letter>},
            { path: "c", element: <Letter letter='c' uppercase ><>C</></Letter>},
            { path: "d", element: <Letter letter='d' uppercase ><>D</></Letter>},
            { path: "e", element: <Letter letter='e' uppercase ><>E</></Letter>},
            { path: "f", element: <Letter letter='f' uppercase ><>F</></Letter>},
            { path: "g", element: <Letter letter='g' uppercase ><>G</></Letter>},
            { path: "h", element: <Letter letter='h' uppercase ><>H</></Letter>},
            { path: "i", element: <Letter letter='i' uppercase ><>I</></Letter>},
            { path: "j", element: <Letter letter='j' uppercase ><>J</></Letter>},
            { path: "k", element: <Letter letter='k' uppercase ><>K</></Letter>},
            { path: "l", element: <Letter letter='l' uppercase ><>L</></Letter>},
            { path: "m", element: <Letter letter='m' uppercase ><>M</></Letter>},
            { path: "n", element: <Letter letter='n' uppercase ><>N</></Letter>},
            { path: "o", element: <Letter letter='o' uppercase ><>O</></Letter>},
            { path: "p", element: <Letter letter='p' uppercase ><>P</></Letter>},
            { path: "q", element: <Letter letter='q' uppercase ><>Q</></Letter>},
            { path: "r", element: <Letter letter='r' uppercase ><>R</></Letter>},
            { path: "s", element: <Letter letter='s' uppercase ><>S</></Letter>},
            { path: "t", element: <Letter letter='t' uppercase ><>T</></Letter>},
            { path: "u", element: <Letter letter='u' uppercase ><>U</></Letter>},
            { path: "v", element: <Letter letter='v' uppercase ><>V</></Letter>},
            { path: "w", element: <Letter letter='w' uppercase ><>W</></Letter>},
            { path: "x", element: <Letter letter='x' uppercase ><>X</></Letter>},
            { path: "y", element: <Letter letter='y' uppercase ><>Y</></Letter>},
            { path: "z", element: <Letter letter='z' uppercase ><>Z</></Letter>},
            { path: "á", element: <Letter letter='á' uppercase ><>Á</></Letter>},
            { path: "é", element: <Letter letter='é' uppercase ><>É</></Letter>},
            { path: "í", element: <Letter letter='í' uppercase ><>Í</></Letter>},
            { path: "ó", element: <Letter letter='ó' uppercase ><>Ó</></Letter>},
            { path: "ú", element: <Letter letter='ú' uppercase ><>Ú</></Letter>},
            { path: "ñ", element: <Letter letter='ñ' uppercase ><>Ñ</></Letter>}
        ],
    },
];


export default routes;