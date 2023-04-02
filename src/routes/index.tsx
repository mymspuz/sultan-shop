import React, { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { MainLayout, AdminLayout } from '../layouts'
import { CatalogPage, ProductPage, BasketPage, AdminPage } from '../pages'
import { useAppDispatch } from '../store/hooks'
import { getBasketLocalStorage } from '../utils/localStorage'
import { basketSet } from '../store/slice/basketSlice'

const MainRouter: FC = () => {

    const dispatch = useAppDispatch()
    const basket = getBasketLocalStorage()
    if (basket) dispatch(basketSet(basket))

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<CatalogPage />} />
                    <Route path='product/:productId' element={<ProductPage />} />
                    <Route path='basket' element={<BasketPage />} />
                </Route>
                <Route element={<AdminLayout />}>
                    <Route path='/admin' element={<AdminPage />} />
                </Route>
                <Route path='*' element={<h1>ErrorPage</h1>} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRouter