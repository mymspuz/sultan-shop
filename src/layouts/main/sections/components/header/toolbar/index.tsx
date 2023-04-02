import React, { FC } from 'react'

import HeaderLogo from './HeaderLogo'
import BtnCatalog from './BtnCatalog'
import HeaderSearch from './HeaderSearch'
import CallCenter from './CallCenter'
import BtnPriceList from '../../BtnPriceList'
import BtnBasket from './BtnBasket'

const HeaderToolbar: FC = () => {
    return (
        <>
            <div className="header__toolbar d-flex j-content-sb a-items">
                <HeaderLogo />
                <BtnCatalog isMobile={false} />
                <HeaderSearch isMobile={false} />
                <CallCenter />
                <div className="b-left-2 b-right-2 px-m-3">
                    <BtnPriceList />
                </div>
                <BtnBasket isMobile={false} />
            </div>
            <div className="header__toolbar-mobile">
                <BtnCatalog isMobile={true} />
                <div className="toolbar-mobile__vertical"></div>
                <HeaderSearch isMobile={true} />
            </div>
        </>
    )
}

export default HeaderToolbar