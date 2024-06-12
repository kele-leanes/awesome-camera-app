import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CameraScreen, HomeScreen, ImageViewerScreen } from '@/screens';
import colors from '@/constants/Colors';
import { Thumbnail } from '@/screens/HomeScreen/HomeScreen.types';

export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  ImageViewer: Thumbnail;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.text,
        headerTransparent: true,
        headerBackTitleVisible: false,
      }}
      initialRouteName={'Home'}>
      <Stack.Screen
        name="Home"
        options={{ headerTitle: 'Awesome Camera' }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="Camera"
        options={{ headerTitle: '' }}
        component={CameraScreen}
      />
      <Stack.Screen
        name="ImageViewer"
        options={{ headerTitle: '' }}
        component={ImageViewerScreen}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
