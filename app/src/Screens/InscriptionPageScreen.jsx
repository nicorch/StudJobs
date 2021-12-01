import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Keyboard } from 'react-native';
import Screen from '../Components/Screen';
import AppForm from "./../Components/forms/AppForm";
import * as Yup from "yup"
import AppFormField from '../Components/forms/AppFormField';
import SubmitButton from '../Components/forms/SubmitButton';
import useAuth from "../hooks/useAuth";
import useApi from "../hooks/useApi";
import usersApi from "../api/users";
import authApi from "../api/auth";
import ActivityIndicator from '../Components/ActivityIndicator';
import ErrorMessage from '../Components/forms/ErrorMessage';


const initialV = {
  firstName: "",
  lastName: "",
  town: "",
  address: ""
}

const validationSchemaEtud = Yup.object().shape({
  firstName: Yup.string().required().label("Prénom"),
  lastName: Yup.string().required().label("Nom"),
  age: Yup.number().required().positive().label("Age"),
  phone: Yup.number().required().positive().label("Numéro téléphone"),
  town: Yup.string().required().label("Ville"),
  address: Yup.string().label("Adresse")
})

const validationSchemaPro = Yup.object().shape({
  companyName: Yup.string().required().label("Nom entreprise"),
  firstName: Yup.string().label("Prénom de contact"),
  lastName: Yup.string().label("Nom de contact"),
  town: Yup.string().required().label("Ville"),
  address: Yup.string().label("Adresse")
})

const etu = { firstName: "Prénom", lastName: "Nom", address: "Adresse complète" }
const pro = { firstName: "Prénom de contact", lastName: "Nom de contact", address: "Adresse de l'entreprise" }

function InscriptionPageScreen({ route }) {

  const [student, setStudent] = useState(route.params.type === "étudiant" ? true : false)

  let initialValues = () => student ? { ...initialV, age: null, phone: null } : { ...initialV, companyName: "" };
  let validationSchema = () => student ? validationSchemaEtud : validationSchemaPro;
  let initialPlaceholders = () => student ? etu : pro

  let placeholders = initialPlaceholders()

  const [error, setError] = useState(null);
  const auth = useAuth();
  const registerApi = useApi(usersApi.register)
  const loginApi = useApi(authApi.login)

  const handleRegister = async (userInfo) => {
    console.log(userInfo)
    const result = await registerApi.request(userInfo)
    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.")
        console.log(result)
      }
      return
    }

    const { data: authToken } = await loginApi.request(userInfo.email, userInfo.password)
    auth.logIn(authToken);
  }

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen>
        <View style={styles.container}>
          <Text style={styles.title} onPress={() => Keyboard.dismiss()}>Votre profil</Text>
          <View style={styles.formContainer}>
            <AppForm
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => handleRegister({ ...route.params, ...values })}
            >
              <ErrorMessage error={error} visible={error} />
              {!student &&
                <AppFormField
                  name="companyName"
                  placeholder="Nom d'entreprise"
                  autoCorrect={false}
                />
              }
              <AppFormField
                name="firstName"
                placeholder={placeholders.firstName}
              />
              <AppFormField
                name="lastName"
                placeholder={placeholders.lastName}
              />
              {student && (
                <>
                  <AppFormField
                    keyboardType="numeric"
                    name="age"
                    placeholder="Age"
                  />
                  <AppFormField
                    keyboardType="numeric"
                    name="phone"
                    placeholder="Numéro téléphone"
                  />
                </>
              )}
              <AppFormField
                name="town"
                placeholder="Ville (France)"
              />
              <AppFormField
                name="address"
                placeholder={placeholders.address}
                maxLength={255}
                multiline
                numberOfLines={3}
              />
              <View style={styles.submit}>
                <SubmitButton title="Suivant" color="violet" />
                <Text style={styles.textSubmit}>Vous pourrez modifier votre profil plus tard</Text>
              </View>
            </AppForm>
          </View>
        </View>
      </Screen >
    </>
  );
}

export default InscriptionPageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 25
  },
  title: {
    fontSize: 28,
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingTop: 15,
    width: "100%"
  },
  submit: {
    paddingTop: 20
  },
  textSubmit: {
    paddingTop: 10,
    textAlign: "center"
  }
})