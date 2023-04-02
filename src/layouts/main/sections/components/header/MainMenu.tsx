import React, { FC } from 'react'
import { Link } from 'react-router-dom'

type TProps = {
    isMobile: boolean
}
const MainMenu: FC<TProps> = ({ isMobile }: TProps) => {
    return (
        isMobile
            ?
                <div className="main-menu">
                    <h4 className="main-menu__title">Меню сайта:</h4>
                    <ul className="main-menu__list">
                        <li><Link to='/admin'>Админка</Link></li>
                        <li><Link to='#'>Доставка и оплата</Link></li>
                        <li><Link to='#'>Возврат</Link></li>
                        <li><Link to='#'>Контакты</Link></li>
                    </ul>
                </div>
            :
                <nav className="header-menu d-flex j-content-end a-items">
                    <ul className="d-flex j-content-end a-items c-grey-1 fs-3 fw-normal lh-6">
                        <li className="pr-m-6 b-right-2"><Link to='/admin'>Админка</Link></li>
                        <li className="px-m-6 b-right-2"><Link to='#'>Доставка и оплата</Link></li>
                        <li className="px-m-6 b-right-2"><Link to='#'>Возврат</Link></li>
                        <li className="pl-m-6"><Link to='#'>Контакты</Link></li>
                    </ul>
                </nav>
    )
}

export default MainMenu