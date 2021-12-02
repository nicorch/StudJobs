import React from "react";
import { createNativeStackNavigator, createStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "./../Screens/AccountScreen";
import MessagesScreen from "./../Screens/MessagesScreen";
import ProfilNavigator from "./ProfilNavigator"

const Stack = createNativeStackNavigator();

const AccountNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Account" component={AccountScreen} options={{ title: "Mon compte" }} />
        <Stack.Screen name="Profil" component={ProfilNavigator} />
        <Stack.Screen name="Messages" component={MessagesScreen} />
    </Stack.Navigator>
);

export default AccountNavigator;