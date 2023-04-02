import React, { FC } from 'react'

type TProps = {
    close: () => void
}

const BasketOrdering: FC<TProps> = ({ close }: TProps) => {
    return (
        <>
            <div className="modal-form d-flex j-content a-items" style={{ top: window.scrollY }}>
                <div className="ordering-form-content p-m-6">
                    <div className="d-flex j-content-end mb-m-12" style={{ cursor: 'pointer' }} onClick={close}>
                        <i className="i-modal-close"></i>
                    </div>
                    <div className="d-flex j-content mb-l-3">
                        <div className="btn icon"><i className="i-double-check"></i></div>
                    </div>
                    <div className="d-flex j-content mb-m-4">
                        <p className="h1 fw-mediumbold lh-2 c-grey-2 tt-uc">Спасибо за заказ</p>
                    </div>
                    <div className="d-flex j-content">
                        <p className="fs-5 fw-light lh-2 c-grey-1">Наш менеджер свяжется с вами в ближайшее время</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BasketOrdering