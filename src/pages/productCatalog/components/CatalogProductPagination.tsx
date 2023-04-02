import React, { FC } from 'react'

import { useAppSelector } from '../../../store/hooks'

type TProps = {
    change: (num: number) => void
}
const CatalogProductPagination: FC<TProps> = ({ change }: TProps) => {

    const { count, pageNum } = useAppSelector(state => state.products.pagination)

    const paginations = []

    for (let i = 1; i <= count; i++) {
        paginations.push(
            <li
                key={i}
                className={i === pageNum ? 'active': ''}
                onClick={() => change(i)}
            >
                {i}
            </li>
        )
    }

    return (
        <div className="mt-m-10 mb-l-8 d-flex j-content a-items">
            {pageNum > 1
                ? <i className="i-pag-prev next" onClick={() => change(pageNum - 1)}></i>
                : <div className="pag-empty"></div>
            }
            <ul className="pagination mx-m-7 d-flex j-content-sb a-items">
                {paginations && paginations}
            </ul>
            {pageNum !== count
                ? <i className="i-pag-next prev" onClick={() => change(pageNum + 1)}></i>
                : <div className="pag-empty"></div>
            }
        </div>
    )
}

export default CatalogProductPagination