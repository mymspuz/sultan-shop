import React, { FC } from 'react'
import { IProduct } from '../../../models/catalog'
import { useManufacturerName } from '../../../hooks'

type TProps = {
    product: IProduct
}

const ProductTitle: FC<TProps> = ({ product }: TProps) => {

    const manufacturerName = useManufacturerName(product ? product.manufacturer : 0)

    return (
        <h2 className="h2 fw-normal lh-6 c-grey-2 mt-m-2">
            <span className="fw-bolder">{manufacturerName} {product.brand} </span>
            {product.name}
        </h2>
    )
}

export default ProductTitle