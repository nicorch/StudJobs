import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import Profil from "./Profil";

const ProfilScreen = ({ data, loading, setData }) => {
    
    const [profil, setProfil] = React.useState({
        _id: '1',
        prenom : 'Antoine',
        nom : 'Bidaud',
        ville: 'Bordeaux',
        adresse : '25 rue Fernand Belliard',
        dateNaissance : '09 / 04 / 1998',
        permisB : true,
        tel: "06 31 55 03 78",
        isAvailable: true
    });

    return (
        <View>
            {loading ? (
            <ActivityIndicator />
            ) : (
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Profil profil={profil}/>
            </ScrollView>
            )}
        </View>
    );
};

export default ProfilScreen;