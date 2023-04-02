import { IProduct } from './catalog'

export interface IBasket {
    products: {
        product: IProduct,
        count: number
    }[],
    allCount: number,
    summa: number
}