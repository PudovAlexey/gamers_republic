import { $, setStylesByObject } from '../../../utils/DOM/DOM';
import { setContainer } from '../store';
import store from '../../../store/store'

const styleParams = {
  enabled: { container: { transform: 'translate(-28em)' }, btn: {transform: 'translate(-32em)'} },
  disabled: { container: { transform: 'translate(0em)' }, btn: {transform: 'translate(-0em)'}},
};

function onMovePartyContainerClick(partyContainer, activeContainer) {
  Array.from(partyContainer.children).forEach((parrent) => {
    const [btn] = Array.from(parrent.children);
    setStylesByObject(btn, {transform: 'translate(0em)'})
    let params = {};
    if (activeContainer === parrent) {
      params = styleParams['enabled'];
    } else {
      params = styleParams['disabled'];
    }
    setStylesByObject(parrent, params['container']);
    if (activeContainer && activeContainer !== parrent) {
        setStylesByObject(btn, {transform: 'translate(-32em)'})
    } else  {
        setStylesByObject(btn, {transform: 'translate(0em)'})
    }
    
  });
}

function onDrugPartyContainer(partyContainer, activeContainer) {
  let moveTo = null;
  const [btn, container] = Array.from(activeContainer.children);
  const bodyRight = $.rect($.byEl('body')).right;
  let prevX = 0;
  let init = true;
  function onStartMoveContainer({ pageX }) {
    if (init) prevX = pageX;
    moveTo = pageX < prevX ? 'left' : pageX > prevX ? 'right' : null;
    const endContainer = $.rect(container).right;
    const startContainer = $.rect(container).left;
    if (pageX + 50 < $.rect(btn).x) return;
    if (
      !(
        (endContainer < bodyRight + 50 && moveTo === 'left') ||
        (startContainer > bodyRight && moveTo === 'right')
      ) &&
      moveTo
    ) {
      const coords = bodyRight - pageX;
      activeContainer.style.transform = `translate(${-coords + 'px'})`;
      Array.from(partyContainer.children).forEach(parrent => {
        const [btn, container] = Array.from(parrent.children)
        if (!(activeContainer && activeContainer !== parrent)) {
            setStylesByObject(btn, {transform: 'translate(0em)'})
        }
      })
    }

    init = false;
    prevX = pageX;
  }

  function onEndMoveContainer() {
    const calculatePercantageToClose =
      100 -
      ((activeContainer.getBoundingClientRect().right - container.offsetWidth) /
        container.offsetWidth -
        1) *
        100;
    const activeContainerRight = bodyRight - $.rect(activeContainer).right;
    activeContainerRight / activeContainer.offsetWidth;
    const completeClose = moveTo === 'left' ? 10 : 90;
    const isActivate = calculatePercantageToClose >= completeClose || !activeContainer.style.transform ||  /0/.test(activeContainer.style.transform) ? activeContainer : null 
    store.dispatch(setContainer(isActivate?.dataset?.partid || isActivate))
    onMovePartyContainerClick(
      partyContainer,
      isActivate
    );
    document.removeEventListener('mousemove', onStartMoveContainer);
    document.removeEventListener('mouseup', onEndMoveContainer);
  }
  document.addEventListener('mousemove', onStartMoveContainer);
  document.addEventListener('mouseup', onEndMoveContainer);
}

function onMovePartyContainer(partyContainer, part) {
  const activeContainer = Array.from(partyContainer.children).find(
    (container) => container.dataset.partid === part
  );
  onDrugPartyContainer(partyContainer, activeContainer);
}

export { onMovePartyContainer };
