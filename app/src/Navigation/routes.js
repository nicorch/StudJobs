import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from "@react-native-firebase/auth"

import { AutContext } from './AuthProvider';

import AppNavigator from "./AppNavigator"
import AuthNavigator from './AuthNavigator';
import NavigationTheme from './NavigationTheme';

const Routes = () => {

    const { user, setUser } = useContext(AutContext);
    const [initializing, setInitializing] = useState(true)

    const onAuthStateChanged = (user) => {
        setUser(user)
        if (initializing) setInitializing(false)
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber
    })

    if (initializing) return null

    return (
        <NavigationContainer theme={NavigationTheme}>
            {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
};

export default Routes