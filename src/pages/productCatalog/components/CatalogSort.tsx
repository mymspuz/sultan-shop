import React, { FC } from 'react'

import { useAppSelector } from '../../../store/hooks'
import { ISort } from '../../../models/catalog'

type TProps = {
    change: (value: ISort) => void
    notMobile: boolean
}
const CatalogSort: FC<TProps> = ({ change, notMobile }: TProps) => {
    const currentSort = useAppSelector(state => state.products.sort)

    return (
        <div className={`d-flex j-content ${notMobile ? 'mobile-hide' : ''}`}>
            <p className="mr-m-1 c-grey-2 fs-4 fw-mediumbold lh-6">Сортировка:</p>
            <select
                className="catalog-sort c-grey-1 fs-4 fw-normal lh-6"
                value={currentSort}
                onChange={e => change(e.target.value as ISort)}
            >
                <option value="nameDesc">Название (по убыванию)</option>
                <option value="nameAsc">Название (по возрастанию)</option>
                <option value="priceDesc">Цена (по убыванию)</option>
                <option value="priceAsc">Цена (по возрастанию)</option>
            </select>
        </div>
    )
}

export default CatalogSort