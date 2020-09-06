import { AsyncStorage } from 'react-native';

export const _storeData = async(journal) => {
  let dataString = JSON.stringify(journal); 
  console.log('data stringify', dataString)
  console.log('journale elle meme', journal)
  try { 
    await AsyncStorage.setItem('_journal', dataString);
    return true;
  } catch (error) {
    console.log('error store data', error);
    return false;
  }
}

export const _retrieveData = async () => {
  try {
    console.log('value value value AsyncStorage')
    const value = await AsyncStorage.getItem('_journal');
    if (value !== null && value !=='') {
      return JSON.parse(value);
      console.log("data found",JSON.parse(value));
    }
    else{
    	return false;
    }
  } catch (error) {
    console.log('error _retrieveData', error) 
  }
};