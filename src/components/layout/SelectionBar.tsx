import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect, useRef, useState } from 'react';
import type { RootState } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { ABZeusConfigState } from '../../state/ABZeusConfigSlice'
import { createPortal } from 'react-dom'
import { useTextSelection } from 'use-text-selection'
import { css } from '@emotion/css'
import { ABZeusAlfwetTranslator, IABZeusTranslatorOutput, IABZeusTranslatorConfig } from "abzeus/src";

type Props = {
    target?: HTMLElement
    mount?: HTMLElement
    render: React.FunctionComponent<ReturnType<typeof useTextSelection>>
}

function Portal(props: React.PropsWithChildren<{ mount?: HTMLElement }>) {
    return createPortal(
        props.children,
        props.mount || document.body
    )
}

export function Popover(props: React.PropsWithChildren<Props>) {
    const { render: Render } = props
    const textSelectionProps = useTextSelection(props.target)

    return <Portal mount={props.mount}>
        <Render {...textSelectionProps} />
    </Portal>
}

export default function SelectionBar() {
    
    const ABZeusState: ABZeusConfigState = useSelector((state: RootState) => state.ABZeusConfig)

    const translator = new ABZeusAlfwetTranslator(); // Initializes the Translator Class instance

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen?: boolean) => {
        if (!newOpen) { newOpen = !open; }
        setOpen(newOpen);
    };

    return <Popover
        render={
            ({ clientRect, isCollapsed, textContent }) => {
                if (clientRect == null || isCollapsed) return null

                const style = css`
                                position: absolute;
                                left: ${clientRect.left + clientRect.width / 2}px;
                                top: ${clientRect.top + 180}px;
                                margin-left: -75px;
                                width: 150px;
                                background: black;
                                font-size: 0.7em;
                                pointer-events: none;
                                text-align: center;
                                color: white;
                                border-radius: 3px;
                                padding:2px;
                                opacity:0.75;
                            `

                const translation = translator.translate(textContent || "",{
                    lang: ABZeusState.options?.lang || "es",
                    //parentTriniFormat: PARENT_TRINI_FORMAT,
                    //childTriniFormat: CHILD_TRINI_FORMAT,
                    nestedTranslation: false
                });

                return <div className={style}>
                    {translation.map(t => t.detailedOutput)}
                </div>
            }
        }
    />


}