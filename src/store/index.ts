import { configureStore } from '@reduxjs/toolkit'

import {basketReducer, productReducer} from './slice'

export const store = configureStore({
    reducer: {
        products: productReducer,
        basket: basketReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch