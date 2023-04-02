import React, { FC } from 'react'

type TProps = {
    createProduct: () => void
}

const ProductBtnCreate: FC<TProps> = ({ createProduct }) => {
    return (
        <div className={'d-flex j-content a-items mb-m-5'}>
            <button
                className="btn fs-3 lh-2 fw-bold py-l-2 px-m-5"
                onClick={createProduct}
            >
                Создать продукт
            </button>
        </div>
    )
}

export default ProductBtnCreate