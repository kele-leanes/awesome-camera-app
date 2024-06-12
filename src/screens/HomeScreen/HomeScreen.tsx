import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  ListRenderItem,
  Platform,
  StatusBar,
  View,
} from 'react-native';
import { Button } from '@/components';
import styles from './HomeScreen.styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '@/constants/Colors';
import { ThumbnailItem } from './components/ThumbnailItem';
import type { HomeScreenNavigationProp, Thumbnail } from './HomeScreen.types';
import { getFiles, makeDir } from '@/utils/file';
import RNFS from 'react-native-fs';
import { getLocationFromImageData } from '@/utils/location';

export const numColumns = 3;

function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const inset = useSafeAreaInsets();
  const [images, setImages] = useState<Thumbnail[]>([]);

  const formatData = (dataList: Thumbnail[]) => {
    const totalRows = Math.floor(dataList.length / numColumns);
    let totalLastRow = dataList.length - totalRows * numColumns;
    while (totalLastRow !== 0 && totalLastRow !== numColumns) {
      dataList.push({
        imageUrl: '',
        location: { lat: 0, lon: 0 },
        empty: true,
      });
      totalLastRow++;
    }
    return dataList;
  };

  const onTakePicture = () => {
    navigation.navigate('Camera');
  };

  const handleGetFiles = async () => {
    try {
      const files = await getFiles();
      if (!files) {
        return;
      }
      const imgs = files.map(async file => {
        const base64 = await RNFS.readFile(file.path, 'base64');
        const location = await getLocationFromImageData(base64);
        return {
          imageUrl: Platform.select({
            android: `file://${file.path}`,
            ios: file.path,
          }) as string,
          location,
        };
      });
      setImages(await Promise.all(imgs));
    } catch (error) {
      console.error('Error reading files:', error);
    }
  };

  const renderItem: ListRenderItem<Thumbnail> = ({ item }) => {
    return <ThumbnailItem item={item} />;
  };

  useEffect(() => {
    makeDir();
  }, []);

  useFocusEffect(
    useCallback(() => {
      handleGetFiles();
    }, []),
  );

  return (
    <View style={styles.flex1}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <FlatList
        style={styles.flex1}
        data={formatData(images)}
        renderItem={renderItem}
        numColumns={numColumns}
        contentContainerStyle={{
          paddingTop: Platform.select({
            ios: inset.top + 40,
            android: 50,
          }),
        }}
      />
      <Button
        title="Take Picture"
        onPress={onTakePicture}
        style={styles.floatingButton}
      />
    </View>
  );
}

export default HomeScreen;
