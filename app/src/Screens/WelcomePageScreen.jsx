import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Keyboard } from 'react-native';
import AppFormField from '../Components/forms/AppFormField';
import AppSwitch from '../Components/AppSwitch';
import Screen from '../Components/Screen';
import colors from '../config/colors';
import AppForm from "./../Components/forms/AppForm"
import SubmitButton from "./../Components/forms/SubmitButton"
import * as Yup from "yup"
import useAuth from '../hooks/useAuth';
import authApi from "../api/auth";
import ErrorMessage from '../Components/forms/ErrorMessage';

const choices = [{ id: 0, label: "étudiant" }, { id: 1, label: "profesionnel" }]

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Mot de passe"),
  type: Yup.string().label("Catégorie")
})

function WelcomePageScreen({ navigation }) {

  const [cnx, setCnx] = useState(true)
  const { logIn } = useAuth()
  const [loginFailed, setLoginFailed] = useState(false)

  const handleToConnect = (type) => {
    if (type === "cnx")
      setCnx(true)
    else if (type === "insc")
      setCnx(false)
  }

  const handleSubmit = async ({ email, password, type }) => {
    Keyboard.dismiss();
    if (cnx) {
      const result = await authApi.login(email, password)
      if (!result.ok) return setLoginFailed(true)
      setLoginFailed(false)
      logIn(result.data)
    }
    else if (!cnx) {
      navigation.navigate("Inscription", { email, password, type })
    }
  }

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('./../../assets/logo.jpg')} />
          <Text style={styles.text}>Bienvenue</Text>
        </View>
        <View style={styles.switcherContainer}>
          <TouchableOpacity onPress={() => handleToConnect("cnx")} style={cnx ? [styles.mode, styles.modeActive] : styles.mode}>
            <Text style={cnx ? [styles.textMode, styles.textModeActive] : styles.textMode} >Se connecter</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleToConnect("insc")} style={!cnx ? [styles.mode, styles.modeActive] : styles.mode}>
            <Text style={!cnx ? [styles.textMode, styles.textModeActive] : styles.textMode} >S'inscrire</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <AppForm
            initialValues={{ email: "", password: "", type: "étudiant" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <ErrorMessage error="Invalid email and/or password." visible={loginFailed} />
            <AppFormField
              name="email"
              placeholder="Adresse email"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
            />
            <AppFormField
              name="password"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Mot de passe"
              textContentType="password"
              secureTextEntry
              pass
              icon="eye"
            />
            {
              cnx ? (
                <>
                  <SubmitButton title="Se connecter" />
                  <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
                </>
              )
                : (
                  <>
                    <AppSwitch items={choices} name="type" />
                    <SubmitButton title="S'inscrire" color="violet" />
                  </>
                )
            }
          </AppForm>
        </View>
      </View>
    </Screen>
  );
}

export default WelcomePageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  logoContainer: {
    position: "absolute",
    top: 30,
    alignItems: "center",
  },
  logo: {
    width: 130,
    height: 130,
    borderRadius: 65
  },
  text: {
    fontSize: 44,
    fontWeight: "bold",
    paddingVertical: 16,
  },
  switcherContainer: {
    position: "absolute",
    top: 270,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  mode: {
    width: "50%",
    paddingVertical: 10
  },
  modeActive: {
    borderBottomColor: colors.violet,
    borderBottomWidth: 4
  },
  textMode: {
    fontSize: 20,
    textAlign: "center",
    color: colors.black
  },
  textModeActive: {
    color: colors.violet,
    fontWeight: "bold"
  },
  formContainer: {
    position: "absolute",
    top: 350, width: "100%",
    paddingHorizontal: 30
  },
  forgotPassword: {
    color: colors.blue,
    marginTop: 10,
    width: "100%"
  }
})