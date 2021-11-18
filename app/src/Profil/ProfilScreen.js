import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import Profil from "./Profil";

const ProfilScreen = ({ user, loading, updateProfil }) => {
    
    return (
        <View>
            {loading ? (
            <ActivityIndicator />
            ) : (
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Profil user={user}/>
            </ScrollView>
            )}
        </View>
    );
};

export default ProfilScreen;