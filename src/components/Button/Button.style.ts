import colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.buttons,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    height: 48,
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
  },
});

export default styles;
