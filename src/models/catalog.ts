export interface ICrumb {
    name: string
    link: string
    isActive: boolean
    class?: string
}

export interface ITypesCare {
    id: number
    name: string
}

export interface IManufacturer extends ITypesCare {
    count?: number
    visible?: boolean
    select?: boolean
}

type TDimension = 'мл' | 'г'

export type ISort = 'nameDesc' | 'nameAsc' | 'priceDesc' | 'priceAsc'

export interface IProduct {
    id: number
    img: string
    name: string
    weight: {
        dimension: string,
        count: number,
        value: number
    },
    size: {
        height: number,
        width: number,
        length: number
    },
    barcode: string
    manufacturer: number
    brand: string
    description: string
    price: number
    quantity: number
    typesCare: number[]
}
