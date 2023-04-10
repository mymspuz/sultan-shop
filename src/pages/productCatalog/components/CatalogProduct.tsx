import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { IProduct } from '../../../models/catalog'
import { useAppSelector } from '../../../store/hooks'
import { getFirstWord, getPrice, getWithoutFirstWord } from '../../../utils/utilsStr'
import ProductWeight from '../../../components/ProductWeight'
import useManufacturerName from "../../../hooks/useManufacturerName";

type TProps = {
    product: IProduct
    addBasket: (product: IProduct) => void
}
const CatalogProduct: FC<TProps> = ({ product, addBasket }: TProps) => {

    const stateBasket = useAppSelector(state => state.basket)

    const manufacturerName = useManufacturerName(product.manufacturer)

    const [inBasket, setInBasket] = useState<boolean>(stateBasket.products.some(p => p.product.id === product.id))

    const handleClick = (): void => {
        setInBasket(true)
        addBasket(product)
    }

    useEffect(() => {
        setInBasket(stateBasket.products.some(p => p.product.id === product.id))
    }, [stateBasket])

    return (
        <div className="product">
            <div className="product__img" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/${product.img})`}}></div>
            <ProductWeight weight={product.weight} />
            <div className="product__name c-grey-2 fs-4 fw-mediumbold lh-4 mb-m-3">
                <Link to={`product/${product.id}`} data-testid={'product-item'}>
                    <span className="fw-bold">{getFirstWord(product.name)}</span> {getWithoutFirstWord(product.name)}
                </Link>
            </div>
            <ul className="product__characters mb-m-3">
                <li className="mt-m-1 fs-3 fw-mediumbold lh-6 c-grey-2">
                    <span className="d-inline-block mr-m-1 fw-light c-grey-1">Штрихкод:</span>
                    {product.barcode}
                </li>
                <li className="mt-m-1 fs-3 fw-mediumbold lh-6 c-grey-2">
                    <span className="d-inline-block mr-m-1 fw-light c-grey-1">Производитель:</span>
                    {manufacturerName}
                </li>
                <li className="mt-m-1 fs-3 fw-mediumbold lh-6 c-grey-2">
                    <span className="d-inline-block mr-m-1 fw-light c-grey-1">Бренд:</span>
                    {product.brand}
                </li>
            </ul>
            <div className="d-flex j-content-sb a-items">
                <p className="fs-4 fw-bolder lh-4">{getPrice(product.price)}</p>
                {product.quantity
                    ?
                        <button
                            className="btn medium fs-1 lh-2 fw-bold py-l-2 px-m-5"
                            onClick={handleClick}
                            disabled={inBasket}
                        >
                            {inBasket ? 'В КОРЗИНЕ' : 'В КОРЗИНУ'}
                            <i className="i-basket-white"></i>
                        </button>
                    :
                        <p>Нет на складе</p>
                }
            </div>
        </div>
    )
}

export default CatalogProduct