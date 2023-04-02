import React, {FC, useEffect, useState} from 'react'

import {
    HeaderContacts,
    HeaderMenu,
    HeaderMenuMobile,
    HeaderToolbar,
    MainMenu
} from './components/header'
import BtnPriceList from './components/BtnPriceList'

const SectionHeader: FC = () => {

    const [openMobile, setOpenMobile] = useState<boolean>(false)

    // useEffect(() => {
    //     if (openMobile) {
    //         document.body.classList.add('bg-modal')
    //
    //         return () => {
    //             document.body.classList.remove('bg-modal')
    //         }
    //     }
    // }, [openMobile])

    return (
        <header className="d-flex f-direct j-content-start">
            <div className="container">
                <HeaderMenu />
                <HeaderMenuMobile open={() => setOpenMobile(!openMobile)} isOpen={openMobile} />
            </div>
            <div className="header__dividing w-100 bg-grey-1 op-2"></div>
            <div className="container">
                <HeaderToolbar />
            </div>
            <div className="header__dividing w-100 bg-grey-1 op-2"></div>
            <div className="container">
                {openMobile &&
                    <>
                        <div className="mobile-modal" style={{ top: window.scrollY + 122 }}></div>
                        <div className="menu-mobile">
                            <HeaderContacts isMobile={true} />
                            <div className="menu-mobile__horizontal"></div>
                            <MainMenu isMobile={true} />
                            <div className="price-list">
                                <BtnPriceList />
                            </div>
                        </div>
                    </>
                }
            </div>
        </header>
    )
}

export default SectionHeader