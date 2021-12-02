import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Permissions from "expo-permissions"
import expoPushTokensApi from '../api/expoPushTokens';
export default useNotifications = async () => {

  useEffect(() => {
    registerForPushNotifications()
    // add lisetener 
  }, [])

  const registerForPushNotifications = async () => {
    try {
      const permissions = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      if (!permissions.granted) return
      const { data: token } = await Notifications.getExpoPushTokenAsync();
      expoPushTokensApi.register(token)
    } catch (error) {
      console.log(error)
    }
  }
}
