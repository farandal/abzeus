import { Box, Chip, TextField } from "@mui/material"
import { ABZeusAlfwetTranslator, IABZeusTranslatorOutput } from "../abzeus";
import { useState, useEffect, useRef } from "react"
import { ButtonGroup, Button } from "@mui/material";
import html2canvas from "html2canvas";
import { IconButton } from "@mui/material";
import CameraIcon from '@mui/icons-material/Camera';
//import ETO from "../components/ETO";
import useWindowWidth from '../hooks/window';
import WordGraph from "../components/WordGraph";
import { IABZeusGraphData } from "@/interfaces/IABZeusGraphData";
import useElectronWindow from "@/hooks/electronWindow";
const translator = new ABZeusAlfwetTranslator();

export interface ISuggested {
    [x: string]: string[];
}
const userAgent = navigator.userAgent.toLowerCase();
const isElectron = userAgent.indexOf(' electron/') > -1;

function getVersion() {
    return process.env.APP_VERSION || "";
}

const Home = () => {

    const version = getVersion();
    const sizeHook = isElectron ? useElectronWindow : useWindowWidth
    //const sizeHook = useWindowWidth;
    const size = sizeHook()

    const PARENT_TRINI_FORMAT = "+<>"
    const CHILD_TRINI_FORMAT = "+><"

    const suggested: ISuggested = {
        "en": ["philosophy","zeus", "logos","god", "theology", "olimpus", "constructivism"],
        "es": [ "filosofía","zeus", "logos", "dios", "teología", "olimpo", "constructivismo"]
    }

    const [abZeusWordGraph, setAbZeusWordGraph] = useState<IABZeusGraphData>({ nodes: [], links: [] });

    const [screenshot, setScreenshot] = useState<boolean>(false);
    const componentRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState<string>('')
    const [outputValue, setOutputValue] = useState<IABZeusTranslatorOutput[]>([])
    const [language, setLanguage] = useState("es");

    const [bluredBackground, setBluredBackground] = useState<string>("");

    const handleTagClick = (tag: string) => {
        console.log(setInputValue(tag));
    };

    const LanguageTags = () => {

        return <>{suggested[language].map((tag) => (
            <Chip
                key={tag}
                label={tag}
                onClick={() => handleTagClick(tag)}
                variant="outlined"
                color="primary"
            />
        ))}</>
    }

    const handleCapture = () => {
        setScreenshot(true);
    }


    const blurText = () => {
        if (inputValue.length > 0) {
            html2canvas(textRef.current as HTMLElement, { backgroundColor: null, scale: 3 }).then(canvas => {

                setBluredBackground(canvas.toDataURL("image/png"));

            });
        } else {
            setBluredBackground("")
        }
    }

    useEffect(() => {

        if (screenshot === true) {
            html2canvas(componentRef.current as HTMLElement).then(canvas => {
                const image = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.download = `${inputValue}.png`;
                link.href = image;
                link.click();
                setScreenshot(false);

            });
        }

    }, [screenshot, inputValue])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const output = translator.translate(inputValue, {
                    lang: language,
                    parentTriniFormat: PARENT_TRINI_FORMAT,
                    childTriniFormat: CHILD_TRINI_FORMAT,
                    nestedTranslation: true
                })
                console.log(output);
                setOutputValue(output)
                setAbZeusWordGraph({
                    nodes: output[0].nodeTree.nodes,
                    links: output[0].nodeTree.links
                })
                blurText()
            } catch (error) {
                console.error(error);
            }
        }

        if (inputValue.length > 1) {
            fetchData()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue, language])

    const inputRef = useRef<any>(null);

    const handleChange = (event: any) => {
        const inputValue = event.target.value.replace(/\s/g, '');
        if (inputRef.current) {
            inputRef.current.value = inputValue;
            setInputValue(inputValue);
        }
    };

    useEffect(() => {
        if (isElectron) {
            window.electron.getWindowSize();
        }
    }, [])

    return <>
        <div className={"background"} style={{ zIndex: -1, position: 'absolute', top: 280, left: 0, height: '100%', width: '100%', backgroundPositionX: "center", backgroundOrigin: 'revert', backgroundRepeat: 'no-repeat', backgroundImage: `url(${bluredBackground})` }} >

        </div>

        <div style={{ zIndex: 0, position: 'absolute', top: 0, left: 0, height: 580, width: '100%', backgroundPositionX: "center", backgroundOrigin: 'revert', backgroundRepeat: 'no-repeat' }} >
            {abZeusWordGraph.nodes[0] && <WordGraph width={size[0]} height={580} abZeusWordGraph={abZeusWordGraph} />}

        </div>

        <div className="root">

            <div ref={componentRef} className={screenshot ? "screenshotContainer" : ""}>
                <div className='highlightedText abzeus'>
                    *◯•
                </div>

                <h1 className='mainText abzeus'>ABZeus</h1>

                <div className="inputForm" style={{ zIndex: 1 }} >
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
                            value={inputValue}
                            onChange={(event) => handleChange(event)}
                        />
                            : <h1 className="abzeus">{inputValue}</h1>}
                    </Box>
                </div>
                {!screenshot ? <><Box sx={{ m: 1 }} className="hideOnScreenshot">
                    <LanguageTags />
                </Box>
                    <Box sx={{ m: 1 }} className="hideOnScreenshot">
                        <ButtonGroup>
                            <Button variant={"contained"} value="english" onClick={() => setLanguage("en")} disabled={language === "en"}>English</Button>
                            <Button variant={"contained"} value="spanish" onClick={() => setLanguage("es")} disabled={language === "es"}>Spanish</Button>
                        </ButtonGroup>
                    </Box>
                </> : <></>}

                <div style={{ zIndex: 1000 }} className="translationResults">

                    {outputValue.map((value: IABZeusTranslatorOutput) => {
                        return <Box sx={{ textAlign: "center", justifyContent: "center", alignContent: "center", alignSelf: "center" }}>
                            <div ref={textRef}  ><p className="abzeus">{value.simpleOutput}</p></div>
                            <h2>({value.splittedWord.join("'")}).*</h2>
                            {/*<ETO input={value.trinitarianGroups} />*/}
                            <p>{value.detailedOutput}</p>
                            <p>{value.simpleOutput}</p>

                        </Box>
                    })}
                    {inputValue.length > 0 ? <Box><IconButton onClick={handleCapture} aria-label="Screenshot">
                        <CameraIcon />
                    </IconButton></Box>:<></>} 
                    <Box className="signature"> <p>Francisco Aranda L.</p> <p>ABZeus Alfwet Model</p> <p> ver. {version}</p> </Box>
                </div>
            </div>
        </div> </>

}
export default Home;