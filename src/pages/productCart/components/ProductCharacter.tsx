import React, {FC, useState} from 'react'

import { IProduct } from '../../../models/catalog'
import { addZero } from '../../../utils/utilsStr'
import useManufacturerName from '../../../hooks/useManufacturerName'

type TProps = {
    product: IProduct
}

const ProductCharacter: FC<TProps> = ({ product }: TProps) => {

    const [open, setOpen] = useState<boolean>(true)
    const manufacturerName = useManufacturerName(product.manufacturer)

    return (
        <>
            <div className="d-flex j-content-start a-items mb-m-3" style={{ cursor: 'pointer' }} onClick={() => setOpen(!open)}>
                <p className="fs-4 fw-mediumbold lh-6 c-grey-2">Характеристики</p>
                <span className={`ml-m-1 ${open ? 'arrow-close' : 'arrow-open'}`}></span>
            </div>
            {open
                ?
                    <ul className="mt-m-3 mb-m-6 fs-3 fw-light lh-6 c-grey-1 li-mb-5">
                        <li>Назначение:<span className="fw-mediumbold c-grey-2 ml-m-1">{product.brand}</span></li>
                        <li>Тип:<span className="fw-mediumbold c-grey-2 ml-m-1">{product.brand}</span></li>
                        <li>Производитель:<span className="fw-mediumbold c-grey-2 ml-m-1">{manufacturerName}</span></li>
                        <li>Бренд:<span className="fw-mediumbold c-grey-2 ml-m-1">{product.brand}</span></li>
                        <li>Артикул:<span className="fw-mediumbold c-grey-2 ml-m-1">{addZero(product.id, 6)}</span></li>
                        <li>Штрихкод:<span className="fw-mediumbold c-grey-2 ml-m-1">{product.barcode}</span></li>
                        <li>Вес:<span className="fw-mediumbold c-grey-2 ml-m-1">{product.weight.value} {product.weight.dimension}</span></li>
                        <li>Объем:<span className="fw-mediumbold c-grey-2 ml-m-1">{product.weight.value} {product.weight.dimension}</span></li>
                        <li>Кол-во в коробке:<span className="fw-mediumbold c-grey-2 ml-m-1">{product.weight.count}</span></li>
                    </ul>
                :
                    ''
            }
        </>
    )
}

export default ProductCharacter