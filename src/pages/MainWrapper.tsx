import ABZeusTranslatorWidget, { IABZeusTranslatorWidget } from '@/components/abzeus/ABZeusTranslatorWidget';
import useWindowWidth from '../hooks/window';
import useElectronWindow from "@/hooks/electronWindow";
import useAppConfig from "@/hooks/useAppConfig";
import { ABZeusConfigState, setInput, setOptions } from '@/state/ABZeusConfigSlice';
import { RootState } from '@/store';
import { Box } from '@mui/material';

import ABZeusSuggestedTags from '@/components/abzeus/ABZeusSuggestedTags';
import { IABZeusTranslatorOutput } from 'abzeus';
import { PropsWithChildren, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
export interface ISuggested {
    [x: string]: string[];
}

const MainWrapper = (props:PropsWithChildren):React.ReactNode => {
    
    const {children} = props;

    const dispatch = useDispatch();

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
        } else {
            dispatch(setOptions({lang:"en"}))
        }
      }, []);

    return children
}

export default MainWrapper;