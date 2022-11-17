import { $, setStylesByObject } from "../../../utils/DOM/DOM";

const styleParams = {
    enabled: {container: {left: '-28em'}, btn: {right: '33em'}},
    disabled: {container: {left: '10em'}, btn: {right: '0'}}
}


function onMovePartyContainerClick(partyContainer, activeContainer) {
    Array.from(partyContainer.children).forEach(parrent => {
        const [btn, container] = Array.from(parrent.children)
        let params = {}
        if (activeContainer === parrent) {
            params = styleParams['enabled']
        } else {
            params = styleParams['disabled']
        }
        setStylesByObject(btn, params['btn'])
        setStylesByObject(container, params['container'])
    });
}

function onDrugPartyContainer(partyContainer, activeContainer) {
    // const startMooving = $.rect(activeContainer).right
    function onStartMoveContainer({clientX, clientY}) {
        activeContainer.style.right = activeContainer.getBoundingClientRect().x - clientX + 'px'
    }
    document.addEventListener('mousemove', onStartMoveContainer)
}

function onMovePartyContainer(partyContainer, event) {
    const activeContainer = Array.from(partyContainer.children).find(container => container.dataset.active)
    switch(event) {
        case 'click': onMovePartyContainerClick(partyContainer, activeContainer)
            break;
        case 'drug': onDrugPartyContainer(partyContainer, activeContainer)
    }
}

export {
    onMovePartyContainer
}