import colors from '@/constants/Colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    backgroundColor: colors.background,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    elevation: 5,
    width: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
  },
  emptyView: { flex: 1, backgroundColor: 'transparent' },
});

export default styles;
