import colors from '@/constants/Colors';
import Dimensions from '@/constants/Dimensions';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.text,
    fontSize: 20,
  },
  textContainer: {
    position: 'absolute',
    bottom: Dimensions.height / 6,
  },
  shareButton: {
    tintColor: colors.text,
    width: 24,
    height: 24,
  },
});

export default styles;
