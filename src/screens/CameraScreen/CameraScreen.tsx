import { useAppState } from '@react-native-community/hooks';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, PhotoFile, useCameraDevice } from 'react-native-vision-camera';
import styles from './CameraScreen.styles';
import { CaptureButton } from './components/CaptureButton';
import * as RNFS from 'react-native-fs';
import { RootStackParamList } from '@/navigation/Stacks';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DIRECTORY_PATH } from '@/utils/file';
import { SafeAreaView } from 'react-native-safe-area-context';

type CameraScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Camera'
>;

function CameraScreen() {
  const navigation = useNavigation<CameraScreenNavigationProp>();
  const device = useCameraDevice('back');
  const isFocused = useIsFocused();
  const appState = useAppState();
  const camera = useRef<Camera>(null);
  const [image, setImage] = useState<PhotoFile | null>(null);

  const isActive = isFocused && appState === 'active';

  const onTakePhoto = async () => {
    const photo = await camera.current?.takePhoto();
    if (photo) {
      setImage(photo);
    }
  };

  const onCancelPhoto = () => {
    setImage(null);
  };

  const onSavePhoto = async () => {
    const path = DIRECTORY_PATH + `/photo_${Date.now()}.jpg`;

    try {
      if (!image?.path) {
        return;
      }
      const imageBase64 = await RNFS.readFile(image.path, 'base64');

      await RNFS.appendFile(path, imageBase64, 'base64');
      setImage(null);
    } catch (error) {
      console.error('Error saving photo:', error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: !image?.path,
    });
  }, [navigation, image?.path]);

  if (device == null) {
    return (
      <View style={styles.noDeviceContainer}>
        <Text style={styles.noDeviceText}>No Device</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {image?.path ? (
        <>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancelPhoto}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: `file://${image?.path}` }}
            style={styles.container}
          />
          <TouchableOpacity style={styles.saveButton} onPress={onSavePhoto}>
            <Image
              source={require('@/assets/images/save.png')}
              style={styles.saveImage}
              resizeMode="center"
            />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isActive}
            photo
            enableLocation
          />
          <CaptureButton onPress={onTakePhoto} />
        </>
      )}
    </SafeAreaView>
  );
}

export default CameraScreen;
