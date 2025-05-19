import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export const saveToken = async (token: string) => {
  if (Platform.OS === 'web') {
    localStorage.setItem('userToken', token); // ✅ persist!
  } else {
    await SecureStore.setItemAsync('userToken', token);
  }
};

export const getToken = async (): Promise<string | null> => {
  if (Platform.OS === 'web') {
    return localStorage.getItem('userToken');
  } else {
    return await SecureStore.getItemAsync('userToken');
  }
};

export const deleteToken = async () => {
  if (Platform.OS === 'web') {
    localStorage.removeItem('userToken');
  } else {
    await SecureStore.deleteItemAsync('userToken');
  }
};
