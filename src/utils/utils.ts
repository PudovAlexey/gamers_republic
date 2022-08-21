// 8 - 12

export function interval(value: number, range: {
    from: number,
    to: number 
}): boolean {
    let where = null
    if (value <= range.from) {
        where = 'from'
    } else if(value <= range.to) {
        where = 'to'
    }
    return {
        isValid: value >= range.from && value <= range.to,
        where 
    }
}