import React, { createContext, useState } from "react";

import auth from "@react-native-firebase/auth"


export const AutContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    return (
        <AutContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password)
                    } catch (e) {
                        console.log(e)
                    }
                },
                register: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password)
                    } catch (e) {
                        console.log(e)
                    }
                }
            }}
        >
            {children}
        </AutContext.Provider>
    )
}