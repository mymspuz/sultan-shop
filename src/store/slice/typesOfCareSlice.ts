import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {ITypesCare} from '../../models/catalog'

type TStore = {
    typesOfCare: ITypesCare[],
    isLoading: boolean
}

const initialState: TStore = {
    typesOfCare: [],
    isLoading: true
}

const typesOfCareSlice = createSlice({
    name: 'typesOfCare',
    initialState,
    reducers: {
        setTypesOfCare: (state, action: PayloadAction<ITypesCare[]>) => {
            state.isLoading = false
            state.typesOfCare = action.payload
        }
    }
})

export const { setTypesOfCare } = typesOfCareSlice.actions

export default typesOfCareSlice.reducer