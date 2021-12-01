import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ProfilNavigator from './ProfilNavigator';
import OffreNavigator from './OffreNavigator';
import Messages from '../Messages/Messages';
import { Ionicons } from '@expo/vector-icons';
import ListingPageScreen from '../Screens/ListingPageScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
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
        <Tab.Screen name="Offres" component={ListingPageScreen} />
        <Tab.Screen name="Messages" component={Messages} />
        <Tab.Screen name="Profil" component={ProfilNavigator} />
    </Tab.Navigator>
)

export default AppNavigator;