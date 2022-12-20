function Image({src, alt, size, sx = {}}) {
    return (
        <img style={{
            width: size,
            height: 'auto',
            ...sx
        }} src={src} alt={alt}/>
    )
}

export {
    Image
}