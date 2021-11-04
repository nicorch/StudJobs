import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


function OffersScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Les offres</Text>
        </View>
    );
}
  
function MessageScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Messagerie</Text>
        </View>
    );
}
//Voir pour changer 
function ProfilScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profil</Text>
        </View>
    );
}


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Offres" component={OffersScreen} options={{
          tabBarLabel: 'Offres',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="bars" size={size} color={color} />
          ),
        }} />

      <Tab.Screen name="Messages" component={MessageScreen} options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-chatbubbles" size={size} color={color} />
          ),
        }} />
      <Tab.Screen name="Profil" component={ProfilScreen} options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" size={size} color={color} />
          ),
        }} />
    </Tab.Navigator>
  );
}

export default function App() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    )
}