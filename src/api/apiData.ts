import { IManufacturer, IProduct, ITypesCare } from '../models/catalog'
import dataProducts from '../data/products.json'
import dataManufactures from '../data/manufactures.json'
import dataTypesOfCare from '../data/typesCare.json'
import { getProductsLocalStorage } from '../utils/localStorage'

const products: IProduct[] = getProducts()
const typesOfCare: ITypesCare[] = dataTypesOfCare.typesCare
const manufacturers: IManufacturer[] = dataManufactures.manufacture

type TFilter = {
    typesCare: number []
    price: { min: number, max: number }
    manufacturers: number []
}

export function getProducts(): IProduct[] {
    const data = getProductsLocalStorage()
    if (data) return data
    return dataProducts.products
}

export const getProduct = (id: number): IProduct | null => {
    const product = products.filter(p => p.id === id)
    return product.length ? product[0] : null
}

export const getNewId = (): number => products.length ? products[products.length - 1].id + 1 : 1

export const getFiltersProducts = (filter: TFilter): IProduct[] => {
    const filterProducts: IProduct [] = []
    products.forEach(product => {
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

export const getTypesCare = (): ITypesCare[] => typesOfCare

export const getManufacturers = (): IManufacturer[] => manufacturers

export const getManufacturerName = (id: number): string => {
    const manufacturer = manufacturers.filter(m => m.id === id)
    return manufacturer.length ? manufacturer[0].name : ''
}

export const getManufactureCount = (selected: number[]): IManufacturer[] => {
    return manufacturers.map(m => {
        m.count = products.reduce(
            (acc, product) => {
                let inc = 0
                if (m.id === product.manufacturer) inc = 1
                return acc + inc
            }, 0)
        m.select = selected.includes(m.id)
        return m
    })
}