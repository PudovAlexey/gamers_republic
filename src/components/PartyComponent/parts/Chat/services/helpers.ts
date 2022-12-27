function generateAddsId(adds) {
    const maxId = adds.length ? Math.max(...adds.map(({id}) => id)) : 0
    return maxId + 1
}

export {
    generateAddsId
}