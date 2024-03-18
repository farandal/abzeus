import ABZeusTranslatorWidget, { IABZeusTranslatorWidget } from '@/components/abzeus/ABZeusTranslatorWidget';
import useWindowWidth from '../hooks/window';
import useElectronWindow from "@/hooks/electronWindow";
import useAppConfig from "@/hooks/useAppConfig";
import { ABZeusConfigState, setInput, setOptions } from '@/state/ABZeusConfigSlice';
import { RootState } from '@/store';
import { Box } from '@mui/material';

import ABZeusSuggestedTags from '@/components/abzeus/ABZeusSuggestedTags';
import { IABZeusTranslatorOutput } from '@/abzeus';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
export interface ISuggested {
    [x: string]: string[];
}

const Home = () => {

    const appConfig = useAppConfig();
    const version = appConfig.version
    const sizeHook = appConfig.isElectron ? useElectronWindow : useWindowWidth
    const size = sizeHook()

    const dispatch = useDispatch();

    const suggested: ISuggested = {
        "en": ["philosophy", "zeus", "logos", "god", "theology", "olimpus", "constructivism"],
        "es": ["filosofía", "zeus", "logos", "dios", "teología", "olimpo", "constructivismo"]
    }
    const ABZeusState: ABZeusConfigState = useSelector((state: RootState) => state.ABZeusConfig)

    useEffect(() => {
        const queryString = new URLSearchParams(window.location.search);
        const word = queryString.get('w');
        const l = queryString.get('l');
        if (word) {
          dispatch(setInput(word))
        } else {
            dispatch(setInput("ABZeus"))
        }
        if (l) {
            dispatch(setOptions({lang:l}))
        }
      }, []);

    if (!size) return <div>loading...</div>

    const widgetConfig: IABZeusTranslatorWidget = {
        width: size[0],
        height: 650,
        options: {
            lang: ABZeusState.options?.lang || "es",
        }
    }

    return <Box className="mainContent home">

        <ABZeusTranslatorWidget {...widgetConfig} />
        <ABZeusSuggestedTags  tags={suggested} />
        {ABZeusState.output && ABZeusState.output.length > 0 && <Box className="secondaryContent">
       

        <div className="translationResults">
            {ABZeusState.output && ABZeusState.output.map((value: IABZeusTranslatorOutput) => {
                return <Box sx={{ textAlign: "center", justifyContent: "center", alignContent: "center", alignSelf: "center" }}>
                    <h2>({value.splittedWord.join("'")}).*</h2>
                    <p>{value.detailedOutput}</p>
                    <p>{value.simpleOutput}</p>

                </Box>
            })}
        </div>

        </Box>}

        {/*<div className='mainHeader' style={{left:(size[0]/2-160)}}>
            <div className='highlightedText abzeus'>
                *◯•
            </div>

            <h1 className='mainText abzeus'>ABZeus</h1>
        </div>*/}
    </Box>

}
export default Home;