import React, { FC, useEffect, useState } from 'react'

import {
    BreadCrumbs,
    CatalogSort,
    CatalogTypeFilterHead,
    FilterPrice,
    FilterManufacturer,
    CatalogTypeFilterSideBar, CatalogProduct, CatalogCategoryDesc, CatalogProductPagination
} from './components'
import { ICrumb, IManufacturer, IProduct, ISort } from '../../models/catalog'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
    setStoreClearFilter,
    setStoreFilter,
    setStorePageNum,
    setStoreProducts,
    setStoreSort
} from '../../store/slice/productSlice'
import { basketAdd } from '../../store/slice/basketSlice'
import { getFiltersProducts, getManufactureCount, getTypesCare } from '../../api/apiData'

type TSelectedFilter = {
    price: {
        min: number,
        max: number
    },
    manufacturers: number [],
}

const ProductCatalogPage: FC = () => {

    const crumbs: ICrumb[] = [
        {name: 'Главная', link: '#', isActive: false},
        {name: 'Каталог', link: '#', isActive: true}
    ]

    const typesOfCare = getTypesCare()

    const dispatch = useAppDispatch()

    const [products, setProducts] = useState<IProduct[]>([])

    const [open, setOpen] = useState<boolean>(true)

    const stateProducts = useAppSelector(state => state.products)

    const manufacturers: IManufacturer[] = getManufactureCount(stateProducts.filter.manufacturers)

    const selectedFilter: TSelectedFilter = {
        price: {
            min: stateProducts.filter.price.min,
            max: stateProducts.filter.price.max
        },
        manufacturers: [...stateProducts.filter.manufacturers]
    }

    const changeFilterPriceRange = (value: string, param: 'min' | 'max'): void => {
        const numValue: number = value ? Number(value) : 0
        param === 'min' ? selectedFilter.price.min = numValue : selectedFilter.price.max = numValue
    }

    const changeFilterManufacturers = (id: number): void => {
        if (selectedFilter.manufacturers.includes(id)) {
            selectedFilter.manufacturers = selectedFilter.manufacturers.filter(type => type !== id)
        } else {
            selectedFilter.manufacturers.push(id)
        }
    }

    const changeFilterTypes = (id: number): void => {
        dispatch(setStoreFilter({ typesCare: id, price: null, manufacturers: null }))
    }

    const changeSort = (value: ISort): void => {
        dispatch(setStoreSort(value))
    }

    const applyFilter = (): void => {
        if (selectedFilter.price.min && selectedFilter.price.max && selectedFilter.price.min > selectedFilter.price.max) {
            [selectedFilter.price.min, selectedFilter.price.max] = [selectedFilter.price.max, selectedFilter.price.min]
        }
        dispatch(setStoreFilter({ typesCare: null, price: selectedFilter.price, manufacturers: selectedFilter.manufacturers } ))
    }

    const clearFilter = (): void => {
        selectedFilter.manufacturers = []
        selectedFilter.price = { min: 0, max: 0 }
        dispatch(setStoreClearFilter())
    }

    const addBasket = (product: IProduct): void => {
        dispatch(basketAdd({ product, quantity: 1 }))
    }

    const changePagination = (num: number): void => {
        dispatch(setStorePageNum(num))
    }

    useEffect(() => {
        dispatch(setStoreProducts(getFiltersProducts(stateProducts.filter)))
    }, [stateProducts.filter])

    useEffect(() => {
        // Применяем постраничную навигацию
        const minNum = stateProducts.pagination.countProductPage * (stateProducts.pagination.pageNum - 1) + 1
        const maxNum = minNum ? minNum + stateProducts.pagination.countProductPage - 1 : 0
        let currentNum = 0
        const paginationProducts: IProduct[] = []
        let product: IProduct
        for (product of stateProducts.products) {
            currentNum += 1
            if (currentNum >= minNum && currentNum <= maxNum) paginationProducts.push(product)
            if (paginationProducts.length === stateProducts.pagination.countProductPage) break
        }
        setProducts(paginationProducts)
    }, [stateProducts.products, stateProducts.pagination])

    return (
        <>
            <BreadCrumbs crumbs={crumbs} />
            <div className="catalog">
                <div className="d-flex j-content-sb a-items-end">
                    <h1 className="h1 fw-mediumbold lh-2 tt-uc c-grey-2">Косметика и гигиена</h1>
                    <CatalogSort change={changeSort} notMobile={true} />
                </div>
                <CatalogTypeFilterHead types={typesOfCare} change={changeFilterTypes} />
                <div className="catalog-content d-flex j-content-sb a-items-start">
                    <div className="catalog-sidebar">
                        <div className="catalog-filter mt-m-4">
                            <div className={'d-flex j-content-sb a-items'}>
                                <p className="filter-title tt-uc">подбор по параметрам</p>
                                <button className={'btn small light desktop-hide'} onClick={() => setOpen(!open)}>
                                    {open ? <i className={'i-arrow-up-bl'}></i> : <i className={'i-arrow-down-bl'}></i>}
                                </button>
                            </div>
                            {open &&
                                <>
                                <FilterPrice change={changeFilterPriceRange} />
                                <FilterManufacturer listManufacturers={manufacturers} change={changeFilterManufacturers} />
                                <div className="d-flex j-content-sb a-items mb-m-3">
                                    <button
                                        className="btn medium fs-3 lh-2 fw-bold py-s-7 px-s-17"
                                        onClick={applyFilter}
                                    >
                                        Показать
                                    </button>
                                    <button
                                        className="btn small fs-3 lh-2 fw-bold"
                                        style={{padding: '17px'}}
                                        onClick={clearFilter}
                                    >
                                        <i className="i-trash"></i>
                                    </button>
                                </div>
                                </>
                            }
                            <CatalogTypeFilterSideBar types={typesOfCare} change={changeFilterTypes} />
                        </div>
                    </div>
                    <div className="catalog-products d-flex f-direct j-content-start">
                        <div className="products-list d-flex j-content-start a-items f-wrap">
                            {products && products.map(
                                product =>
                                    <CatalogProduct
                                        key={product.id}
                                        product={product}
                                        addBasket={addBasket}
                                    />
                            )}
                        </div>
                        <CatalogProductPagination change={changePagination}/>
                        <CatalogCategoryDesc />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCatalogPage