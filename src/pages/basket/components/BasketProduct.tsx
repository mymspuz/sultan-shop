import React, { FC } from 'react'

import { IProduct } from '../../../models/catalog'
import ProductWeight from '../../../components/ProductWeight'
import {getPrice} from "../../../utils/utilsStr";
import {Link} from "react-router-dom";

type TProps = {
    item: {
        product: IProduct
        count: number
    }
    removeBasket: (id: number) => void
    incQnt: (id: number) => void
    decQnt: (id: number) => void
}

const BasketProduct: FC<TProps> = ({ item, removeBasket, incQnt, decQnt }: TProps) => {

    const { product, count } = item

    return (
        <>
            <div className="d-flex j-content-sb a-items py-m-10 mobile-flex-direct">
                <div className="basket-product-img" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/${product.img})`}}></div>
                <div className="basket-product-info d-flex f-direct j-content a-items-start ml-m-4 ">
                    <ProductWeight weight={product.weight} />
                    <h2 className="h2 fw-bold lh-6 c-grey-2 py-m-2">
                        <Link to={`/product/${product.id}`}>
                            {product.name}
                        </Link>
                    </h2>
                    <p className="fs-2 fw-light lh-6 c-grey-1">{product.description}</p>
                </div>
                <div className="d-flex j-content-sb a-items">
                    <div className="b-left-2" style={{ height: '60px' }}></div>
                    <div className="px-s-14">
                        <div className="d-flex j-content-sb a-items f-g-2">
                            <button
                                className="btn basket fs-2 fw-light c-grey-1"
                                onClick={() => decQnt(product.id)}
                            >
                                -
                            </button>
                            <span className="fs-3 fw-mediumbold lh-4 c-grey-1">{count}</span>
                            <button
                                className="btn basket fs-2 fw-light c-grey-1"
                                onClick={() => incQnt(product.id)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="b-left-2" style={{ height: '60px' }}></div>
                    <div className="basket-product-price px-s-14">
                        <p className="h2 fw-bolder lh-4 c-grey-2">{getPrice(product.price * count)}</p>
                    </div>
                    <div className="b-left-2" style={{ height: '60px' }}></div>
                    <div className="pl-s-14">
                        <button
                            className="btn small fs-3 lh-2 fw-bold" style={{ padding: '17px' }}
                            onClick={() => removeBasket(product.id)}
                        >
                            <i className="i-trash"></i>
                        </button>
                    </div>
                </div >
            </div>
            <div className="w-100 b-horizontal"></div>
        </>
    )
}

export default BasketProduct