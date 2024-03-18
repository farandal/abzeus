import { Box, Chip, TextField } from "@mui/material"
import { ABZeusAlfwetTranslator, IABZeusTranslatorOutput } from "../../abzeus";
import { useState, useEffect, useRef } from "react"
import { ButtonGroup, Button } from "@mui/material";
import html2canvas from "html2canvas";
//import jsPDF from 'jspdf';
import { IconButton } from "@mui/material";
import CameraIcon from '@mui/icons-material/Camera';
//import ETO from "../components/ETO";
import useWindowWidth from '../../hooks/window';
import WordGraph, { IWordGraphImperativeCalls } from "./ABZeusWordGraph";
import { IABZeusGraphData } from "@/interfaces/IABZeusGraphData";
import useElectronWindow from "@/hooks/electronWindow";
import { PropsWithChildren } from "react";
import IABZeusTranslatorConfig from "@/abzeus/interfaces/IABZeusTranslatorConfig";
import { ABZeusConfigState, setInput, setOptions, setOutput } from "@/state/ABZeusConfigSlice";
import { RootState } from "@/store";
import { useSelector, useDispatch } from 'react-redux'
import useAppConfig from "@/hooks/useAppConfig";


const translator = new ABZeusAlfwetTranslator();

export interface ISuggested {
    [x: string]: string[];
}
const userAgent = navigator.userAgent.toLowerCase();
const isElectron = userAgent.indexOf(' electron/') > -1;

function getVersion() {
    return process.env.APP_VERSION || "";
}

export interface IABZeusTranslatorWidget extends PropsWithChildren {
    width?: number,
    height?: number,
    options?: IABZeusTranslatorConfig
}

const ABZeusTranslatorWidget = (props: IABZeusTranslatorWidget) => {

    const { width, height, options } = props;

    const appConfig = useAppConfig();

    const ABZeusState: ABZeusConfigState = useSelector((state: RootState) => state.ABZeusConfig)
    const dispatch = useDispatch();

    const sizeHook = isElectron ? useElectronWindow : useWindowWidth

    const size = (width && height) ? [width, height] : sizeHook()

    const PARENT_TRINI_FORMAT = options?.parentTriniFormat || "+<>"
    const CHILD_TRINI_FORMAT = options?.childTriniFormat || "+><"

    const [abZeusWordGraph, setAbZeusWordGraph] = useState<IABZeusGraphData>({ nodes: [], links: [] });

    const ABZeusGraphRef = useRef<IWordGraphImperativeCalls>(null);

    const [screenshot, setScreenshot] = useState<boolean>(false);
    const componentRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    const [bluredBackground, setBluredBackground] = useState<string>("");

    const [graphImage, setGraphImage] = useState(null);
    const handleCapture = () => {
        const graphImage = ABZeusGraphRef.current?.screenshot();
        setGraphImage(graphImage);
        setScreenshot(true);
    }

    const blurText = () => {
        //if (ABZeusState.input.length > 0) {
        html2canvas(textRef.current as HTMLElement, { backgroundColor: null, scale: 3 }).then(canvas => {
            setBluredBackground(canvas.toDataURL("image/png"));
        });
        //} else {
        //setBluredBackground("")
        //}
    }

    useEffect(() => {
        if (screenshot === true) {
            html2canvas(componentRef.current as HTMLElement).then(canvas => {
                const image = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.download = `${ABZeusState.input}.png`;
                link.href = image;
                link.click();
                setScreenshot(false);
            });
        }
    }, [screenshot, ABZeusState.input])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const output = translator.translate(ABZeusState.input, {
                    lang: ABZeusState.options?.lang || "es",
                    parentTriniFormat: PARENT_TRINI_FORMAT,
                    childTriniFormat: CHILD_TRINI_FORMAT,
                    nestedTranslation: true
                })

                blurText()
                
                dispatch(setOutput(output))

                setAbZeusWordGraph({
                    nodes: output[0].nodeTree.nodes,
                    links: output[0].nodeTree.links
                })


            } catch (error) {
                console.error(error);
            }
        }

        if (ABZeusState.input.length > 1) {
            fetchData()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ABZeusState.input, ABZeusState.options?.lang])

    const inputRef = useRef<any>(null);

    useEffect(() => {
        if (isElectron) {
            console.log("getwindowSize");
            window.electron.getWindowSize();
        }
    }, [])

    const updateInput = (event: any) => {
        const inputValue = event.target.value.replace(/\s/g, '');
        if (inputRef.current) {
            inputRef.current.value = inputValue;
            dispatch(setInput(inputValue));
        }
    };


    if (!size) return <>...</>

    return <div className="ABZeusTranslatorWidget">


        {ABZeusState.output && ABZeusState.output.map((value: IABZeusTranslatorOutput) => {
            return <Box sx={{
                position: "absolute",
                bottom: "10px",
                padding: "0 10%",

            }}>
                <div ref={textRef}  ><p className="abzeus simpleOutput" style={{
                    textAlign: "center",
                    justifyContent: "center",
                    alignContent: "center",
                    alignSelf: "center"
                }}>{value.simpleOutput}</p></div>
            </Box>
        })}


        {abZeusWordGraph.nodes[0] && <WordGraph
            ref={ABZeusGraphRef}
            width={size[0]}
            height={size[1]}
            abZeusWordGraph={abZeusWordGraph}
            rootId={0}
            style={{
                backgroundPositionX: "center",
                backgroundPositionY: "center",
                backgroundOrigin: 'revert',
                backgroundRepeat: 'no-repeat',
                ...bluredBackground && { backgroundImage: `url(${bluredBackground})` }
            }}

        />}


        <div className="inputForm">
            <Box sx={{ m: 1 }}>
                {!screenshot ? <TextField
                    inputRef={inputRef}
                    sx={{
                        '& .MuiInputBase-root': {
                            borderColor: 'grey',
                            borderRadius: '20px',
                            fontSize: '3rem',

                        },
                        '& .MuiInputBase-input': {
                            textAlign: 'center',
                            fontFamily: 'ABZeus',
                            fontWeight: 'bold'
                        },
                    }}
                    size={"medium"}
                    value={ABZeusState.input}
                    onChange={(event) => updateInput(event)}
                />
                    : <h1 className="abzeus">{ABZeusState.input}</h1>}
            </Box>
        </div>


        {ABZeusState.input.length > 0 ? <Box className="screenshot">
            <IconButton onClick={handleCapture} aria-label="Screenshot">
                <CameraIcon />
            </IconButton></Box> : <></>}


        {/*<div style={{ zIndex: 0, position: 'absolute', top: 66, left: 0, width: size[0], height: 400, backgroundPositionX: "center", backgroundOrigin: 'revert', backgroundRepeat: 'no-repeat' }} >
            {abZeusWordGraph.nodes[0] && <WordGraph ref={ABZeusGraphRef} width={size[0]} height={400} abZeusWordGraph={abZeusWordGraph} rootId={0}/>}
        </div>*/}

       

        {/*<div style={{ zIndex: 1000 }} >
            {graphImage && screenshot ? <img width={size[0]} src={graphImage} /> : <></>}
            {ABZeusState.output && ABZeusState.output.map((value: IABZeusTranslatorOutput) => {
                return <Box sx={{ textAlign: "center", justifyContent: "center", alignContent: "center", alignSelf: "center" }}>
                    <div ref={textRef}  ><p className="abzeus">{value.simpleOutput}</p></div>
                   </Box>
            })}
        </div>*/}

        {screenshot && <div ref={componentRef} className={screenshot ? "screenshotContainer" : ""}>
                <div>
                    <div className='highlightedText abzeus'>
                        *◯•
                    </div>

                    <h1 className='mainText abzeus'>ABZeus</h1>
                </div>
                <h1 className="abzeus">{ABZeusState.output && ABZeusState.output[0].word}</h1>
                {graphImage && <img width={800} src={graphImage} />}
                <p className="abzeus">{ABZeusState.output && ABZeusState.output[0].simpleOutput}</p>
                <p>{ABZeusState.output && ABZeusState.output[0].detailedOutput}</p>
                <p>{ABZeusState.output && ABZeusState.output[0].simpleOutput}</p>
                <Box sx={{pt:1}} className="signature">
                        <p>{`Francisco Aranda L. <farandal@gmail.com>`}</p>
                        <p>ABZeus Alfwet Model</p>
                        <p>https://abzeus.cl/</p>
                        <p> ver. {appConfig.version}</p> 
                    </Box>
                
        </div>}
                

    </div>

}
export default ABZeusTranslatorWidget;