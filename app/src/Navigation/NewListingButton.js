import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import { MaterialCommunityIcons } from "@expo/vector-icons"

function NewListingButton({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <MaterialCommunityIcons name="plus-circle" size={40} color={colors.white} />
            </View>
        </TouchableOpacity>
    );
}

export default NewListingButton;

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.violet,
        borderWidth: 10,
        borderColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
        bottom: 21
    }
})