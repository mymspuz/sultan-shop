import React, { FC, useEffect, useState } from 'react'

import { IProduct } from '../../../models/catalog'
import { useAppSelector } from '../../../store/hooks'
import {getPrice} from "../../../utils/utilsStr";

type TProps = {
    product: IProduct
    addBasket: (product: IProduct, quantity: number) => void
}
const ProductBasket: FC<TProps> = ({ product, addBasket }: TProps) => {
    const stateBasket = useAppSelector(state => state.basket)

    const [inBasket, setInBasket] = useState<boolean>(stateBasket.products.some(p => p.product.id === product.id))
    const [quantity, setQuantity] = useState<number>(product.quantity ? 1 : 0)

    const handleClick = (): void => {
        setInBasket(true)
        addBasket(product, quantity)
    }

    const incQuantity = () => {
        if (quantity < product.quantity) {
            setQuantity(prevState => prevState + 1)
        }
    }

    const decQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevState => prevState - 1)
        }
    }

    useEffect(() => {
        setInBasket(stateBasket.products.some(p => p.product.id === product.id))
    }, [stateBasket])

    return (
        <div className="product-card-basket d-flex j-content-start a-items mb-m-4">
            <p className="h2 fw-bolder lh-4 c-grey-2">{getPrice(product.price)}</p>

            {product.quantity
                ?
                <>
                <div className="product-card-basket__count d-flex j-content-sb a-items">
                    <button
                        className="btn basket fs-2 fw-light c-grey-1"
                        disabled={inBasket}
                        onClick={decQuantity}
                    >
                        -
                    </button>
                    <span className="fs-3 fw-mediumbold lh-4 c-grey-1">{quantity}</span>
                    <button
                        className="btn basket fs-2 fw-light c-grey-1"
                        disabled={inBasket}
                        onClick={incQuantity}
                    >
                        +
                    </button>
                </div>
                <button
                    className="btn medium fs-1 lh-2 fw-bold py-l-2 px-m-5"
                    onClick={handleClick}
                    disabled={inBasket}
                >
                    {inBasket ? 'В КОРЗИНЕ' : 'В КОРЗИНУ'}
                    <i className="i-basket-white"></i>
                </button>
                </>
                :
                <p>Нет на складе</p>
            }
        </div>
    )
}

export default ProductBasket