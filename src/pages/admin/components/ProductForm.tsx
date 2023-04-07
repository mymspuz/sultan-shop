import React, { FC, useEffect, useState } from 'react'

import { IProduct } from '../../../models/catalog'
import { getNewId } from '../../../api/apiData'
import { useAppSelector } from '../../../store/hooks'
import Loader from '../../../components/Loader'
import { addZero, getImgPath } from '../../../utils/utilsStr'

type TProps = {
    product: IProduct | null
    close: () => void
    apply: (product: IProduct, isNew: boolean) => void
}

const ProductForm: FC<TProps> = ({ product, close, apply }: TProps) => {

    const [state, setState] = useState({
        img: product ? product.img : '',
        name: product ? product.name : '',
        weightDimension: product ? product.weight.dimension : '',
        weightCount: product ? product.weight.count : null,
        weightValue: product ? product.weight.value : null,
        sizeHeight: product ? product.size.height : null,
        sizeWidth: product ? product.size.width : null,
        sizeLength: product ? product.size.length : null,
        barcode: product ? product.barcode : null,
        brand: product ? product.brand : null,
        manufacturer: product ? product.manufacturer : null,
        typesCare: product ? product.typesCare.map(t => String(t)) : null,
        price: product ? product.price : null,
        quantity: product ? product.quantity : null,
        description: product ? product.description : null
    })

    const [isValid, setIsValid] = useState<boolean>(false)

    const manufacturers = useAppSelector(state => state.manufacturers)

    const types = useAppSelector(state => state.typesOfCare)

    const allowInput = (value: string, zero: boolean = false): boolean =>
        zero ? (!isNaN(Number(value)) && Number(value) > -1) : (!value || (!isNaN(Number(value)) && Number(value) > 0))

    const changeNumInput = (value: string, nameState: keyof typeof state, zero: boolean = false): void => {
        if (allowInput(value, zero)) setState({...state, [nameState]: value})
    }

    const btnApply = (): void => {
        const changeProduct: IProduct = {
            id: product ? product.id : getNewId(),
            img: state.img,
            name: state.name,
            weight: {
                dimension: state.weightDimension,
                count: Number(state.weightCount),
                value: Number(state.weightValue)
            },
            size: {
                height: Number(state.sizeHeight),
                width: Number(state.sizeWidth),
                length: Number(state.sizeLength)
            },
            barcode: state.barcode as string,
            manufacturer: Number(state.manufacturer),
            brand: state.brand as string,
            description: state.description as string,
            price: Number(state.price),
            quantity: Number(state.quantity),
            typesCare: state.typesCare ? state.typesCare.map(t => Number(t)) : []
        }
        apply(changeProduct, !product)
    }

    const InputInt = (placeholder: string, key: keyof typeof state, zero: boolean = false): JSX.Element => {
        return (
            <input
                className={'form-control'}
                placeholder={placeholder}
                value={state[key] ? state[key] as string : ''}
                onChange={(e) => changeNumInput(e.target.value, key, zero)}
            />
        )
    }

    const InputStr = (placeholder: string, key: keyof typeof state): JSX.Element => {
        return (
            <input
                className={'form-control'}
                placeholder={placeholder}
                value={state[key] ? state[key] as string : ''}
                onChange={(e) => setState({...state, [key]: e.target.value})}
            />
        )
    }

    const InputSelect = (options: {value: string, name: string}[], key: keyof typeof state): JSX.Element => {
        return (
            <select
                className="form-control c-grey-1 fs-4 fw-normal lh-6"
                value={state[key] as string}
                onChange={e => setState({...state, [key]: e.target.value})}
            >
                {options.map(o => <option key={o.value} value={o.value}>{o.name}</option>)}
            </select>
        )
    }

    const getListImg = (): { value: string, name: string }[] => {
        const result: { value: string, name: string }[] = []
        result.push({ value: '', name: 'Выберите изображение' })
        for (let i = 1; i < 14; i++) {
            result.push({ value: getImgPath(i), name: `Picture ${addZero(i, 2)}` })
        }
        return result
    }

    useEffect(() => {
        if (state.typesCare && ((state.typesCare.length === 1 && !state.typesCare[0]) || !state.typesCare.length)) {
            setIsValid(false)
        } else {
            setIsValid(!Object.values(state).some(e => !e))
        }
    }, [state])

    return (
        <div className="modal-form d-flex j-content a-items" style={{ top: window.scrollY }}>
            <div className="product-form p-m-6">
                <div className={'d-flex j-content'} style={{ height: '100px' }}>
                    {state.img && <img src={`${process.env.PUBLIC_URL}/${state.img}`} alt='' />}
                </div>
                <div className={'d-flex j-content mt-m-4'}>
                    {InputSelect(getListImg(), 'img')}
                </div>
                <div className={'my-m-4 d-flex j-content'}>
                    {InputStr('Введите наименование', 'name')}
                </div>
                <div className={'d-flex j-content a-items f-direct mb-m-4 p-m-2'} style={{ border: '1px solid #eee', borderRadius: '10px' }}>
                    <p className={'fs-3 fw-mediumbold c-grey-2 mb-m-4'}>Параметры вес/объем</p>
                    <div className={'d-flex j-content-sb f-g-1 w-100'}>
                        {InputSelect([{value: '', name: 'Выберите ед.измерения'}, {value: 'мл', name: 'мл'}, {value: 'г', name: 'г'}], 'weightDimension')}
                        {InputInt('Введите вес/обем', 'weightValue')}
                        {InputInt('Введите кол-во в упаковке', 'weightCount')}
                    </div>
                </div>
                <div className={'d-flex j-content-sb f-g-1 mb-m-4 p-m-2'} style={{ border: '1px solid #eee', borderRadius: '10px' }}>
                    {InputInt('Высота', 'sizeHeight')}
                    {InputInt('Ширина', 'sizeWidth')}
                    {InputInt('Длина', 'sizeLength')}
                </div>
                <div className={'d-flex j-content-sb f-g-1 mb-m-4 p-m-2'} style={{ border: '1px solid #eee', borderRadius: '10px' }}>
                    <select
                        className="form-control c-grey-1 fs-4 fw-normal lh-6"
                        value={state.manufacturer ? state.manufacturer : ''}
                        onChange={e => setState({...state, manufacturer: Number(e.target.value)})}
                    >
                        <option value="">Выберите производителя</option>
                        {manufacturers.isLoading ? <Loader /> : manufacturers.manufacturers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                    {InputStr('Бренд', 'brand')}
                    {InputStr('Штрихкод', 'barcode')}
                </div>
                <div className={'d-flex j-content-sb f-g-1 mb-m-4 p-m-2'} style={{ border: '1px solid #eee', borderRadius: '10px' }}>
                    <select
                        className="form-control c-grey-1 fs-4 fw-normal lh-6"
                        multiple={true}
                        value={state.typesCare ? state.typesCare : undefined}
                        onChange={e => setState({...state, typesCare: Array.from(e.target.selectedOptions, (item) => item.value)})}
                    >
                        <option value="">Выберите типы ухода</option>
                        {types.isLoading ? <Loader /> : types.typesOfCare.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                    {InputInt('Цена', 'price')}
                    {InputInt('Кол-во на складе', 'quantity', true)}
                </div>
                <textarea
                    className={'form-control mb-m-4'}
                    placeholder='Описание...'
                    value={state.description ? state.description : ''}
                    onChange={(e) => setState({...state, description: e.target.value})}
                />
                <div className={'d-flex j-content a-items f-g-1'}>
                    <button
                        className="btn fs-1 lh-2 fw-bold py-l-2 px-m-5"
                        disabled={!isValid}
                        onClick={btnApply}
                    >
                        Применить
                    </button>
                    <button
                        className="btn btn-cancel fs-1 lh-2 fw-bold py-l-2 px-m-5"
                        onClick={close}
                    >
                        Отменить
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductForm