import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  TOKEN = 'token';
  USER = 'User';
  COMPANY = 'company_id';
  CART = 'cart';
  setItem = async (action, data) => {
    const value = JSON.stringify({data});
    await AsyncStorage.setItem(action, value);
  };

  getItem = async action => {
    try {
      const item = await AsyncStorage.getItem(action);
      if (item !== null) {
        const parsedItem = JSON.parse(item);
        return parsedItem.data;
      }
      return null;
    } catch (e) {
      console.error('Error parsing item:', e);
      return null;
    }
  };

  removeItem = async action => {
    try {
      await AsyncStorage.removeItem(action);
      return true;
    } catch (err) {
      console.error('Error removing item:', err);
      return false;
    }
  };
  getMultipleItems = async actions => {
    try {
      const items = await AsyncStorage.multiGet(actions);
      return items.map(([key, value]) => {
        try {
          return [key, JSON.parse(value).data];
        } catch (e) {
          console.error(`Error parsing item for key ${key}:`, e);
          return [key, null];
        }
      });
    } catch (e) {
      console.error('Error fetching multiple items:', e);
      return actions.map(key => [key, null]);
    }
  };
  clear = async () => {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  };
}

const storage = new StorageService();
export default storage;
