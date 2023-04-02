import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const CallCenter: FC = () => {
    return (
        <div className="call-center d-flex j-content-sb a-items">
            <div className="call-center__content d-flex f-direct j-content-sb a-items-end mr-m-2">
                <p className="c-grey-2 fs-3 lh-6 fw-semibold">+7 (777) 490-00-91</p>
                <p className="c-grey-1 fs-2 lh-6 fw-light f-ws">время работы: 9:00-20:00</p>
                <Link to='#' className="c-grey-1 fs-1 lh-6 fw-normal tdl-u">Заказать звонок</Link>
            </div>
            <div className="call-center__photo">
                <img src={`${process.env.PUBLIC_URL}/img/call-center.png`} />
                <div className="call-center__status"></div>
            </div>
        </div>
    )
}

export default CallCenter