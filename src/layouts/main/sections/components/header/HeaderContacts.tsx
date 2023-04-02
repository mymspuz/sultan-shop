import React, { FC } from 'react'
import { Link } from 'react-router-dom'

type TProps = {
    isMobile: boolean
}
const HeaderContacts: FC<TProps> = ({ isMobile }: TProps) => {
    return (
        isMobile
            ?
                <>
                    <div className="menu-mobile__contacts">
                        <div className="contacts-item">
                            <i className="i-point"></i>
                            <p className="header-contacts__content">
                                г. Кокчетав, ул. Ж. Ташенова 129Б
                                <br />
                                <span>(Рынок Восточный)</span>
                            </p>
                        </div>
                        <div className="contacts-item">
                            <i className="i-mail"></i>
                            <p className="header-contacts__content">
                                <Link to="mailto:opt.sultan@mail.ru">opt.sultan@mail.ru</Link>
                                <br />
                                <span>На связи в любое время</span>
                            </p>
                        </div>
                        <div className="contacts-item">
                            <i className="i-phone"></i>
                            <p className="header-contacts__content">
                                Отдел продаж
                                <br />
                                <span>+7 (777) 490-00-91</span>
                            </p>
                        </div>
                        <div className="contacts-item simple">
                            <p>
                                <span>время работы: 9:00-20:00</span>
                            </p>
                        </div>
                    </div>
                    <div className="menu-mobile__request-call">
                        <button className="btn small"><i className="i-phone-white"></i></button>
                        <Link to='#'>Заказать звонок</Link>
                    </div>
                </>
            :
                <div className="header-contacts d-flex j-content-start a-items">
                    <div className="d-flex j-content-start a-items h-100">
                        <i className="i-point"></i>
                        <p
                            className="ml-s-6 pr-m-4 c-grey-2 fs-3 lh-2 fw-semibold"
                            style={ { borderRight: '1px dashed rgba(0, 0, 0, .05)' } }
                        >
                            г. Кокчетав, ул. Ж. Ташенова 129Б
                            <br />
                            <span className="c-grey-1 fs-2 lh-2 fw-light">(Рынок Восточный)</span>
                        </p>
                    </div>
                    <div className="d-flex j-content-start a-items ml-m-4 h-100">
                        <i className="i-mail"></i>
                        <p className="ml-s-6 fs-3 lh-2">
                            <a
                                href="mailto:opt.sultan@mail.ru"
                                className="c-grey-2 fs-3 lh-2 fw-semibold"
                            >
                                opt.sultan@mail.ru
                            </a>
                            <br />
                            <span className="c-grey-1 fs-2 lh-2 fw-light">На связи в любое время</span>
                        </p>
                    </div>
                </div>
    )
}

export default HeaderContacts