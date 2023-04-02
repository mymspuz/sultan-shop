import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const FooterLogo: FC = () => {
    return (
        <Link to='/'>
            <i className="i-logo-wh"></i>
        </Link>
    )
}

export default FooterLogo