import React, { FC } from 'react'

import { IProduct } from '../../../models/catalog'

type TProps = {
    product: IProduct
}
const ProductQuantity: FC<TProps> = ({ product }: TProps) => {
    return (
        <p className={`fs-3 fw-mediumbold lh-4 ${product.quantity ? 'in-stock': 'no-stock'}`}>
            {product.quantity ? 'В наличии' : 'Нет в наличии'}
        </p>
    )
}

export default ProductQuantity