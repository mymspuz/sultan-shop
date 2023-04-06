import { configureStore } from '@reduxjs/toolkit'

import { basketReducer, productReducer, typesOfCareReducer, manufacturesReducer } from './slice'

export const store = configureStore({
    reducer: {
        products: productReducer,
        basket: basketReducer,
        typesOfCare: typesOfCareReducer,
        manufacturers: manufacturesReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch