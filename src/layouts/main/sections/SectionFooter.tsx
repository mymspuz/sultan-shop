import React, { FC } from 'react'
import {
    FooterAbout,
    FooterCatalog, FooterContacts,
    FooterLogo,
    FooterMenu,
    FooterMessenger,
    FooterSubscription
} from './components/footer'
import BtnPriceList from './components/BtnPriceList'

const SectionFooter: FC = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-container d-flex j-content-sb a-items-start c-white">
                    <div className="footer-about d-flex f-direct j-content a-items-start">
                        <div className="d-flex j-content a-items">
                            <FooterLogo />
                            <BtnPriceList />
                        </div>
                        <FooterAbout />
                        <FooterSubscription />
                    </div>
                    <FooterMenu />
                    <FooterCatalog />
                    <div className="footer-price-list">
                        <h4 className="mb-m-5 fs-5 fw-mediumbold lh-6 mobile-hide">Скачать прайс-лист:</h4>
                        <BtnPriceList />
                        <FooterMessenger />
                    </div>
                    <FooterContacts />
                </div>
            </div>
        </footer>
    )
}

export default SectionFooter