import React, { FC } from 'react'

const ProductMarket: FC = () => {
    return (
        <div className="product-card-market d-flex j-content-start a-items mb-m-5">
            <div className="product-card__share d-flex j-content a-items p-m-5">
                <i className="i-share"></i>
            </div>
            <div className="product-card__share d-flex j-content a-items py-s-7 px-m-7">
                <p className="fs-2 fw-normal lh-6" style={{textAlign: 'center'}}>При покупке от <span className="fw-bold">10 000 ₸</span> бесплатная<br/>доставка
                    по Кокчетаву и области</p>
            </div>
            <div className="product-card__share d-flex j-content a-items py-m-6 px-s-12">
                <p className="fs-3 fw-bold lh-2 c-grey-1 mr-m-2">Прайс-лист</p>
                <i className="i-price-list-bl"></i>
            </div>
        </div>
    )
}

export default ProductMarket