import { RootStackParamList } from '@/navigation/Stacks';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type Thumbnail = {
  imageUrl: string;
  location: { lat: number; lon: number };
  empty?: boolean;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;
