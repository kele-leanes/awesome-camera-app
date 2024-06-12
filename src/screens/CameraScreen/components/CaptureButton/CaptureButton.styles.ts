import colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    height: 70,
    width: 70,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.secondaryElements,
  },
  inner: {
    backgroundColor: colors.secondaryElements,
    borderRadius: 50,
    height: 50,
    width: 50,
  },
});

export default styles;
