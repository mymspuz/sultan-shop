import React, { FC } from 'react'
import {IProduct} from "../../../models/catalog";
import {CatalogProduct} from "./index";

type TProps = {
    products: IProduct[]
    addBasket: (product: IProduct) => void
}

const CatalogProductsList: FC<TProps> = ({ products, addBasket }: TProps) => {
    return (
        <>
            {products && products.map(
                product =>
                    <CatalogProduct
                        key={product.id}
                        product={product}
                        addBasket={addBasket}
                    />
            )}
        </>
    )
}

export default CatalogProductsList