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
        <AntDesign name="bars" size={24} color="black" />
        <Text>Les offres</Text>
        </View>
    );
}
  
function MessageScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Ionicons name="md-chatbubbles" size={24} color="black" />
        <Text>Messagerie</Text>
        </View>
    );
}
//Voir pour changer 
function ProfilScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <MaterialCommunityIcons name="face-profile" size={24} color="black" />
        <Text>Profil</Text>
        </View>
    );
}


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Offers" component={OffersScreen} />
      <Tab.Screen name="Messages" component={MessageScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
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