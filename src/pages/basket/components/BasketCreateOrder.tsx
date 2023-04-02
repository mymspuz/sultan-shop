import React, { FC } from 'react'
import {getPrice} from "../../../utils/utilsStr";

type TProps = {
    summa: number
    createOrder: () => void
}

const BasketCreateOrder: FC<TProps> = ({ summa, createOrder }: TProps) => {
    return (
        <div className="d-flex j-content-sb a-items mt-m-10 mb-m-20">
            <button className="btn medium fs-3 lh-2 fw-bold py-m-4 px-m-7" onClick={createOrder}>
                Оформить заказ
            </button>
            <p className="h2 fw-bolder lh-4">{getPrice(summa)}</p>
        </div>
    )
}

export default BasketCreateOrder