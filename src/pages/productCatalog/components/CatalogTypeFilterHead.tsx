import React, { FC } from 'react'

import { ITypesCare } from '../../../models/catalog'
import { useAppSelector } from '../../../store/hooks'

type TProps = {
    types: ITypesCare[]
    change: (id: number) => void
}
const CatalogTypeFilterHead: FC<TProps> = ({ types, change }: TProps) => {

    const stateFilterTypes = useAppSelector(state => state.products.filter.typesCare)

    return (
        <div className="mt-m-5 mb-m-6 mobile-hide">
            <ul className="type-filter-head d-flex j-content-sb a-items">
                {types && types.map(type => (
                    <li
                        key={type.id}
                        className={`type-filter-head__item${stateFilterTypes.includes(type.id) ? ' active' : ''}`}
                        onClick={() => change(type.id)}
                    >
                        {type.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CatalogTypeFilterHead