import React, { FC, useEffect, useState } from 'react'

import {ICrumb, IProduct} from '../../models/catalog'
import { getProducts } from '../../api/apiData'
import ProductWeight from '../../components/ProductWeight'
import { getPrice } from '../../utils/utilsStr'
import { ProductBtnCreate, ProductForm, BreadCrumbs } from './components'
import { setProductsLocalStorage } from '../../utils/localStorage'
import Loader from '../../components/Loader'
import {useAppDispatch, useAppSelector} from '../../store/hooks'
import { setManufacturerCount } from '../../store/slice/manufacturersSlice'

const AdminPage: FC = () => {
    const crumbs: ICrumb[] = [
        {name: 'Главная', link: '/', isActive: false},
        {name: 'Админ.панель', link: '#', isActive: true}
    ]

    const [state, setState] = useState<{ products: IProduct[], isLoading: boolean }>({ products: [], isLoading: true })
    const [open, setOpen] = useState<{isOpen: boolean, data: IProduct | null }>({ isOpen: false, data: null })

    const stateBasket = useAppSelector(state => state.basket.products)

    const dispatch = useAppDispatch()

    const removeProduct = (id: number): void => {
        if (window.confirm('Вы уверены')) {
            setState({...state, products: state.products.filter(p => p.id !== id)})
            dispatch(setManufacturerCount({ id, value: -1 }))
        }
    }
    // Инициализация создания нового продукта
    const createProduct = (): void => {
        setOpen({ isOpen: true, data: null })
    }
    // Применение изменений
    const applyChange = (product: IProduct, isNew: boolean): void => {
        close() // Закрываем окно
        if (isNew) { // Если это новый продукт
            setState({...state, products: [...state.products, product]}) // Обновляем состояние текущего списка продуктов
            dispatch(setManufacturerCount({ id: product.manufacturer, value: 1 })) // Увеличиваем счетчик продуктов у производителя
        } else { // Если это редактирование продукта
            const data = state.products.map(old => {
                if (old.id === product.id) { // Обновляем состояние текущего списка продуктов
                    if (old.manufacturer !== product.manufacturer) { // Если был изменен производитель - обновляем счетчики
                        dispatch(setManufacturerCount({ id: old.manufacturer, value: -1 }))
                        dispatch(setManufacturerCount({ id: product.manufacturer, value: 1 }))
                    }
                    return product
                }
                return old
            })
            setState({...state, products: data})
        }
    }
    // Инициализируем редактирование продукта
    const editProduct = (product: IProduct): void => {
        setOpen({ isOpen: true, data: product })
    }
    // Закрываем модальное окно
    const close = (): void => {
        setOpen({ isOpen: false, data: null })
    }
    // Добавляем класс, который запрещает прокрутку окна
    useEffect(() => {
        if (open.isOpen) {
            document.body.classList.add('bg-modal')

            return () => {
                document.body.classList.remove('bg-modal')
            }
        }
    }, [open])

    useEffect(() => {
        if (!state.isLoading) setProductsLocalStorage(state.products)
    }, [state.products])

    useEffect(() => {
        setState({...state, isLoading: true})
        getProducts().then(data => setState({ products: data, isLoading: false }))
    }, [])

    return (
        state.isLoading
            ?
                <Loader />
            :
                <>
                <BreadCrumbs crumbs={crumbs} />
                <ProductBtnCreate createProduct={createProduct} />
                {open.isOpen && <ProductForm product={open.data} close={close} apply={applyChange} />}
                    {state.products.length
                    ?
                        <>
                            {state.products.map(product => (
                            <div key={product.id}>
                            <div className="d-flex j-content-start f-g-2 a-items py-m-2">
                                <div className="admin-product-img" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/${product.img})` }}></div>
                                <div className="basket-product-info d-flex f-direct j-content a-items-start ml-m-4 mr-m-24">
                                    <ProductWeight weight={product.weight} />
                                    <p className="fs-3 fw-bold lh-6 c-grey-2">{product.name}</p>
                                    <p className="fs-2 fw-light lh-6 c-grey-1">{product.description}</p>
                                </div>
                                <div className="d-flex j-content-sb a-items">
                                    <div className="b-left-2" style={{ height: '60px' }}></div>
                                    <div className={'d-flex j-content'}  style={{ minWidth: '148px' }}>
                                        <p className="fs-3 fw-bolder lh-4 c-grey-2">{getPrice(product.price)}</p>
                                    </div>
                                    <div className="b-left-2" style={{ height: '60px' }}></div>
                                    {stateBasket.some(basket => basket.product.id === product.id)
                                        ?
                                            <p className={'px-s-14 fw-bold'} style={{ color: 'red' }}>В корзине</p>
                                        :
                                        <>
                                            <div className="px-s-14">
                                                <button
                                                    className="btn small fs-3 lh-2 fw-bold"
                                                    style={{ padding: '17px' }}
                                                    onClick={() => editProduct(product)}
                                                >
                                                    <i className="i-edit"></i>
                                                </button>
                                            </div>
                                            <div className="b-left-2" style={{ height: '60px' }}></div>
                                            <div className="pl-s-14">
                                                <button
                                                    className="btn small fs-3 lh-2 fw-bold"
                                                    style={{ padding: '17px' }}
                                                    onClick={() => removeProduct(product.id)}
                                                >
                                                    <i className="i-trash"></i>
                                                </button>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                            <div className="w-100 b-horizontal"></div>
                        </div>
                        ))}
                        </>
                    :
                        <h2 className={'h2 c-grey-1 d-flex j-content'}>Товары не найдены</h2>
                    }
                </>
    )
}

export default AdminPage