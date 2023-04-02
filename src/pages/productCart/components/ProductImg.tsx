import React, { FC } from 'react'

type TProps = {
    pathImg: string
}
const ProductImg: FC<TProps> = ({ pathImg }: TProps) => {
    return (
        <div className="product-card-img d-flex j-content a-items-start">
            <img src={`${process.env.PUBLIC_URL}/${pathImg}`} />
        </div>
    )
}

export default ProductImg