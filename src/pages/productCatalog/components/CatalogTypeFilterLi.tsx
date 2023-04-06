import React, { FC } from 'react'
import {useAppSelector} from "../../../store/hooks";
import {Loader} from "./index";

type TProps = {
    change: (id: number) => void
    additionalClass: string
}
const CatalogTypeFilterLi: FC<TProps> = ({ change, additionalClass }: TProps) => {

    const stateFilterTypes = useAppSelector(state => state.products.filter.typesCare)
    const types = useAppSelector(state => state.typesOfCare)

    return (
        <>
            {types.isLoading ? <Loader /> : types.typesOfCare.map(type => (
            <li
                key={type.id}
                className={`${additionalClass}${stateFilterTypes.includes(type.id) ? ' active' : ''}`}
                onClick={() => change(type.id)}
            >
                {type.name}
            </li>
            ))}
        </>
    )
}

export default CatalogTypeFilterLi