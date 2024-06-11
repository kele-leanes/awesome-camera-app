import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainStack } from './Stacks';

function Navigation() {
  return <NavigationContainer>{MainStack()}</NavigationContainer>;
}

export default Navigation;
