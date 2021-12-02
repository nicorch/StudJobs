import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useFormikContext } from 'formik';
import colors from '../config/colors';


function AppInputText({ name, icon, secureTextEntry, pass, stl, ...otherParams }) {

    const [showPassword, setShowPassword] = useState(false)
    return (
        <View style={[styles.container, stl]}>
            <TextInput style={styles.inputText} secureTextEntry={pass ? !showPassword : false} {...otherParams} />
            {icon && <MaterialCommunityIcons name={!showPassword ? icon + "-outline" : icon} size={22} color={!showPassword ? colors.medium : colors.violet} style={styles.icon} onPress={() => setShowPassword(!showPassword)} />}
        </View>
    );
}

export default AppInputText;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        borderColor: "#f6f8fd",
        borderRadius: 5,
        borderWidth: 2,
        padding: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
    },
    inputText: {
        flex: 1,
    },
    icon: {
        marginTop: 3,
    }
})