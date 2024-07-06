import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import Reducer from '../Reducer/Auth';
import authSaga from '../Saga/Auth';

const sagamiddleware = createSagaMiddleware();

const store = createStore(Reducer, applyMiddleware(sagamiddleware));
sagamiddleware.run(authSaga);
export default store;
