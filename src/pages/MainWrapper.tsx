import { ABZeusConfigState, setInput, setOptions } from '@/state/ABZeusConfigSlice';
import { RootState } from '@/store';
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