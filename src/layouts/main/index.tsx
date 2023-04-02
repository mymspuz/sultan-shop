import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import SectionHeader from './sections/SectionHeader'
import SectionFooter from './sections/SectionFooter'

const MainLayout: FC = () => {

    return (
        <>
            <SectionHeader />
            <main>
                <div className="container">
                    <Outlet />
                </div>
            </main>
            <SectionFooter />
        </>
    )
}

export default MainLayout