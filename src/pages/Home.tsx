import { Box, Chip, TextField } from "@mui/material"
import { ABZeusAlfwetTranslator, IABZeusTranslatorOutput } from "../abzeus";
import { useState, useEffect, useRef } from "react"
import { ButtonGroup, Button } from "@mui/material";
import html2canvas from "html2canvas";
import { IconButton } from "@mui/material";
import CameraIcon from '@mui/icons-material/Camera';
import ETO from "../components/ETO";
import useWindowWidth from '../hooks/window';
import WordGraph from "../components/WordGraph";

const translator = new ABZeusAlfwetTranslator();

export interface ISuggested {
    [x: string]: string[];
}


const Home = () => {

   
    const size = useWindowWidth();

    const PARENT_TRINI_FORMAT = "+<>"
    const CHILD_TRINI_FORMAT = "+><"

    const suggested: ISuggested = {
        "en": ["zeus", "logos", "philosophy", "god", "theology","constructivism"],
        "es": ["zeus", "logos", "filosofía", "dios", "teología","constructivismo"]
    }

    const [abZeusWordGraph,setAbZeusWordGraph] = useState(null);

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
                    childTriniFormat: CHILD_TRINI_FORMAT
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

        if(inputValue.length > 1) {
            fetchData()
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue, language])

    const inputRef = useRef(null);

  const handleChange = (event:any) => {
    const inputValue = event.target.value.replace(/\s/g, '');
    if (inputRef.current) {
      inputRef.current.value = inputValue;
      setInputValue(inputValue);
    }
  };



    return <>
        <div className={"background"} style={{ position: 'absolute', top: 280, left: 0, height: '100%', width: '100%', backgroundPositionX: "center", backgroundOrigin: 'revert', backgroundRepeat: 'no-repeat', backgroundImage: `url(${bluredBackground})` }} >
            
        </div>
        
        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', backgroundPositionX: "center", backgroundOrigin: 'revert', backgroundRepeat: 'no-repeat' }} >
            <WordGraph height={size[1]} width={size[0]} abZeusWordGraph={abZeusWordGraph} />
            
        </div>

        <div className="root">
            <div ref={componentRef} className={screenshot ? "screenshotContainer" : ""}>
                <div className='highlightedText abzeus'>
                    *◯•
                </div>

                <h1 className='mainText abzeus'>ABZeus</h1>

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
                
                <div className="translationResults">
                
                    {outputValue.map((value: IABZeusTranslatorOutput) => {
                        return <Box sx={{ textAlign: "center", justifyContent: "center", alignContent: "center", alignSelf: "center" }}>
                            <h2>({value.splittedWord.join("'")}).*</h2>
                            <ETO input={value.trinitarianGroups} />
                            <p>{value.detailedOutput}</p>
                            <p>{value.simpleOutput}</p>
                            <div ref={textRef}  ><p className="abzeus">{value.simpleOutput}</p></div>
                        </Box>
                    })}
                    {inputValue.length > 0 ? <IconButton onClick={handleCapture} aria-label="Screenshot">
                        <CameraIcon />
                    </IconButton> : <></>}
                </div></div></div></>

}
export default Home;