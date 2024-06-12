import React from 'react';
import { Image, Pressable, View } from 'react-native';
import Placeholder from '@/assets/images/placeholder.png';
import Dimensions from '@/constants/Dimensions';
import styles from './ThumbnailItem.styles';
import { HomeScreenNavigationProp, Thumbnail } from '../../HomeScreen.types';
import { useNavigation } from '@react-navigation/native';

const numColumns = 3;

const IMAGE_SIZE = Dimensions.width / numColumns;

function ThumbnailItem({ item }: { item: Thumbnail }) {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleOnPress = () => {
    navigation.navigate('ImageViewer', item);
  };

  if (item?.empty) {
    return <View style={styles.emptyView} />;
  }
  return (
    <Pressable onPress={handleOnPress}>
      <Image
        source={item.imageUrl ? { uri: item.imageUrl } : Placeholder}
        style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
        resizeMode="cover"
      />
    </Pressable>
  );
}

export default ThumbnailItem;
