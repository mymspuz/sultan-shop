import React, { FC } from 'react'

const FooterSubscription: FC = () => {
    return (
        <>
            <p className="mb-m-3 fs-2 fw-normal lh-6">Подпишись на скидки и акции</p>
            <div className="input-subscription">
                <input placeholder="Введите ваш E-mail" />
                <button className="btn small"><i className="i-arrow-right"></i></button>
            </div>
        </>
    )
}

export default FooterSubscription