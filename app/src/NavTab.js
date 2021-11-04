import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Messages } from "./Messages/Messages";
import { Offres } from "./Offres/Offres";
import { Profil } from "./Profil/Profil";

const Tab = createBottomTabNavigator();

const NavTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Offres" component={Offres} options={{
          tabBarLabel: 'Offres',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="bars" size={size} color={color} />
          ),
        }} />

      <Tab.Screen name="Messages" component={Messages} options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-chatbubbles" size={size} color={color} />
          ),
        }} />
      <Tab.Screen name="Profil" component={Profil} options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" size={size} color={color} />
          ),
        }} />
    </Tab.Navigator>
  );
}

export default NavTab();