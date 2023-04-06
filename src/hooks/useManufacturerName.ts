import { useEffect, useState } from 'react'

import { useAppSelector } from '../store/hooks'

const useManufacturerName = (id: number): string => {
    const [name, setName] = useState<string>('')
    const manufacturers = useAppSelector(state => state.manufacturers.manufacturers)

    useEffect(() => {
        const result = manufacturers.filter(m => m.id === id)
        setName(result.length ? result[0].name : '')
    })

    return name
}

export default useManufacturerName