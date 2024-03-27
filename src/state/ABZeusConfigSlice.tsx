import { IABZeusTranslatorOutput,IABZeusTranslatorConfig } from '../abzeus'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ABZeusConfigState {
  input: string,
  options?: IABZeusTranslatorConfig
  output?:  IABZeusTranslatorOutput[]
}

const initialState: ABZeusConfigState = {
  input: "",
  options: {lang:"en"},
  output: []
}

export const ABZeusConfigSlice = createSlice({
  name: 'abzeus-config-state',
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload
    },
    resetInput:(state) => {
        state.input = "";
    },
    setOptions: (state, action: PayloadAction<Partial<IABZeusTranslatorConfig>>) => {
        if(state.options) {
            state.options = {...state.options, ...action.payload}
        } else {
            state.options = {...action.payload}
        }
    },
    setOutput: (state, action: PayloadAction<IABZeusTranslatorOutput[]>) => {
        state.output = action.payload
    },
  },
})


// eslint-disable-next-line react-refresh/only-export-components
export const { setInput, setOptions,setOutput, resetInput } = ABZeusConfigSlice.actions

export default ABZeusConfigSlice.reducer