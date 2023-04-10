import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import ProductBasket from '../pages/productCart/components/ProductBasket'
import { getProduct } from '../api/apiData'
import { IProduct } from '../models/catalog'
import { store } from '../store'

describe('TEST Basket State', () => {
    test('Change qnt', async () => {
        const product = await getProduct(1) as unknown as IProduct

        render(
            <Provider store={ store }>
                <ProductBasket product={product} addBasket={() => {}} />
            </Provider>
        )

        const basketQnt = screen.getByTestId('basket-count')
        const basketDec = screen.getByTestId('basket-dec')
        const basketInc = screen.getByTestId('basket-inc')

        expect(basketQnt).toHaveTextContent('1')
        fireEvent.click(basketDec)
        expect(basketQnt).toHaveTextContent('1')
        fireEvent.click(basketInc)
        expect(basketQnt).toHaveTextContent('2')
        fireEvent.click(basketDec)
        expect(basketQnt).toHaveTextContent('1')
    })
})