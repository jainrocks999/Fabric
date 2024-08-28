import {ToastAndroid, YellowBox} from 'react-native';
import {takeEvery, put, call} from 'redux-saga/effects';
import Api from '../Api';
// import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {parse} from 'react-native-svg';
const sortDataByQuantity = data => {
  return data.sort((a, b) => {
    if (parseFloat(a.qty) < 10 && parseFloat(b.qty) >= 10) {
      return -1;
    } else if (parseFloat(a.qty) >= 10 && parseFloat(b.qty) < 10) {
      return 1;
    } else {
      return 0;
    }
  });
};
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
function* getBag(action) {
  try {
    const data = yield call(Api.getRequest, action.endpoint, action.token);
    console.log(data.status);
    if (data.status) {
      const array = Array.isArray(action.bagdata) ? action.bagdata : [];
      yield put({
        type: 'bag_check_success',
        payload: [...array, ...data.data],
      });
      action.navigation.navigate('BagCheck');
    } else {
      yield put({
        type: 'bag_check_error',
      });
      ToastAndroid.show(data.message, ToastAndroid.LONG);
    }
  } catch (error) {
    yield put({
      type: 'bag_check_error',
    });
    ToastAndroid.show('Error with scanning QR code', ToastAndroid.SHORT);
    console.log(error);
  }
}
function* fetchCompanies(action) {
  try {
    const res = yield call(Api.getRequest, action.endpoint, action.token);
    console.log('virendra ,mishra .......', res);
    if (res.status) {
      const newdata = yield res.data.map(item => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      yield put({
        type: 'fetch_copanies_success',
        payload: newdata,
      });
    } else {
      yield put({
        type: 'fetch_copanies_error',
        payload: [],
      });
    }
  } catch (err) {
    console.log('you are the data', err);
    yield put({
      type: 'fetch_copanies_error',
      payload: [],
    });
  }
}
export default function* authSaga() {
  yield takeEvery('Party_Name_Request', getPartyName);
  yield takeEvery('bag_check_request', getBag);
  yield takeEvery('fetch_copanies_rquest', fetchCompanies);
}
