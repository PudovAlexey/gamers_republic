import {call, spawn, all} from 'redux-saga/effects'
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

export {
    rootSaga
}