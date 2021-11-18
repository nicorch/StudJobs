import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Screen from '../Components/Screen';
import AppForm from "./../Components/forms/AppForm";
import * as Yup from "yup"
import AppFormField from '../Components/forms/AppFormField';
import SubmitButton from '../Components/forms/SubmitButton';


const initialV = {
  firstname: "",
  lastname: "",
  town: "",
  adress: ""
}

const validationSchemaEtud = Yup.object().shape({
  firstname: Yup.string().required().label("Prénom"),
  lastname: Yup.string().required().label("Nom"),
  age: Yup.number().required().positive().label("Age"),
  phone: Yup.number().required().positive().lessThan(11).moreThan(9).label("Numéro téléphone"),
  town: Yup.string().required().label("Ville"),
  adress: Yup.string().label("Adresse")
})

const validationSchemaPro = Yup.object().shape({
  companyName: Yup.string().required().label("Nom entreprise"),
  firstname: Yup.string().label("Prénom de contact"),
  lastname: Yup.string().label("Nom de contact"),
  town: Yup.string().required().label("Ville"),
  adress: Yup.string().label("Adresse")
})

const etu = { firstname: "Prénom", lastname: "Nom", adress: "Adresse complète" }
const pro = { firstname: "Prénom de contact", lastname: "Nom de contact", adress: "Adresse de l'entreprise" }

function InscriptionPageScreen({ type = "étudiant" }) {

  const [student, setStudent] = useState(type === "étudiant" ? false : true)

  let initialValues = () => student ? { ...initialV, age: null, phone: null } : { ...initialV, companyName: "" };
  let validationSchema = () => student ? validationSchemaEtud : validationSchemaPro;
  let initialPlaceholders = () => student ? etu : pro

  let placeholders = initialPlaceholders()

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Votre profil</Text>
        <View style={styles.formContainer}>
          <AppForm
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => console.log(values)}
          >
            {!student &&
              <AppFormField
                name="companyName"
                placeholder="Nom d'entreprise"
                autoCorrect={false}
              />
            }
            <AppFormField
              name="firstname"
              placeholder={placeholders.firstname}
            />
            <AppFormField
              name="lastname"
              placeholder={placeholders.lastname}
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
              name="adress"
              placeholder={placeholders.adress}
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