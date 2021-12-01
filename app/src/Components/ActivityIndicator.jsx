import React from 'react';
import LottieView from "lottie-react-native"
import { View } from "react-native"

function ActivityIndicator({ visible = false }) {
    if (!visible) return null
    return (
        <View style={{ width: "100%", height: "100%", backgroundColor: "white", opacity: 0.8, zIndex: 1, position: "absolute" }}>
            <LottieView autoPlay loop source={require("./../../assets/animations/loader.json")} />
        </View>
    );
}

export default ActivityIndicator;