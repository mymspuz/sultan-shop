import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const FooterCatalog: FC = () => {
    return (
        <div className="footer-catalog">
            <h4 className="mb-m-5 fs-5 fw-mediumbold lh-6 c-white">Категории:</h4>
            <ul className="footer-list fs-3 fw-normal lh-6 c-white">
                <li className="mb-m-4"><Link to='#'>Бытовая химия</Link></li>
                <li className="mb-m-4"><Link to='#'>Косметика и гигиена</Link></li>
                <li className="mb-m-4"><Link to='#'>Товары для дома</Link></li>
                <li className="mb-m-4"><Link to='#'>Товары для детей и мам</Link></li>
                <li><Link to="#">Посуда</Link></li>
            </ul>
        </div>
    )
}

export default FooterCatalog