import React, { FC } from 'react'

import { CatalogTypeFilterLi } from './index'

type TProps = {
    change: (id: number) => void
}
const CatalogTypeFilterHead: FC<TProps> = ({ change }: TProps) => {

    return (
        <div className="mt-m-5 mb-m-6 mobile-hide">
            <ul className="type-filter-head d-flex j-content-sb a-items">
                <CatalogTypeFilterLi change={change} additionalClass={'type-filter-head__item'} />
            </ul>
        </div>
    )
}

export default CatalogTypeFilterHead