import React, { FC } from 'react'
import { useParams } from 'react-router'

import { BreadCrumbs, ProductAbout, ProductBasket, ProductCharacter, ProductImg, ProductMarket } from './components'
import { ICrumb, IProduct } from '../../models/catalog'
import { getManufacturerName, getProduct } from '../../api/apiData'
import { basketAdd } from '../../store/slice/basketSlice'
import { useAppDispatch } from '../../store/hooks'
import ProductWeight from "../../components/ProductWeight";



const ProductCartPage: FC = () => {

    const dispatch = useAppDispatch()

    let { productId } = useParams()
    const product: IProduct | null = getProduct(Number(productId))

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
                    <p className={`fs-3 fw-mediumbold lh-4 ${product.quantity ? 'in-stock': 'no-stock'}`}>
                        {product.quantity ? 'В наличии' : 'Нет в наличии'}
                    </p>
                    <h2 className="h2 fw-normal lh-6 c-grey-2 mt-m-2">
                        <span className="fw-bolder">{getManufacturerName(product.manufacturer)} {product.brand} </span>
                        {product.name}
                    </h2>
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