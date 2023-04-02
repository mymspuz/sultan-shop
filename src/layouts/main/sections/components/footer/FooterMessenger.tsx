import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const FooterMessenger: FC = () => {
    return (
        <>
            <p className="mt-m-4 mb-m-3 fs-3 fw-normal lh-6">Связь в мессенджерах:</p>
            <div className="d-flex j-content-start a-items">
                <Link to='#'><i className="i-whatsapp mr-m-2"></i></Link>
                <Link to='#'><i className="i-telegram"></i></Link>
            </div>
        </>
    )
}

export default FooterMessenger