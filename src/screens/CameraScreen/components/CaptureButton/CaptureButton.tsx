import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import styles from './CaptureButton.styles';

function CaptureButton(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <View style={styles.inner} />
    </TouchableOpacity>
  );
}

export default CaptureButton;
