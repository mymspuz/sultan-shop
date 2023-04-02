import React, { FC, useEffect, useState } from 'react'

import { BasketCreateOrder, BasketHeader, BasketOrdering, BasketProduct, BreadCrumbs } from './components'
import { ICrumb } from '../../models/catalog'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { basketClear, basketDecQnt, basketIncQnt, basketRemove } from '../../store/slice/basketSlice'


const BasketPage: FC = () => {

    const crumbs: ICrumb[] = [
        {name: 'Главная', link: '/', isActive: false},
        {name: 'Корзина', link: '#', isActive: true}
    ]

    const stateBasket = useAppSelector(state => state.basket)
    const dispatch = useAppDispatch()

    const [open, setOpen] = useState<boolean>(false)

    const createOrder = (): void => {
        dispatch(basketClear())
        setOpen(!open)
    }

    const remove = (id: number): void => {
        dispatch(basketRemove(id))
    }

    const incQnt = (id: number): void => {
        dispatch(basketIncQnt(id))
    }

    const decQnt = (id: number): void => {
        dispatch(basketDecQnt(id))
    }

    const close = (): void => {
        setOpen(!open)
    }

    useEffect(() => {
        if (open) {
            document.body.classList.add('bg-modal')

            return () => {
                document.body.classList.remove('bg-modal')
            }
        }
    }, [open])


    return (
        <>
            {open && <BasketOrdering close={close} />}
            <BreadCrumbs crumbs={crumbs} />
            <BasketHeader />
            {stateBasket.products.length
                ?
                    <>
                        {stateBasket.products.map(product =>
                            <BasketProduct
                                key={product.product.id}
                                item={product}
                                removeBasket={remove}
                                incQnt={incQnt}
                                decQnt={decQnt}
                            />)
                        }
                        <BasketCreateOrder summa={stateBasket.summa} createOrder={createOrder} />
                    </>
                :
                    <>
                        <div className={'d-flex j-content a-items h2 c-grey-1 mt-m-10 mb-m-10'}>Корзина пустая</div>
                        <div className="w-100 b-horizontal mb-m-10"></div>
                    </>
            }
        </>
    )
}

export default BasketPage