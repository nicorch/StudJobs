import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { auth } from '../../config/firebase';
import { AuthContext } from './AuthProvider';

import AppNavigator from "./AppNavigator"
import AuthNavigator from './AuthNavigator';
import NavigationTheme from './NavigationTheme';


const Routes = () => {

    const { user, setUser } = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true)

    const onAuthStateChanged = (user) => {
        setUser(user)
        if (initializing) setInitializing(false)
    }

    useEffect(() => {
        const subscriber = auth.onAuthStateChanged((userData => {
            setUser(userData)
            if (initializing) setInitializing(false)
        }));
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