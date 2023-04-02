import React, { FC, useEffect, useState } from 'react'

import { IProduct } from '../../../models/catalog'
import { getManufacturers, getNewId, getTypesCare } from '../../../api/apiData'

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

    const manufacturers = getManufacturers()

    const typesOfCare = getTypesCare()

    const allowInput = (value: string, zero: boolean = false): boolean =>
        zero ? (!value || (!isNaN(Number(value)) && Number(value) > -1)) : (!value || (!isNaN(Number(value)) && Number(value) > 0))

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
                count: state.weightCount as number,
                value: state.weightValue as number
            },
            size: {
                height: state.sizeHeight as number,
                width: state.sizeWidth as number,
                length: state.sizeLength as number
            },
            barcode: state.barcode as string,
            manufacturer: state.manufacturer as number,
            brand: state.brand as string,
            description: state.description as string,
            price: state.price as number,
            quantity: state.quantity as number,
            typesCare: state.typesCare ? state.typesCare.map(t => Number(t)) : []
        }
        apply(changeProduct, !product)
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
                    {state.img && <img src={`${process.env.PUBLIC_URL}/${state.img}`} />}
                </div>
                <div className={'d-flex j-content mt-m-4'}>
                    <select
                        className="form-control c-grey-1 fs-4 fw-normal lh-6"
                        value={state.img}
                        onChange={e => setState({...state, img: e.target.value})}
                    >
                        <option value="">Выберите изображение</option>
                        <option value="img/products/product_01.png">Picture 01</option>
                        <option value="img/products/product_02.png">Picture 02</option>
                        <option value="img/products/product_03.png">Picture 03</option>
                        <option value="img/products/product_04.png">Picture 04</option>
                        <option value="img/products/product_05.jpg">Picture 05</option>
                        <option value="img/products/product_06.jpg">Picture 06</option>
                        <option value="img/products/product_07.jpg">Picture 07</option>
                        <option value="img/products/product_08.jpg">Picture 08</option>
                        <option value="img/products/product_09.jpg">Picture 09</option>
                        <option value="img/products/product_10.jpg">Picture 10</option>
                        <option value="img/products/product_11.jpg">Picture 11</option>
                        <option value="img/products/product_12.jpg">Picture 12</option>
                        <option value="img/products/product_13.jpg">Picture 13</option>
                    </select>
                </div>
                <div className={'my-m-4 d-flex j-content'}>
                    <input
                        className={'form-control'}
                        placeholder='Введите наименование'
                        value={state.name}
                        onChange={(e) => setState({...state, name: e.target.value})}
                    />
                </div>
                <div className={'d-flex j-content a-items f-direct mb-m-4 p-m-2'} style={{ border: '1px solid #eee', borderRadius: '10px' }}>
                    <p className={'fs-3 fw-mediumbold c-grey-2 mb-m-4'}>Параметры вес/объем</p>
                    <div className={'d-flex j-content-sb f-g-1 w-100'}>
                        <select
                            className="form-control c-grey-1 fs-4 fw-normal lh-6"
                            value={state.weightDimension}
                            onChange={e => setState({...state, weightDimension: e.target.value})}
                        >
                            <option value="">Выберите ед.измерения</option>
                            <option value="мл">мл</option>
                            <option value="г">г</option>
                        </select>
                        <input
                            className={'form-control'}
                            placeholder='Введите вес/обем'
                            value={state.weightValue ? state.weightValue : ''}
                            onChange={(e) => changeNumInput(e.target.value, 'weightValue')}
                        />
                        <input
                            className={'form-control'}
                            placeholder='Введите кол-во в упаковке'
                            value={state.weightCount ? state.weightCount : ''}
                            onChange={(e) => changeNumInput(e.target.value, 'weightCount')}
                        />
                    </div>
                </div>
                <div className={'d-flex j-content-sb f-g-1 mb-m-4 p-m-2'} style={{ border: '1px solid #eee', borderRadius: '10px' }}>
                    <input
                        className={'form-control'}
                        placeholder='Высота'
                        value={state.sizeHeight ? state.sizeHeight : ''}
                        onChange={(e) => changeNumInput(e.target.value, 'sizeHeight')}
                    />
                    <input
                        className={'form-control'}
                        placeholder='Ширина'
                        value={state.sizeWidth ? state.sizeWidth : ''}
                        onChange={(e) => changeNumInput(e.target.value, 'sizeWidth')}
                    />
                    <input
                        className={'form-control'}
                        placeholder='Длина'
                        value={state.sizeLength ? state.sizeLength : ''}
                        onChange={(e) => changeNumInput(e.target.value, 'sizeLength')}
                    />
                </div>
                <div className={'d-flex j-content-sb f-g-1 mb-m-4 p-m-2'} style={{ border: '1px solid #eee', borderRadius: '10px' }}>
                    <select
                        className="form-control c-grey-1 fs-4 fw-normal lh-6"
                        value={state.manufacturer ? state.manufacturer : ''}
                        onChange={e => setState({...state, manufacturer: Number(e.target.value)})}
                    >
                        <option value="">Выберите производителя</option>
                        {manufacturers && manufacturers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                    <input
                        className={'form-control'}
                        placeholder='Бренд'
                        value={state.brand ? state.brand : ''}
                        onChange={(e) => setState({...state, brand: e.target.value})}
                    />
                    <input
                        className={'form-control'}
                        placeholder='Штрихкод'
                        value={state.barcode ? state.barcode : ''}
                        onChange={(e) => setState({...state, barcode: e.target.value})}
                    />
                </div>
                <div className={'d-flex j-content-sb f-g-1 mb-m-4 p-m-2'} style={{ border: '1px solid #eee', borderRadius: '10px' }}>
                    <select
                        className="form-control c-grey-1 fs-4 fw-normal lh-6"
                        multiple={true}
                        value={state.typesCare ? state.typesCare : undefined}
                        onChange={e => setState({...state, typesCare: Array.from(e.target.selectedOptions, (item) => item.value)})}
                    >
                        <option value="">Выберите типы ухода</option>
                        {typesOfCare && typesOfCare.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                    <input
                        className={'form-control'}
                        placeholder='Цена'
                        value={state.price ? state.price : ''}
                        onChange={(e) => changeNumInput(e.target.value, 'price')}
                    />
                    <input
                        className={'form-control'}
                        placeholder='Кол-во на складе'
                        value={state.quantity ? state.quantity : ''}
                        onChange={(e) => changeNumInput(e.target.value, 'quantity', true)}
                    />
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

export default ProductForm;