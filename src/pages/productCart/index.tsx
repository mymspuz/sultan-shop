import React, {FC, useEffect, useState} from 'react'
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
import { getProduct } from '../../api/apiData'
import Loader from '../../components/Loader'

type TState = {
    product: IProduct | null
    isLoading: boolean
}

const ProductCartPage: FC = () => {

    const dispatch = useAppDispatch()

    let { productId } = useParams()
    const [state, setState] = useState<TState>({ product: null, isLoading: false })

    const [crumbs, setCrumbs] = useState<ICrumb[]>( [
        {name: 'Главная', link: '/', isActive: false},
        {name: 'Каталог', link: '/', isActive: false},
    ])

    const addBasket = (product: IProduct, quantity: number): void => {
        dispatch(basketAdd({ product, quantity }))
    }

    useEffect(() => {
        setState({...state, isLoading: true})
        getProduct(Number(productId))
            .then(data => {
                setState({ product: data, isLoading: false })
                if (data) setCrumbs(prevState => {
                    if (prevState.some(c => c.name === data.name)) {
                        return prevState
                    } else {
                        return [...prevState, {name: data.name, link: '#', isActive: true}]
                    }
                })
            })
    }, [])

    return (
        state.isLoading
            ?
                <Loader />
            :
                state.product
                    ?
                        <>
                            <BreadCrumbs crumbs={crumbs} />
                            <div className="product-card d-flex j-content-sb a-items-start mt-m-3 mb-m-12" data-testid={'product-page'}>
                                <ProductImg pathImg={state.product.img} />
                                <div className="product-card-content pr-m-7 pt-m-7">
                                    <ProductQuantity product={state.product} />
                                    <ProductTitle product={state.product} />
                                    <div className={'mobile-hide'}><ProductWeight weight={state.product.weight} /></div>
                                    <ProductBasket product={state.product} addBasket={addBasket} />
                                    <ProductMarket />
                                    <ProductAbout product={state.product} />
                                    <ProductCharacter product={state.product} />
                                </div>
                            </div>
                        </>
                    :
                        <h1 className={'py-m-10 my-m-4 d-flex j-content fs-4 c-grey-1'}>Продукт не найден</h1>
    )
}

export default ProductCartPage