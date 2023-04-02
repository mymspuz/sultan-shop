import React, { FC } from 'react'

type TProps = {
    isMobile: boolean
}
const BtnCatalog: FC<TProps> = ({ isMobile }: TProps) => {
    return (
        isMobile
            ?
                <div className="toolbar-mobile__item">
                    <i className="i-catalog-bl"></i>
                    <h5>Каталог</h5>
                </div>
            :
                <button className="btn medium">
                    Каталог
                    <i className="i-catalog"></i>
                </button>
    )
}

export default BtnCatalog