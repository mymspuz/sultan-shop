import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import {AdminFooter, AdminHeader} from './components'

const AdminLayout: FC = () => {
    return (
        <>
            <AdminHeader />
            <main>
                <div className="container mb-m-10" style={{ minHeight: 'calc(100vh - 410px)' }}>
                    <Outlet />
                </div>
            </main>
            <AdminFooter />
        </>
    )
}

export default AdminLayout