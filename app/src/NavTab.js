import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Messages from "./Messages/Messages";
import OffresStackNav from "./Offres/OffresStackNav";
import Profil from "./Profil/Profil";

const MessagesStack = createNativeStackNavigator();
const ProfilStack = createNativeStackNavigator();
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

const ProfilStackNav = () => (
    <ProfilStack.Navigator>
      <ProfilStack.Screen
        name="Profil"
        options={{
          title: "Votre Compte",
        }}
        component={Profil}
      />
    </ProfilStack.Navigator>
  );


const NavTab = () => {
  return (
    <NavigationContainer>
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
            } else if (route.name === "Messages"){
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