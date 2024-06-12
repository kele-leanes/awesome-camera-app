import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ButtonProps } from './Button.types';
import styles from './Button.style';

function Button({ title, onPress, disabled, style, textStyle }: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, style]}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;
