import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomePageScreen from "./../Screens/WelcomePageScreen"
import InscriptionPageScreen from "./../Screens/InscriptionPageScreen"

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomePageScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Inscription" component={InscriptionPageScreen} />
    </Stack.Navigator>
}

export default AuthNavigator;