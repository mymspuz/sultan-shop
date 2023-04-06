import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IManufacturer} from "../../models/catalog";

type TStore = {
    manufacturers: IManufacturer[]
    isLoading: boolean
}

const initialState: TStore = {
    manufacturers: [],
    isLoading: true
}

export const manufacturersSlice = createSlice({
    name: 'manufactures',
    initialState,
    reducers: {
        setManufacturers: (state, action: PayloadAction<IManufacturer[]>) => {
            state.manufacturers = action.payload.map((m, index) => {
                const result = {...m}
                result.visible = index < 4
                result.select = false
                return result
            })
            state.isLoading = false
        },
        setManufacturerCount: (state, action: PayloadAction<{ id: number, value: number }>) => {
            const { id, value } = action.payload
            state.manufacturers = state.manufacturers.map(m => {
                // const result = {...m}
                if (m.id === id) {
                    m.count ? m.count += value : m.count = value
                }
                return m
            })
        }
    }
})

export const { setManufacturers, setManufacturerCount } = manufacturersSlice.actions

export default manufacturersSlice.reducer