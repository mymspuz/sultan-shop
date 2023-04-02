import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const FooterMenu: FC = () => {
    return (
        <div className="footer-menu">
            <div className="footer-wrapper">
                <h4 className="mb-m-5 fs-5 fw-mediumbold lh-6 c-white">Меню сайта:</h4>
                <ul className="footer-list fs-3 fw-normal lh-6 c-white">
                    <li className="mb-m-4"><Link to='#'>О компании</Link></li>
                    <li className="mb-m-4"><Link to='#'>Доставка и оплата</Link></li>
                    <li className="mb-m-4"><Link to='#'>Возврат</Link></li>
                    <li className="mb-m-4"><Link to='#'>Контакты</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default FooterMenu