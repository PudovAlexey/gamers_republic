import { getNodeByPath } from '../utils/utils';

function useLocalStorage() {
  function getState() {
    return JSON.parse(localStorage.getItem('gamersRepublicApp') || '{}');
  }

  function setState(updateState) {
    localStorage.setItem('gamersRepublicApp', JSON.stringify(updateState));
  }

  function setItemByPath(path, value) {
    const splitPath = path.split('/');
    const currentState = getState();
    splitPath.reduce((updatedStorage, path, idx, all) => {
      const finalWay = all.length - 1 === idx;
      if (updatedStorage[path] && !finalWay) {
        updatedStorage = updatedStorage[path];
      } else if (finalWay) {
        updatedStorage[path] = value;
      } else {
        updatedStorage[path] = {};
        updatedStorage = updatedStorage[path];
      }
      return updatedStorage;
    }, currentState);
    setState(currentState);
    return currentState;
  }

  function getItemByPath(path) {
    const node = getState();
    return getNodeByPath({ node, path });
  }

  function removeItemByPath(path) {
    const splitPath = path.split('/');
    const currentStorage = getState();
    let wrongWay = false;
    splitPath.reduce((context, key, idx, all) => {
      const lastIdx = idx === all.length;
      if (context[key] && !wrongWay) {
        context = context[key];
      } else if (lastIdx && context[key] && !wrongWay) {
        delete context[key];
      } else {
        wrongWay = true;
      }
      return context;
    }, currentStorage);
  }

  return {
    getState: getState(),
    setItemByPath: (path, value) => setItemByPath(path, value),
    getItemByPath: (path) => getItemByPath(path),
    removeItemByPath: (path) => removeItemByPath(path),
  };
}

export default useLocalStorage;
