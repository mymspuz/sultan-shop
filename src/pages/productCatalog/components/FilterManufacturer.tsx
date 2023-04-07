import React, { FC, useEffect, useState } from 'react'

import { IManufacturer } from '../../../models/catalog'
import { useAppSelector } from '../../../store/hooks'
import { Loader } from './index'

type TProps = {
    change: (id: number) => void
}
const FilterManufacturer: FC<TProps> = ({ change }: TProps) => {

    const listManufacturers = useAppSelector(state => state.manufacturers)
    const currentSelect: number[] = useAppSelector(state => state.products.filter.manufacturers)

    const [viewAll, setViewAll] = useState<boolean>(false)
    const [manufacturers, setManufacturers] = useState<IManufacturer[]>([])
    const [search, setSearch] = useState<string>('')
    const setVisible = () => {
        let count: number = 0
        const str = search.trim().toLowerCase()
        const list: IManufacturer[] = manufacturers.map(m => {
            let isFind: number = 1
            if (str && !m.name.toLowerCase().includes(str)) isFind = 0
            count += isFind
            if (isFind) {
                m.visible = count > 4 ? viewAll : true
            } else {
                m.visible = false
            }
            return m
        })
        setManufacturers(list)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') setVisible()
    }

    const handlerChange = (id: number): void => {
        const list: IManufacturer[] = manufacturers.map(m => {
            m.select = m.id === id ? !m.select : m.select
            return m
        })
        setManufacturers(list)
        change(id)
    }

    useEffect(() => {
        setVisible()
    }, [viewAll])

    useEffect(() => {
        if (!listManufacturers.isLoading) {
            const list: IManufacturer[] = listManufacturers.manufacturers.map(m => {
                const result = {...m}
                result.select = currentSelect.includes(m.id)
                return result
            })
            setManufacturers(list)
        }
    }, [listManufacturers, currentSelect])

    return (
        <div className="mt-m-6">
            <p className="filter-title">Производитель</p>
            <div className="input-search mt-m-3">
                <input
                    placeholder="Поиск..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                />
                <button className="btn small" onClick={setVisible}><i className="i-search"></i></button>
            </div>

            <fieldset className="mt-m-3">
                {!manufacturers.length ? <Loader /> : manufacturers.map(manufacturer => (
                    <div key={manufacturer.id} hidden={!manufacturer.visible} className="mb-m-1">
                        <input
                            type="checkbox"
                            id={`manufacture-${manufacturer.id}`}
                            name={`manufacture-${manufacturer.id}`}
                            className="custom-checkbox"
                            onChange={() => handlerChange(manufacturer.id)}
                            checked={manufacturer.select}
                        />
                        <label htmlFor={`manufacture-${manufacturer.id}`} className="fs-3 fw-normal lh-6 c-grey-1">
                            {manufacturer.name}
                            <span className="fs-1 fw-light c-grey-1 ml-m-1">({manufacturer.count})</span>
                        </label>
                    </div>
                ))}
            </fieldset>
            <p
                className="mt-m-3 d-flex j-content-start a-items fs-2 fw-mediumbold lh-6 c-grey-1"
                onClick={() => setViewAll(!viewAll)}
                style={{cursor: 'pointer'}}
            >
                Показать все
                {!viewAll && <span className="ml-m-1 arrow-close"></span>}
                {viewAll && <span className="ml-m-1 arrow-open"></span>}
            </p>
            <div className="b-horizontal my-m-4"></div>
        </div>
    )
}

export default FilterManufacturer