import React, {FC, useEffect, useState} from 'react'

import { useAppSelector } from '../../../../../../store/hooks'
import { Link } from 'react-router-dom'
import { getPrice } from '../../../../../../utils/utilsStr'

type TProps = {
    isMobile: boolean
}
const BtnBasket: FC<TProps> = ({ isMobile }: TProps) => {

    const stateBasket = useAppSelector(state => state.basket)

    const [state, setState] = useState<{ count: number, summa: number }>({ count: stateBasket.allCount, summa: stateBasket.summa })

    useEffect(() => {
        setState({ count: stateBasket.allCount, summa: stateBasket.summa })
    }, [stateBasket])

    return (
        <Link to={'basket'} data-testid={'basket-link'}>
            {isMobile
            ?
                <div className="toolbar-basket">
                    <div className="toolbar-basket__img">
                        <i className="i-basket"></i>
                        <div className="basket-count">{state.count && state.count}</div>
                    </div>
                </div>
            :
                <div className="toolbar-basket d-flex j-content-sb a-items p-m-2">
                    <div className="toolbar-basket__img mr-s-4">
                        <i className="i-basket"></i>
                        {state.count
                            ?
                                <div className="basket-count d-flex j-content a-items fs-2 lh-1 fw-bold c-white">{state.count}</div>
                            :
                                ''
                        }
                    </div>
                    <div className="d-flex j-content a-items-start f-direct ml-s-4">
                        <p className="c-grey-1 fs-2 lh-4 fw-light">Корзина</p>
                        <p className="c-grey-2 fs-3 lh-6 fw-semibold">{getPrice(state.summa)}</p>
                    </div>
                </div>
            }
        </Link>
    )
}

export default BtnBasket