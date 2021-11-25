import React from 'react';
import { StyleSheet, Text } from 'react-native';

function ErrorMessage({ error, visible }) {
    if (!error || !visible) return null
    return (
        <Text style={styles.container}>{error}</Text>
    );
}

export default ErrorMessage;

const styles = StyleSheet.create({
    container: {
        color: "red"
    }
})