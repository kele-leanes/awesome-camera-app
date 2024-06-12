import { Platform } from 'react-native';
import * as RNFS from 'react-native-fs';

export const FILE_PATH = Platform.select({
  ios: '',
  android: 'file://',
});

export const DIRECTORY_PATH = RNFS.DocumentDirectoryPath + '/photos';

export const makeDir = async () => {
  try {
    const folderExists = await RNFS.exists(DIRECTORY_PATH);
    if (!folderExists) {
      await RNFS.mkdir(DIRECTORY_PATH);
    }
  } catch (error) {
    console.error('Error making dir:', error);
  }
};

export const getFiles = async () => {
  try {
    const folderExists = await RNFS.exists(DIRECTORY_PATH);
    if (folderExists) {
      return await RNFS.readDir(RNFS.DocumentDirectoryPath + '/photos');
    }
  } catch (error) {
    console.error('Error reading files:', error);
  }
};
