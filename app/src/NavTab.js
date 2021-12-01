import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Messages from "./Messages/Messages";
import OffresStackNav from "./Offres/OffresStackNav";
import ProfilStackNav from "./Profil/ProfilStackNav";
import AuthNavigation from "./Navigation/AuthNavigator"
import NavigationTheme from "./Navigation/NavigationTheme"


const MessagesStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MessagesStackNav = () => (
  <MessagesStack.Navigator>
    <MessagesStack.Screen
      name="Messages"
      options={{
        title: "Messagerie",
      }}
      component={Messages}
    />

  </MessagesStack.Navigator>
);

const NavTab = () => {

  return (
    <NavigationContainer theme={NavigationTheme}>
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
        <Tab.Screen name="Offres" component={OffresStackNav} />
        <Tab.Screen name="Messages" component={MessagesStackNav} />
        <Tab.Screen name="Profil" component={ProfilStackNav} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default NavTab;