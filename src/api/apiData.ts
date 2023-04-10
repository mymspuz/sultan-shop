import dataProducts from '../data/products.json'
import dataManufactures from '../data/manufactures.json'
import dataTypesOfCare from '../data/typesCare.json'

import { IManufacturer, IProduct, ITypesCare } from '../models/catalog'
import { getProductsLocalStorage } from '../utils/localStorage'

type TFilter = {
    typesCare: number []
    price: { min: number, max: number }
    manufacturers: number []
}

export const getActualProducts = (): IProduct[] => {
    const data = getProductsLocalStorage()
    return data ? data : dataProducts.products
}

// Загружаем тестовые данные из файлов
const products: IProduct[] = getActualProducts()
const typesOfCare: ITypesCare[] = dataTypesOfCare.typesCare
const manufacturers: IManufacturer[] = dataManufactures.manufacture

// Запрос на получение нового ID
export const getNewId = (): number => products.length ? products[products.length - 1].id + 1 : 1
// Запрашиваем список всех продуктов
export const getProducts = (): Promise<IProduct[]> => new Promise(resolve => setTimeout(() => resolve(getActualProducts()), 500))
// Запрашиваем продукт по ID
export const getProduct = (id: number): Promise<IProduct | null> => new Promise(function (resolve) {
    setTimeout(() => {
        const data = getActualProducts().filter(p => p.id === id)
        return data.length ? resolve(data[0]) : resolve(null)
    }, 150)
})
// Запрашиваем продукты, которые удовлетворяют текущему фильтру
const filterProducts = (filter: TFilter): IProduct[] => {
    const filterProducts: IProduct [] = []
    getActualProducts().forEach(product => {
        let result: boolean = true
        // Проверка категорий
        if (filter.typesCare.length) {
            if (!filter.typesCare.some(type => product.typesCare.includes(type))) result = false
        }
        // Проверка цены
        if (filter.price.min) {
            if (product.price < filter.price.min) result = false
        }
        if (filter.price.max) {
            if (product.price > filter.price.max) result = false
        }
        // Производитель
        if (filter.manufacturers.length) {
            if (!filter.manufacturers.includes(product.manufacturer)) result = false
        }

        if (result) filterProducts.push(product)
    })
    return filterProducts
}
export const getFiltersProducts = (filter: TFilter): Promise<IProduct[]> => new Promise(resolve => setTimeout(() => resolve(filterProducts(filter)), 500))
// Запрос на получение типов ухода
export const getTypesCare = (): Promise<ITypesCare[]> => new Promise(resolve => setTimeout(() => resolve(typesOfCare), 1000))
// Запрос на получение производителей с подсчетом товаров в каждом из них
export const getManufactureCount = (): Promise<IManufacturer[]> => new Promise(resolve =>
    setTimeout(() => resolve(
        manufacturers.map(m => {
            const result = {...m}
            result.count = products.reduce(
                (acc, product) => {
                    let inc = 0
                    if (m.id === product.manufacturer) inc = 1
                    return acc + inc
                }, 0)
            return result
        })
    ), 800)
)