import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import Profil from "./Profil";
import ProfilModifModal from "./ProfilModifModal";

const ProfilScreen = ({ user }) => {

    const [isModalProfilVisible, setModalProfilVisible] = React.useState(false);
    const [userUpdate, setUserUpdate] = React.useState(user);

    const toggleProfilHandler = (user) => {
        setModalProfilVisible(true);
    }

    const toggleCloseProfilHandler = () => {
        setModalProfilVisible(false);
    }

    const toggleUpdateProfilHandler = (values) => {

        setUser(values);
        setModalProfilVisible(false);
    }


    return (
        <View>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Profil user={user} />
            </ScrollView>
        </View>
    );
};

export default ProfilScreen;