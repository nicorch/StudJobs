import React from 'react';

import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import WelcomePageScreen from './src/Screens/WelcomePageScreen';
import NavTab from './src/NavTab';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';


export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavTab />
    </ApplicationProvider>);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
