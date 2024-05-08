import { Box, Button, ButtonGroup } from "@mui/material";
import { PropsWithChildren, ReactNode, useState } from "react";

export interface IABZeusLetterComponent extends PropsWithChildren {
    uppercase?: boolean
    letter: string
}

const Letter = (props: IABZeusLetterComponent): ReactNode => {

    const { uppercase = false, letter } = props;

    const [localUpperCase, setLocalUpperCase] = useState<boolean>(uppercase);
    const [localLetter, setLocalLetter] = useState<string>(letter);

    const l = (l: string) => {
        return localUpperCase ? l.toUpperCase() : l.toLowerCase();
    }

    return <Box className="mainContent">
        <div style={{ alignItems: 'center', justifyContent: 'center', height: "100vh" }}>
            <div className="abzeus diagram">{l(localLetter)}</div>
            <Box sx={{ m: 1 }} className="hideOnScreenshot">
                <ButtonGroup>
                    <Button size="small" variant={"contained"} value={(localLetter).toLowerCase()} onClick={() => setLocalUpperCase(false)} disabled={localUpperCase === false}>{(letter).toLowerCase()}</Button>
                    <Button  size="small" variant={"contained"} value={(localLetter).toUpperCase()} onClick={() => setLocalUpperCase(true)} disabled={localUpperCase === true}>{(letter).toUpperCase()}</Button>
                </ButtonGroup>
            </Box>
        </div>
    </Box>

}

export default Letter;