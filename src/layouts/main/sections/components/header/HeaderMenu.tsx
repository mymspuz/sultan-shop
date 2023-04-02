import React, { FC } from 'react'

import HeaderContacts from './HeaderContacts'
import MainMenu from './MainMenu'

const HeaderMenu: FC = () => {
    return (
        <div className="header__menu d-flex j-content-sb a-items">
            <HeaderContacts isMobile={false} />
            <MainMenu isMobile={false} />
        </div>
    )
}

export default HeaderMenu