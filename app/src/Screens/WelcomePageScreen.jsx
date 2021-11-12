import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import AppInputText from '../Components/AppInputText';
import AppSwitch from '../Components/AppSwitch';
import Screen from '../Components/Screen';
import colors from '../config/colors';
import AppForm from "./../Components/forms/AppForm"
import SubmitButton from "./../Components/forms/SubmitButton"

const choices = [{ id: 0, label: "étudiant" }, { id: 1, label: "profesionnel" }]

function WelcomePageScreen(props) {

  const [toConnect, setToConnect] = useState(true)

  const handleToConnect = () => setToConnect(!toConnect)

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('./../../assets/logo.jpg')} />
          <Text style={styles.text}>Bienvenue</Text>
        </View>
        <View style={styles.switcherContainer}>
          <TouchableOpacity onPress={handleToConnect} style={toConnect ? [styles.mode, styles.modeActive] : styles.mode}>
            <Text style={toConnect ? [styles.textMode, styles.textModeActive] : styles.textMode} >Se connecter</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleToConnect} style={!toConnect ? [styles.mode, styles.modeActive] : styles.mode}>
            <Text style={!toConnect ? [styles.textMode, styles.textModeActive] : styles.textMode} >S'inscrire</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <AppForm
            initialValues={{ email: "", password: "", type: "étudient" }}
            onSubmit={values => console.log(values)}
          >
            <AppInputText
              name="email"
              placeholder="Adresse email"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-adress"
              textContentType="emailAdress"
            />
            <AppInputText
              name="password"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Mot de passe"
              textContentType="password"
              secureTextEntry
              icon="eye"
            />
            {
              toConnect ? <SubmitButton title="Se connecter" />
                : (
                  <>
                    <AppSwitch items={choices} name="type" />
                    <SubmitButton title="S'inscrire" color="violet" />
                  </>
                )
            }

          </AppForm>
        </View>
        {toConnect && (
          <View style={styles.forgetPassword}>
            <Text style={{ color: colors.blue }}>Mot de passe oublié ?</Text>
          </View>
        )}
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
  forgetPassword: {
    position: "absolute",
    top: 560,
    width: "100%",
    paddingHorizontal: 30,
    marginTop: 20
  }
})