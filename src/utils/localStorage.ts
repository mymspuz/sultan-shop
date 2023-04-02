import { IBasket } from '../models/basket'
import { IProduct } from '../models/catalog'

export const setBasketLocalStorage = (data: IBasket): void => {
    if (data.allCount) {
        localStorage.setItem('basket', JSON.stringify(data))
    } else {
        localStorage.removeItem('basket')
    }
}

export const getBasketLocalStorage = (): IBasket | null => {
    const data = localStorage.getItem('basket')
    if (data) return JSON.parse(data) as IBasket
    return null
}

export const setProductsLocalStorage = (data: IProduct[]): void => {
    if (data.length) {
        localStorage.setItem('products', JSON.stringify(data))
    } else {
        localStorage.removeItem('products')
    }
}

export const getProductsLocalStorage = (): IProduct[] | null => {
    const data = localStorage.getItem('products')
    if (data) return JSON.parse(data) as IProduct[]
    return null
}

