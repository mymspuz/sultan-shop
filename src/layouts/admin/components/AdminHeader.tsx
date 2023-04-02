import React, { FC } from 'react'

const AdminHeader: FC = () => {
    return (
        <header className="d-flex f-direct j-content-start">
            <div className="container">
                <h2 className="h2 fw-semibold lh-6 c-grey-2 tt-uc d-flex j-content a-items py-m-10">admin panel</h2>
            </div>
            <div className="header__dividing w-100 bg-grey-1 op-2"></div>
        </header>
    )
}

export default AdminHeader