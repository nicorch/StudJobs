import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../config/colors';


function AppButton({ title, color = "violet", onHandlePress }) {

    return (
        <TouchableOpacity onPress={onHandlePress} style={[styles.container, { backgroundColor: colors[color] }]}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

export default AppButton;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingVertical: 15,
        marginTop: 10,
        borderRadius: 8
    },
    text: {
        textAlign: "center",
        color: colors.white,
        fontSize: 16
    }
})