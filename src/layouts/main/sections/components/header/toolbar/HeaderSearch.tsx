import React, { FC } from 'react'

type TProps = {
    isMobile: boolean
}
const HeaderSearch: FC<TProps> = ({ isMobile }: TProps) => {
    return (
        isMobile
            ?
                <div className="toolbar-mobile__item">
                    <i className="i-search-bl"></i>
                    <h5>Поиск</h5>
                </div>
            :
                <div className="input-search">
                    <input placeholder="Поиск..." />
                    <button className="btn small"><i className="i-search"></i></button>
                </div>
    )
}

export default HeaderSearch