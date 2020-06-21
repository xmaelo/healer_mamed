import { AsyncStorage } from 'react-native';

export const _storeData = async(journal) => {
  try {
    await AsyncStorage.setItem('_journal', JSON.stringify(journal));
    return true;
  } catch (error) {
    console.log('error', error);
    return false;
  }
}

export const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('_journal');
    if (value !== null) {
      return JSON.parse(value);
      console.log("data found",JSON.parse(value));
    }
    else{
    	return false;
    }
  } catch (error) {
    console.log('error', error) 
  }
};