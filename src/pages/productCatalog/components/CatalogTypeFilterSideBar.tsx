import React, { FC } from 'react'

import { ITypesCare } from '../../../models/catalog'
import { useAppSelector } from '../../../store/hooks'

type TProps = {
    types: ITypesCare[]
    change: (id: number) => void
}

const CatalogTypeFilterSideBar: FC<TProps> = ({ types, change }: TProps) => {

    const stateFilterTypes = useAppSelector(state => state.products.filter.typesCare)

    return (
        <div>
            <p className="filter-title mt-m-6 mb-m-3">Типы ухода</p>
            <ul className="filter-type-sb fs-3 fw-normal lh-6 c-grey-1 li-mb-10">
                {types && types.map(type =>
                    <li
                        key={type.id}
                        style={{cursor: 'pointer'}}
                        onClick={() => change(type.id)}
                        className={stateFilterTypes.includes(type.id) ? 'active' : ''}
                    >
                        {type.name}
                    </li>
                )}
            </ul>
            <div className="b-horizontal my-m-4"></div>
        </div>
    )
}

export default CatalogTypeFilterSideBar