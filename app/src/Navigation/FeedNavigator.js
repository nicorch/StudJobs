import React from 'react';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListingScreen from './../Screens/ListingPageScreen';
import ListingDetailsScreen from './../Screens/ListingDetailsPageScreen';

const Stack = createNativeStackNavigator()

const FeedNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Listing" component={ListingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} options={{ title: "Liste des offres" }} />
    </Stack.Navigator >
)

export default FeedNavigator;