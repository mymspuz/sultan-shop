import React, {FC, useState} from 'react'
import {IProduct} from "../../../models/catalog";
import {getManufacturerName} from "../../../api/apiData";
import {addZero} from "../../../utils/utilsStr";

type TProps = {
    product: IProduct
}

const ProductAbout: FC<TProps> = ({ product }: TProps) => {

    const [open, setOpen] = useState<boolean>(true)

    return (
        <>
            <ul className="mt-m-2 mb-m-6 fs-3 fw-light lh-6 c-grey-1 li-mb-5">
                <li>Производитель:<span className="fw-mediumbold c-grey-2 ml-m-1">{getManufacturerName(product.manufacturer)}</span></li>
                <li>Бренд:<span className="fw-mediumbold c-grey-2 ml-m-1">{product.brand}</span></li>
                <li>Артикул:<span className="fw-mediumbold c-grey-2 ml-m-1">{addZero(product.id, 6)}</span></li>
                <li>Штрихкод:<span className="fw-mediumbold c-grey-2 ml-m-1">{product.barcode}</span></li>
            </ul>
            <div className="d-flex j-content-start a-items mb-m-3" style={{ cursor: 'pointer' }} onClick={() => setOpen(!open)}>
                <p className="fs-4 fw-mediumbold lh-6 c-grey-2">Описание</p>
                <span className={`ml-m-1 ${open ? 'arrow-close' : 'arrow-open'}`}></span>
            </div>
            <div className="mb-m-4">
                {open ? <p className="fs-2 fw-light lh-6 c-grey-1">{product.description}</p> : ''}
            </div>
            <div className="b-horizontal mb-m-4" style={{width: '270px'}}></div>
        </>
    )
}

export default ProductAbout