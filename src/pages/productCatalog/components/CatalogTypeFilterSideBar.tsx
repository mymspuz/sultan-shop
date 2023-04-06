import React, { FC } from 'react'

import { CatalogTypeFilterLi } from './index'

type TProps = {
    change: (id: number) => void
}

const CatalogTypeFilterSideBar: FC<TProps> = ({ change }: TProps) => {

    return (
        <div>
            <p className="filter-title mt-m-6 mb-m-3">Типы ухода</p>
            <ul className="filter-type-sb fs-3 fw-normal lh-6 c-grey-1 li-mb-10">
                <CatalogTypeFilterLi change={change} additionalClass={''} />
            </ul>
            <div className="b-horizontal my-m-4"></div>
        </div>
    )
}

export default CatalogTypeFilterSideBar