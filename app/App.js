import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavTab from './src/NavTab';


export default function App() {
  return <NavTab />;

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
