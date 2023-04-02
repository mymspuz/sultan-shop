export const currentCurrency = '₸'

export const addZero = (src: number, size: number): string => {
    let result = String(src)
    while (result.length < size) {
        result = '0' + result
    }
    return result
}

export const getPrice = (src: number): string =>
    `${src.toLocaleString('ru-Ru', { minimumFractionDigits: 2 })} ${currentCurrency}`

export const getFirstWord = (src: string): string => src.split(' ')[0]

export const getWithoutFirstWord = (src: string): string => src.split(' ').slice(1).join(' ')