import React, { FC, useEffect, useState } from 'react'

import { IProduct } from '../../models/catalog'
import { getProducts } from '../../api/apiData'
import ProductWeight from '../../components/ProductWeight'
import { getPrice } from '../../utils/utilsStr'
import { ProductBtnCreate, ProductForm } from './components'
import { setProductsLocalStorage } from '../../utils/localStorage'
import Loader from '../../components/Loader'
import {useAppDispatch} from "../../store/hooks";
import {setManufacturerCount} from "../../store/slice/manufacturersSlice";

const AdminPage: FC = () => {

    const [products, setProducts] = useState<IProduct[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<{isOpen: boolean, data: IProduct | null }>({ isOpen: false, data: null })

    const dispatch = useAppDispatch()

    const removeProduct = (id: number): void => {
        if (window.confirm('Вы уверены')) {
            setProducts(products.filter(p => p.id !== id))
            dispatch(setManufacturerCount({ id, value: -1 }))
        }
    }

    const createProduct = (): void => {
        setOpen({ isOpen: true, data: null })
    }

    const applyChange = (product: IProduct, isNew: boolean): void => {
        close()
        if (isNew) {
            setProducts([...products, product])
            dispatch(setManufacturerCount({ id: product.manufacturer, value: 1 }))
        } else {
            const data = [...products]
            setProducts(data.map(p => p.id === product.id ? product : p))
        }
    }
    const editProduct = (product: IProduct): void => {
        setOpen({ isOpen: true, data: product })
    }

    const close = (): void => {
        setOpen({ isOpen: false, data: null })
    }

    useEffect(() => {
        if (open.isOpen) {
            document.body.classList.add('bg-modal')

            return () => {
                document.body.classList.remove('bg-modal')
            }
        }
    }, [open])

    useEffect(() => {
        setProductsLocalStorage(products)
    }, [products])

    useEffect(() => {
        setIsLoading(true)
        getProducts().then(data => {
            setProducts(data)
            setIsLoading(false)
        })
    }, [])

    return (
        isLoading
            ?
                <Loader />
            :
                <>
                <ProductBtnCreate createProduct={createProduct} />
                {open.isOpen && <ProductForm product={open.data} close={close} apply={applyChange} />}
                    {products.length
                    ?
                        <>
                            {products.map(product => (
                            <div key={product.id}>
                            <div className="d-flex j-content-sb a-items py-m-2">
                                <div className="admin-product-img" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/${product.img})` }}></div>
                                <div className="basket-product-info d-flex f-direct j-content a-items-start ml-m-4 mr-m-24">
                                    <ProductWeight weight={product.weight} />
                                    <p className="fs-3 fw-bold lh-6 c-grey-2">{product.name}</p>
                                    <p className="fs-2 fw-light lh-6 c-grey-1">{product.description}</p>
                                </div>
                                <div className="d-flex j-content-sb a-items">
                                    <div className="b-left-2" style={{ height: '60px' }}></div>
                                    <div className="px-s-14">
                                        <p className="fs-3 fw-bolder lh-4 c-grey-2">{getPrice(product.price)}</p>
                                    </div>
                                    <div className="b-left-2" style={{ height: '60px' }}></div>
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