import Dimensions from '@/constants/Dimensions';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import styles from './ImageViewerScreen.styles';
import { RootStackParamList } from '@/navigation/Stacks';
import { getCityName } from '@/utils/location';
import colors from '@/constants/Colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Share from 'react-native-share';

const IMAGE_SIZE = Dimensions.width - 16;

type ImageViewerRouteProp = RouteProp<RootStackParamList, 'ImageViewer'>;
type ImageViewerNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ImageViewer'
>;

function ImageViewerScreen() {
  const { params } = useRoute<ImageViewerRouteProp>();
  const navigation = useNavigation<ImageViewerNavigationProp>();
  const [cityName, setCityName] = useState<string | null>(null);

  useEffect(() => {
    if (params.location) {
      const { lat, lon } = params.location;
      getCityName(lat, lon).then(setCityName);
    }
  }, [params.location]);

  const handleShare = useCallback(async () => {
    await Share.open({
      url: params.imageUrl,
    });
  }, [params.imageUrl]);

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <TouchableOpacity onPress={handleShare}>
          <Image
            source={require('@/assets/images/share.png')}
            style={styles.shareButton}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ),
    });
  }, [handleShare, navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: params.imageUrl }}
        style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
      />
      <View style={styles.textContainer}>
        {cityName ? (
          <Text style={styles.text}>{`Picture location: ${cityName}`}</Text>
        ) : (
          <ActivityIndicator size="small" color={colors.highlights} />
        )}
      </View>
    </View>
  );
}

export default ImageViewerScreen;
