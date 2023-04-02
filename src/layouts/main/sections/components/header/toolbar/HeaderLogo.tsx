import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const HeaderLogo: FC = () => {
    return (
        <div className="d-flex j-content-start a-items">
            <Link to='/'><i className="i-logo-bl"></i></Link>
        </div>
    )
}

export default HeaderLogo