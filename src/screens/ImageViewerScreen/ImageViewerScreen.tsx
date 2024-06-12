import Dimensions from '@/constants/Dimensions';
import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, View, Text, ActivityIndicator } from 'react-native';
import styles from './ImageViewerScreen.styles';
import { RootStackParamList } from '@/navigation/Stacks';
import { getCityName } from '@/utils/location';
import colors from '@/constants/Colors';

const IMAGE_SIZE = Dimensions.width - 16;

type ImageViewerRouteProp = RouteProp<RootStackParamList, 'ImageViewer'>;

function ImageViewerScreen() {
  const { params } = useRoute<ImageViewerRouteProp>();
  const [cityName, setCityName] = useState<string | null>(null);

  useEffect(() => {
    if (params.location) {
      const { lat, lon } = params.location;
      getCityName(lat, lon).then(setCityName);
    }
  }, [params.location]);

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
