import {call, spawn, all, fork, take} from 'redux-saga/effects'
import { chatSagas, sendMessage } from '../../components/PartyComponent/parts/Chat/store/sagas';

function* rootSaga() {
    const sagas = [
        chatSagas
    ];
        const retrySagas = yield sagas.map(saga => {
            return spawn(function* () {
                while (true) {
                    try {
                        yield call(saga)
                            break;
                    } catch (e) {
                        console.log(e)
                    }
                }
            })
        })

        yield all(retrySagas)   
}

function* takeFirst(pattern, saga, ...args) {
    const task = yield fork(function* () {
      let firstTask = true;
      while(true) {
        const action = yield take(pattern);
        if (firstTask) {
          firstTask = false;
          yield call(saga, ...args.concat(action));
          firstTask = true;
        }
      }
    });
    return task;
  }

export {
    rootSaga,
    takeFirst
}