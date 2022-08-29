// 8 - 12

export function interval(value: number, range: {
    from: number,
    to: number 
}): {
    isValid: boolean,
    where: undefined | "from" | "to"
} {
    let where
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