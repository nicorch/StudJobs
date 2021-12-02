import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from '@expo/vector-icons';
import FeedNavigator from './FeedNavigator';
import AccountNavigator from './AccountNavigator';
import useNotifications from '../hooks/useNotifications';
import users from '../api/users';
import useAuth from '../hooks/useAuth';
import NewListingButton from './NewListingButton';
import ListingAddScreen from '../Screens/ListingAddScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {

  useNotifications();

  const { user } = useAuth()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Offres") {
            iconName = focused
              ? "list-circle"
              : "list-circle-outline";
          } else if (route.name === "Profil") {
            iconName = focused
              ? "person-circle"
              : "person-circle-outline";
          } else if (route.name === "Messages") {
            iconName = focused
              ? "chatbubbles"
              : "chatbubbles-outline"
          }

          // You can return any component that you like here!
          return (
            <Ionicons name={iconName} size={size} color={color} />
          );
        },
      })}>
      <Tab.Screen name="Offres" component={FeedNavigator} />
      {
        user.type === "professionel" &&
        (
          <Tab.Screen
            name="newListing"
            component={ListingAddScreen}
            options={({ navigation }) => ({
              tabBarButton: () => <NewListingButton onPress={() => navigation.navigate("newListing")} />
            })}
          />
        )
      }
      <Tab.Screen name="Profil" component={AccountNavigator} />
    </Tab.Navigator>
  )
}

export default AppNavigator;