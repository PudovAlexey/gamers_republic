const requiredButtonsConfig = {
    prev: {disabled: false, label: 'Back', onClick: () => console.log('back')},
    next: {disabled: false, label: 'Next', onClick: () => console.log('next')},
    done: {showOn: 'last', disabled: false, label: 'Done', onClick: () => console.log('Done')}
}

export {
    requiredButtonsConfig
}