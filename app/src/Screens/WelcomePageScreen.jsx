import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Screen from '../Components/Screen';

function WelcomePageScreen(props) {
  return (
    <Screen>
      <View style={styles.container}>
      </View>
    </Screen>
  );
}

export default WelcomePageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee"
  }
})