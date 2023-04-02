import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IProduct } from '../../models/catalog'
import { IBasket } from '../../models/basket'
import {setBasketLocalStorage} from "../../utils/localStorage";

const initialState: IBasket = {
    products: [],
    allCount: 0,
    summa: 0
}

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        basketSet: (state, action: PayloadAction<IBasket>) => {
            const { products, allCount, summa } = action.payload
            state.products = products
            state.allCount = allCount
            state.summa = summa
        },
        basketAdd: (state, action: PayloadAction<{product: IProduct, quantity: number}>) => {
            const { product, quantity } = action.payload
            if (state.products.some(p => p.product.id === product.id)) {
                state.products.map(p => {
                    if (p.product.id === product.id) p.count += quantity
                    return p
                })
            } else {
                state.products.push({ product, count: quantity })
            }
            state.allCount += quantity
            state.summa += +(quantity * product.price).toFixed(2)
            setBasketLocalStorage(state)
        },
        basketRemove: (state, action: PayloadAction<number>) => {
            const id = action.payload
            const product = state.products.filter(p => p.product.id === id)
            if (product.length) {
                state.products = state.products.filter(p => p.product.id !== id)
                state.allCount -= product[0].count
                const decSumma = Number((product[0].count * product[0].product.price).toFixed(2))
                state.summa -= decSumma
            }
            setBasketLocalStorage(state)
        },
        basketIncQnt: (state, action: PayloadAction<number>) => {
            const id = action.payload
            state.products = state.products.map(item => {
                if (item.product.id === id) {
                    if (item.count < item.product.quantity) {
                        item.count += 1
                        state.allCount += 1
                        state.summa += item.product.price
                    }
                }
                return item
            })
            setBasketLocalStorage(state)
        },
        basketDecQnt: (state, action: PayloadAction<number>) => {
            const id = action.payload
            state.products = state.products.map(item => {
                if (item.product.id === id) {
                    if (item.count > 1) {
                        item.count -= 1
                        state.allCount -= 1
                        state.summa -= item.product.price
                    }
                }
                return item
            })
            setBasketLocalStorage(state)
        },
        basketClear: (state) => {
            state.products = []
            state.allCount = 0
            state.summa = 0
            setBasketLocalStorage(state)
        }
    }
})

export const { basketSet, basketAdd, basketRemove, basketIncQnt, basketDecQnt, basketClear } = basketSlice.actions

export default basketSlice.reducer