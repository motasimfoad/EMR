import {all} from 'redux-saga/effects';
import authSagas from './Auth';

export default function* rootSaga(getState) {
    yield all([
        authSagas()
    ]);
}
