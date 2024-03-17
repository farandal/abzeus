import { IABZeusTranslatorOutput } from '@/abzeus'
import IABZeusTranslatorConfig from '@/abzeus/interfaces/IABZeusTranslatorConfig'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ABZeusConfigState {
  input: string,
  options?: IABZeusTranslatorConfig
  output?:  IABZeusTranslatorOutput[]
}

const initialState: ABZeusConfigState = {
  input: "",
  options: {},
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
        state.options = {...state.options, ...action.payload}
    },
    setOutput: (state, action: PayloadAction<IABZeusTranslatorOutput[]>) => {
        state.output = action.payload
    },
  },
})


export const { setInput, setOptions,setOutput, resetInput } = ABZeusConfigSlice.actions

export default ABZeusConfigSlice.reducer