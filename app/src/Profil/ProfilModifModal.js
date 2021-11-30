import { Button, Text, } from '@ui-kitten/components';
import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Modal,
  View,
  TextInput
} from 'react-native';

import * as Yup from 'yup';
import { AntDesign } from '@expo/vector-icons';
import { Formik } from 'formik';

const validationSchemaObject = Yup.object().shape({
  prenom: Yup.string().required().label("Prénom"),
  nom: Yup.string().required().label("Nom"),
  ville: Yup.string().required().label("Ville"),
  adresse: Yup.string().required().label("Adresse"),
  tel: Yup.number().required().positive().lessThan(11).moreThan(9).label("Numéro de téléphone"),
  dateNaissance: Yup.string().required().label("Date de naissance"),
});
const etu = { prenom: "Prénom", nom: "Nom", ville: "Ville", dateNaissance: "Date de naissance", tel: "Numéro de téléphone", adresse: "Adresse" }
const initialV = {
  name: "Bidaud",
  firstName: "Antoine",
  city: "Bordeaux",
  age: "23",
  tel: "0631550378",
  adresse: "25 rue Fernand Belliard"
}

const ProfilModifModal = ({ isProfilVisible, user, onCloseProfilPress, type, onSavePress }) => {

  let placeholders = etu;
  //let initialValues = {prenom: user.prenom, nom: user.nom, ville:user.ville, adresse:user.adresse, tel: user.tel, dateNaisse: user.dateNaissance};
  let validationSchema = validationSchemaObject;
  let initialValues = initialV;

  return (
    <Modal
      animationType={"slide"}
      transparent={false}
      presentationStyle="pageSheet"
      visible={isProfilVisible}>
      <View style={[styles.header]}>
        <Text category='h6'>Modifier le profil </Text>
        <AntDesign name="closecircle" size={16} color="grey" onPress={() => onCloseProfilPress()} />
      </View>
      <Formik
        initialValues={user}
        onSubmit={(values) => onSavePress(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              style={styles.inputText}
            />
            <TextInput
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
              style={styles.inputText}
            />
            <TextInput
              onChangeText={handleChange('city')}
              onBlur={handleBlur('city')}
              value={values.city}
              style={styles.inputText}
            />
            <TextInput
              onChangeText={handleChange('age')}
              onBlur={handleBlur('age')}
              value={values.age}
              style={styles.inputText}
            />
            <TextInput
              onChangeText={handleChange('tel')}
              onBlur={handleBlur('tel')}
              value={values.tel}
              style={styles.inputText}
            />
            <TextInput
              onChangeText={handleChange('adresse')}
              onBlur={handleBlur('adresse')}
              value={values.adresse}
              style={styles.inputText}
            />
            <Button style={styles.submitButton} onPress={handleSubmit} title="Submit">Enregistrer</Button>
          </View>
        )}
      </Formik>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    flexDirection: 'row'
  },
  inputText: {
    width: "60%",
    flexDirection: "row",
    borderColor: "#f6f8fd",
    borderRadius: 5,
    borderWidth: 2,
    padding: 10,
    marginHorizontal: 75,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'justify',
    display: 'flex',
    flexDirection: 'row'
  },
  text: {
    width: 50,
  },
  listRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  pictureBackground: {
    marginLeft: -9,
    position: 'absolute'
  },
  cardImage: {
    zIndex: 1,
    textAlign: 'center',
    width: 250,
    marginHorizontal: 50,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderColor: 'black',
    marginTop: 80

  },
  userName: {
    textAlign: 'center'
  },
  profilePicture: {
    width: 100,
    height: 100,
    marginHorizontal: 50,
    marginBottom: 20,
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
    borderTopStartRadius: 50,
    borderTopEndRadius: 50
  },
  infoUser: {
    color: 'rgb(0,121,255)',
  },
  cardInformations: {
    marginTop: 20,
    borderColor: 'black',
    borderStyle: 'solid',
    borderTopWidth: 1,
    paddingTop: 0
  },
  cardDescription: {
    marginTop: 20,
    borderColor: 'black',
    borderStyle: 'solid',
    borderTopWidth: 1,
    paddingTop: 20
  },
  header: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.25,
    textAlign: 'center'
  },
  submitButton: {
    marginVertical:20,
    width: 150,
    marginHorizontal: 120,
    color: "blue"
  },
  textSubmit: {
    paddingTop: 10,
    marginHorizontal: 10,

  }
});

export default ProfilModifModal;