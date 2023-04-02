import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { ICrumb } from '../models/catalog'

type TProps = {
    crumbs: ICrumb []
}
const BreadCrumbs: FC<TProps> = ({ crumbs }: TProps) => {
    let result: ICrumb[]
    if (crumbs.length > 1) {
        result = crumbs.map((crumb, index) => {
            if (index === crumbs.length - 1) {
                crumb.class = 'pl-m-2'
            } else {
                if (index) {
                    crumb.class = 'pl-m-2 pr-m-2 b-right-3'
                } else {
                    crumb.class = 'pr-m-2 b-right-3'
                }
            }
            return crumb
        })
    } else {
        result = crumbs
    }

    return (
        <>
        <div className="bread-crumbs mt-m-5 mb-m-10 fs-3">
            {result.map(crumb => (
                crumb.isActive
                    ?
                        <p
                            key={crumb.name}
                            className={`d-inline-block fw-light lh-2 op-5 ${crumb.class}`}
                        >
                            {crumb.name}
                        </p>
                    :
                        <Link
                            key={crumb.name}
                            to={crumb.link}
                            className={`d-inline-block fw-light lh-2 ${crumb.class}`}
                        >
                            {crumb.name}
                        </Link>
                )
            )}
        </div>
        <div className={'bread-crumbs-mobile mt-m-4 mb-m-5 d-flex j-content-start a-items'}>
            <button className={'btn small light'}>
                <i className={'i-arrow-left-bl'}></i>
            </button>
            <p className={'ml-m-1 fs-2 fw-semibold lh-3 tt-uc c-grey-1'}>Назад</p>
        </div>
        </>
    )
}

export default BreadCrumbs