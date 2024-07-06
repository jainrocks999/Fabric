import {ToastAndroid, YellowBox} from 'react-native';
import {takeEvery, put, call} from 'redux-saga/effects';
import Api from '../Api';
// import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {parse} from 'react-native-svg';
function* getPartyName(action) {
  try {
    const res = yield Api.getRequest(action.endpoint, action.token);

    if (res.status) {
      const data = action.data?.length > 0 ? action.data : [];
      yield put({
        type: 'Party_Name_Success',
        payload: [...data, ...res.data],
      });
    } else {
      yield put({
        type: 'Party_Name_Error',
      });
      ToastAndroid.show(res.message, ToastAndroid.SHORT);
    }
  } catch (err) {
    console.log(err);
    yield put({
      type: 'Party_Name_Error',
    });
    ToastAndroid.show(String(Error.message), ToastAndroid.SHORT);
  }
}
export default function* authSaga() {
  yield takeEvery('Party_Name_Request', getPartyName);
}
