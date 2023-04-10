import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import CatalogCategoryTitle from '../pages/productCatalog/components/CatalogCategoryTitle'
import { store } from '../store'
import { Provider } from 'react-redux'
import MainRouter from '../routes'

describe('TEST Catalog Page', () => {
    test('render catalog category title', () => {
        render(<CatalogCategoryTitle catName={'Косметика и гигиена'} />)
        const titleCatalog = screen.getByText(/косметика и гигиена/i)
        expect(titleCatalog).toBeInTheDocument()
    })

    test('renders filter types header', async () => {
        render(<Provider store={ store }><MainRouter /></Provider>)
        const itemsFilter = await screen.findAllByText('Уход за телом')
        expect(itemsFilter[0]).toHaveClass('type-filter-head__item')
    })

    test('hide/show manufacturers', async () => {
        render(<Provider store={ store }><MainRouter /></Provider>)
        const toggleManufacturer = screen.getByTestId('toggle-manufacturer')
        const itemManufacturer = await screen.findByTestId('manufacture-5')
        expect(itemManufacturer).not.toBeVisible()
        fireEvent.click(toggleManufacturer)
        expect(itemManufacturer).toBeVisible()
    })
})

