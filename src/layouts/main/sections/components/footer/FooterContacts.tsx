import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const FooterContacts: FC = () => {
    return (
        <div className="footer-contacts">
            <div className="footer-wrapper">
                <h4 className="mb-m-5 fs-5 fw-mediumbold lh-6">Контакты:</h4>
                <div className="mb-m-5">
                    <p className="mb-m-1 fs-3 fw-semibold lh-6">+7 (777) 490-00-91</p>
                    <p className="mb-m-1 fs-2 fw-light lh-6">время работы: 9:00-20:00</p>
                    <Link to="#" className="fs-1 fw-bold lh-6 tdl-u">Заказать звонок</Link>
                </div>
                <div className="mb-m-5">
                    <p className="fs-3 fw-semibold lh-4">
                        <Link to="mailto:opt.sultan@mail.ru">opt.sultan@mail.ru</Link>
                        <br />
                        <span className="fs-2 fw-light lh-4">На связи в любое время</span>
                    </p>
                </div>
                <div className="d-flex j-content-start a-items">
                    <i className="i-visa mr-m-1"></i>
                    <i className="i-master-card"></i>
                </div>
            </div>
        </div>
    )
}

export default FooterContacts