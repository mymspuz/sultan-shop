import { useEffect, useState } from 'react'

import { IProduct } from '../models/catalog'
import { useAppSelector } from '../store/hooks'

const useProduct = (id: number): IProduct | null => {
    const [product, setProduct] = useState<IProduct | null>(null)
    const products = useAppSelector(state => state.products.products)

    useEffect(() => {
        const result = products.filter(p => p.id === id)
        setProduct(result.length ? result[0] : null)
    })

    return product
}

export default useProduct