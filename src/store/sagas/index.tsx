import {call, spawn, all} from 'redux-saga/effects'
import { sendMessage } from '../../components/PartyComponent/parts/Chat/store/sagas';

function* rootSaga() {
    const sagas = [
        sendMessage
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