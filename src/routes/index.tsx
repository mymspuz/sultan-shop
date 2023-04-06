import React, { FC } from 'react'
import { Route, Routes, HashRouter } from 'react-router-dom'

import { MainLayout, AdminLayout } from '../layouts'
import { CatalogPage, ProductPage, BasketPage, AdminPage } from '../pages'
import { useAppDispatch } from '../store/hooks'
import { getBasketLocalStorage } from '../utils/localStorage'
import { basketSet } from '../store/slice/basketSlice'
import {getManufactureCount, getTypesCare} from '../api/apiData'
import { setTypesOfCare } from '../store/slice/typesOfCareSlice'
import { setManufacturers } from '../store/slice/manufacturersSlice'

const MainRouter: FC = () => {

    const dispatch = useAppDispatch()

    // Загружаем данные корзины
    const basket = getBasketLocalStorage()
    if (basket) dispatch(basketSet(basket))

    // Загружаем данные по типам
    getTypesCare().then(data => dispatch(setTypesOfCare(data)))

    // Загружаем данные по производителю
    getManufactureCount().then(data => dispatch(setManufacturers(data)))

    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<CatalogPage />} />
                    <Route path='product/:productId' element={<ProductPage />} />
                    <Route path='basket' element={<BasketPage />} />
                </Route>
                <Route element={<AdminLayout />}>
                    <Route path='admin' element={<AdminPage />} />
                </Route>
                <Route path='*' element={<h1>ErrorPage</h1>} />
            </Routes>
        </HashRouter>
    )
}

export default MainRouter