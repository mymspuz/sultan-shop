import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IProduct, ISort } from '../../models/catalog'

type TStore = {
    products: IProduct []
    filter: {
        price: {
            min: number,
            max: number
        },
        manufacturers: number [],
        typesCare: number []
    }
    sort: ISort
    pagination: {
        count: number
        pageNum: number
        countProductPage: number
    }
}

type TFilter = {
    typesCare: number | null
    price: { min: number, max: number } | null
    manufacturers: number [] | null
}

const initialState: TStore = {
    products: [],
    filter: {
        price: { min: 0, max: 0 },
        manufacturers: [],
        typesCare: []
    },
    sort: 'priceAsc',
    pagination: {
        count: 0,
        pageNum: 0,
        countProductPage: 6
    }
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setStoreProducts: (state, action: PayloadAction<IProduct[]>) => {
            state.products = action.payload
            state.pagination.count = Math.ceil(state.products.length / state.pagination.countProductPage)

            // Изменяем постраничную навигацию
            state.pagination.count = Math.ceil(state.products.length / state.pagination.countProductPage)
            if (state.pagination.count) {
                if (!state.pagination.pageNum || state.pagination.pageNum > state.pagination.count) {
                    state.pagination.pageNum = 1
                }
            } else {
                state.pagination.pageNum = 0
            }
        },
        setStoreFilter: (state, action: PayloadAction<TFilter>) => {
            const { typesCare, price, manufacturers } = action.payload

            // Изменяем значение фильтра по категориям
            if (typesCare !== null) {
                if (state.filter.typesCare.includes(typesCare)) {
                    state.filter.typesCare = state.filter.typesCare.filter(type => type !== typesCare)
                } else {
                    state.filter.typesCare.push(typesCare)
                }
            }
            // Изменяем значение фильтра по цене
            if (price !== null) state.filter.price = price
            // Изменяем значение фильтра по производителю
            if (manufacturers !== null) state.filter.manufacturers = manufacturers
        },
        setStoreClearFilter: (state) => {
            state.filter.price = { min: 0, max: 0 }
            state.filter.manufacturers = []
            state.filter.typesCare = []
        },
        setStoreSort: (state, action: PayloadAction<ISort>) => {
            state.sort = action.payload
            if (action.payload === 'priceAsc') {
                state.products.sort((a, b) => a.price - b.price)
            }
            if (action.payload === 'priceDesc') {
                state.products.sort((a, b) => b.price - a.price)
            }
            if (action.payload === 'nameAsc') {
                state.products.sort((a, b) => a.name.localeCompare(b.name))
            }
            if (action.payload === 'nameDesc') {
                state.products.sort((a, b) => b.name.localeCompare(a.name))
            }
        },
        setStorePageNum: (state, action: PayloadAction<number>) => {
            if (action.payload <= state.pagination.count) {
                state.pagination.pageNum = action.payload
            }
        }
    }
})

export const {
    setStoreProducts,
    setStoreFilter,
    setStoreClearFilter,
    setStoreSort,
    setStorePageNum
} = productSlice.actions

export default productSlice.reducer