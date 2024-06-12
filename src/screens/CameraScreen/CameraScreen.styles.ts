import colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noDeviceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDeviceText: {
    fontSize: 20,
    color: colors.text,
  },
  cancelButton: {
    position: 'absolute',
    zIndex: 1,
    left: 20,
  },
  saveButton: {
    position: 'absolute',
    zIndex: 1,
    left: 20,
  },
  cancelText: {
    color: colors.text,
    fontSize: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  saveImage: {
    width: 30,
    height: 30,
    tintColor: colors.text,
  },
});

export default styles;
