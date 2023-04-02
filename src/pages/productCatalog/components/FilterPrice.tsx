import React, {FC, useEffect, useState} from 'react'
import {useAppSelector} from "../../../store/hooks";
import {currentCurrency} from "../../../utils/utilsStr";

type TProps = {
    change: (value: string, param: 'min' | 'max') => void
}

const FilterPrice: FC<TProps> = ({ change }: TProps) => {

    const currentSelect: { min: number, max: number } = useAppSelector(state => state.products.filter.price)

    const getStrMinMax = (): {min: string, max: string} => {
        return {
            min: currentSelect.min ? currentSelect.min.toString() : '',
            max: currentSelect.max ? currentSelect.max.toString() : ''
        }
    }

    const [state, setState] = useState<{ min: string, max: string }>(getStrMinMax())

    const allowInput = (value: string): boolean => (!value || (!isNaN(Number(value)) && Number(value) > 0))

    const changeMin = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.currentTarget.value

        if (allowInput(value)) {
            setState({...state, min: value})
            change(value, 'min')
        }
    }

    useEffect(() => {
        setState(getStrMinMax)
    }, [currentSelect])

    const changeMax = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.currentTarget.value

        if (allowInput(value)) {
            setState({...state, max: value})
            change(value, 'max')
        }
    }
    return (
        <div className="mt-m-2">
            <p className="c-grey-1 fs-3 fw-light lh-6">
                Цена
                <span className="d-inline-block ml-m-1 fw-mediumbold c-grey-2">{currentCurrency}</span>
            </p>
            <div className="mt-l-2 d-flex j-content-start a-items">
                <input type="text" className="range" value={state.min} onChange={e => changeMin(e)} />
                <p className="mx-m-2">-</p>
                <input type="text" className="range" value={state.max} onChange={e => changeMax(e)} />
            </div>
        </div>
    )
}

export default FilterPrice