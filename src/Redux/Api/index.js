import axios from 'axios';
import Constants from '../Constants';
import {Alert} from 'react-native';
import * as naviagationService from '../../utils/navigationService';
import storage from '../../utils/storageService';

class Api {
  axiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: Constants.mainUrl,
      headers: {
        'content-type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.response.use(
      response => response,
      async error => {
        if (error.response && error.response.status === 401) {
          Alert.alert(
            'Session Expired',
            'Your session has expired. Please log in again.',
            [
              {
                text: 'OK',
                onPress: () => this.redirectToLogin(),
              },
            ],
            {cancelable: false},
          );
        }
        return Promise.reject(error);
      },
    );
  }

  redirectToLogin = async () => {
    await storage.removeItem(storage.TOKEN);
    naviagationService.reset('Login');
  };

  async getRequest(endpoint, token) {
    try {
      const response = await this.axiosInstance.get(endpoint, {
        headers: {Authorization: `Bearer ${token}`},
      });
      return response.data;
    } catch (error) {
      console.error('Request failed', error);
      throw error;
    }
  }

  async postRequest(endpoint, data, token) {
    try {
      const response = await this.axiosInstance.post(endpoint, data, {
        headers: {Authorization: `Bearer ${token}`},
      });
      return response.data;
    } catch (error) {
      console.error('Request failed', error);
      throw error;
    }
  }
}

export default new Api();
