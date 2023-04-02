import React, { FC } from 'react'

import HeaderLogo from './toolbar/HeaderLogo'
import BtnBasket from './toolbar/BtnBasket'

type TProps = {
    open: () => void
    isOpen: boolean
}

const HeaderMenuMobile: FC<TProps> = ({ open, isOpen }: TProps) => {
    return (
        <div className="header__menu-mobile d-flex j-content-sb a-items">
            <button className="btn small" onClick={open}>
                {isOpen ? <i className="i-menu-close"></i> : <i className="i-menu-open"></i>}
            </button>
            <HeaderLogo />
            <BtnBasket isMobile={true} />
        </div>
    )
}

export default HeaderMenuMobile