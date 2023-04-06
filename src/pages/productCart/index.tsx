import React, { FC } from 'react'
import { useParams } from 'react-router'

import {
    BreadCrumbs,
    ProductAbout,
    ProductBasket,
    ProductCharacter,
    ProductImg,
    ProductMarket,
    ProductQuantity,
    ProductTitle
} from './components'
import { ICrumb, IProduct } from '../../models/catalog'
import { basketAdd } from '../../store/slice/basketSlice'
import { useAppDispatch } from '../../store/hooks'
import ProductWeight from '../../components/ProductWeight'
import { useProduct } from '../../hooks'



const ProductCartPage: FC = () => {

    const dispatch = useAppDispatch()

    let { productId } = useParams()
    const product: IProduct | null = useProduct(Number(productId))

    if (!product) return <h1>ErrorPage</h1>


    const crumbs: ICrumb[] = [
        {name: 'Главная', link: '/', isActive: false},
        {name: 'Каталог', link: '/', isActive: false},
        {name: product.name, link: '#', isActive: true},
    ]

    const addBasket = (product: IProduct, quantity: number): void => {
        dispatch(basketAdd({ product, quantity }))
    }

    return (
        <>
            <BreadCrumbs crumbs={crumbs} />
            <div className="product-card d-flex j-content-sb a-items-start mt-m-3 mb-m-12">
                <ProductImg pathImg={product.img} />
                <div className="product-card-content pr-m-7 pt-m-7">
                    <ProductQuantity product={product} />
                    <ProductTitle product={product} />
                    <div className={'mobile-hide'}><ProductWeight weight={product.weight} /></div>
                    <ProductBasket product={product} addBasket={addBasket} />
                    <ProductMarket />
                    <ProductAbout product={product} />
                    <ProductCharacter product={product} />
                </div>
            </div>
        </>
    )
}

export default ProductCartPage