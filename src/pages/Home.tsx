import ABZeusTranslatorWidget, { IABZeusTranslatorWidget } from '@/components/abzeus/ABZeusTranslatorWidget';
import useWindowWidth from '../hooks/window';
import useElectronWindow from "@/hooks/electronWindow";
import useAppConfig from "@/hooks/useAppConfig";
import { ABZeusConfigState, setInput, setOptions } from '@/state/ABZeusConfigSlice';
import { RootState } from '@/store';
import { Box } from '@mui/material';

import ABZeusSuggestedTags from '@/components/abzeus/ABZeusSuggestedTags';
import { IABZeusTranslatorOutput } from 'abzeus';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
export interface ISuggested {
    [x: string]: string[];
}

const Home = () => {

    const appConfig = useAppConfig();
    const sizeHook = appConfig.isElectron ? useElectronWindow : useWindowWidth
    const size = sizeHook()

    const suggested: ISuggested = {
        "en": ["philosophy", "zeus", "logos", "god", "theology", "olimpus", "constructivism"],
        "es": ["filosofía", "zeus", "logos", "dios", "teología", "olimpo", "constructivismo"],
        "gk": ["filosofía"],
    }
    const ABZeusState: ABZeusConfigState = useSelector((state: RootState) => state.ABZeusConfig)

    const [currentTag, setCurrentTag] = useState<string>();

    const onSelectTag = (w: string) => {
        setCurrentTag(w);
    }

    if (!size) return <div>loading...</div>

    const widgetConfig: IABZeusTranslatorWidget = {
        width: size[0],
        height: 650,
        options: {
            lang: ABZeusState.options?.lang || "es",
        },
        dispatchOutputGlobalState: true
    }

    return <Box className="mainContent home">

        <ABZeusTranslatorWidget {...widgetConfig} w={currentTag} />
        <ABZeusSuggestedTags tags={suggested} onTag={onSelectTag} />
        {ABZeusState.output && ABZeusState.output.length > 0 && <Box className="secondaryContent">
            <div className="translationResults">
                {ABZeusState.output && ABZeusState.output.map((value: IABZeusTranslatorOutput) => {
                    return <Box sx={{ textAlign: "center", justifyContent: "center", alignContent: "center", alignSelf: "center" }}>
                        <h2 className={ABZeusState.options?.lang}>{value.charTranslatedWord}</h2>
                        <h2 className={ABZeusState.options?.lang}>({value.splittedWord.join("'")}).*</h2>
                        <p>{value.detailedOutput}</p>
                        <p>{value.simpleOutput}</p>
                    </Box>
                })}
            </div>
        </Box>}
    </Box>

}
export default Home;