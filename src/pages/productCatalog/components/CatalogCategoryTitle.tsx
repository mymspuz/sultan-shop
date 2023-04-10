import React, { FC } from 'react'

type TProps = {
    catName: string
}

const CatalogCategoryTitle: FC<TProps> = ({ catName }: TProps) => {
    return (
        <h1 className="h1 fw-mediumbold lh-2 tt-uc c-grey-2">{catName}</h1>
    )
}

export default CatalogCategoryTitle