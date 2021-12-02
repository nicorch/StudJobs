import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './src/Navigation/AppNavigator';
import AuthNavigator from './src/Navigation/AuthNavigator';
//import * as eva from '@eva-design/eva';
//import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import AuthStorage from './src/auth/storage';
import AppLoading from 'expo-app-loading';
import AuthContext from './src/auth/AuthContext';
import NavigationTheme from './src/Navigation/NavigationTheme';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});


export default function App() {

  /*React.useEffect(async () => {
    try {
      await AsyncStorage.removeItem('filters');
    } catch (error) {
      console.log(
        'err', error
      );
    }
  },[])*/

  /*
  <ApplicationProvider {...eva} theme={eva.light}>
      <NavTab />
    </ApplicationProvider>
  */

  const [user, setUser] = useState()
  const [isReady, setIsReady] = useState(false)

  const restoreUser = async () => {
    const user = await AuthStorage.getUser();
    if (user) setUser(user)
  }

  if (!isReady)
    return (
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} onError={(error) => console.warn(error)} />
    )

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={NavigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
