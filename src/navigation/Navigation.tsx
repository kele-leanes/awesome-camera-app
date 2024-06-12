import React, { useCallback, useEffect } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { MainStack } from './Stacks';
import BootSplash from 'react-native-bootsplash';
import { Camera } from 'react-native-vision-camera';
import colors from '@/constants/Colors';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

function Navigation() {
  const locationPermission = Camera.getLocationPermissionStatus();
  const cameraPermission = Camera.getCameraPermissionStatus();

  const requestPermissions = useCallback(async () => {
    console.log('Requesting permissions...');
    if (locationPermission !== 'granted') {
      await Camera.requestLocationPermission();
    }
    if (locationPermission !== 'granted') {
      await Camera.requestLocationPermission();
    }
    console.log(`Camera permission status: ${cameraPermission}`);
    console.log(`Location permission status: ${locationPermission}`);
  }, [locationPermission, cameraPermission]);

  useEffect(() => {
    requestPermissions().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, [requestPermissions]);

  return <NavigationContainer theme={theme}>{MainStack()}</NavigationContainer>;
}

export default Navigation;
