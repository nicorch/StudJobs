import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useFormikContext } from 'formik';
import colors from '../config/colors';


function AppInputText({ name, icon, secureTextEntry, ...otherParams }) {

    const { handleChange } = useFormikContext()
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View style={styles.container}>
            <TextInput onChangeText={handleChange(name)} style={styles.inputText} secureTextEntry={showPassword} {...otherParams} />
            {icon && <MaterialCommunityIcons name={!showPassword ? icon + "-outline" : icon} size={22} color={!showPassword ? colors.medium : colors.blue} style={styles.icon} onPress={() => setShowPassword(!showPassword)} />}
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