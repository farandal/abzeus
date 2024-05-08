import { Box, Button, ButtonGroup } from "@mui/material";
import { PropsWithChildren, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface ILettersMenu extends PropsWithChildren {

}

const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "á", "é", "í", "ó", "ú", "ñ"];

const LettersMenu = (props: ILettersMenu): ReactNode => {

    const navigate = useNavigate();

    const changeLocation = (l:string) => {

        navigate(`/alfwet/${l}`);
    }

    return <Box >
        {letters.map(l => <div className="letter-button " onClick={() => changeLocation(l)}><span className="abzeus">{l}</span></div>)}
    </Box>

}

export default LettersMenu;