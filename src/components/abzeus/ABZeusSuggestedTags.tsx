import { ABZeusConfigState, setInput } from '@/state/ABZeusConfigSlice';
import { RootState } from '@/store';
import { Box, Chip } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'

export interface ISuggestedTags {
    // TODO replace lang:string for lang:IABZeusLangs type
    tags: {[lang:string]: string[]}
}

const SuggestedTags = (props:ISuggestedTags) => {

    const ABZeusState:ABZeusConfigState = useSelector((state: RootState) => state.ABZeusConfig)
    const dispatch = useDispatch();

    const {tags} = props;

    const handleTagClick = (tag: string) => {
        dispatch(setInput(tag))
    };

    return tags[ABZeusState.options?.lang || "es"].length ? <Box sx={{mt:1,display:"inline-block"}} className="suggested" >{tags[ABZeusState.options?.lang || "es"].map((tag) => (
        <Chip
            key={tag}
            label={tag}
            onClick={() => handleTagClick(tag)}
            variant="outlined"
            color="primary"
        />
    ))}</Box> : <></>
}

export default SuggestedTags;