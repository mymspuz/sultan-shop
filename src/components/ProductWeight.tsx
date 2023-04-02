import React, { FC } from 'react'

type TProps = {
    weight: {
        dimension: string,
        count: number,
        value: number
    },
}

const ProductWeight: FC<TProps> = ({ weight }: TProps) => {
    const { count, value, dimension } = weight
    return (
        <div
            className={`product__weight ${dimension === 'мл' ? 'dimen-ml': 'dimen-gr'} c-grey-1 fw-normal fs-2 lh-4`}
        >
            {value}{count > 1 ? `x${count} ` : ' '}{dimension}
        </div>
    )
}

export default ProductWeight