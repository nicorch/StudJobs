import { Button, Text, } from '@ui-kitten/components';
import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Modal,
  Switch,
  View,
  Image,
  VirtualizedList,
  TextInput
} from 'react-native';
import Profil from './Profil';
import AppForm from '../Components/forms/AppForm';
import AppFormField from '../Components/forms/AppFormField';
import SubmitButton from '../Components/forms/SubmitButton';
import * as Yup from 'yup';

const validationSchemaObject = Yup.object().shape({
  prenom: Yup.string().required().label("Prénom"),
  nom: Yup.string().required().label("Nom"),
  ville: Yup.string().required().label("Ville"),
  adresse: Yup.string().required().label("Adresse"),
  tel: Yup.string().required().positive().lessThan(11).moreThan(9).label("Numéro de téléphone"),
  dateNaissance: Yup.string().required().label("Date de naissance"),
});
const etu = { prenom: "Prénom", nom: "Nom", ville: "Ville", dateNaissance: "Date de naissance", tel: "Numéro de téléphone", adresse: "Adresse"}

const ProfilModifModal = ({isProfilVisible, user, onCloseProfilPress}) => {
  console.log(user);

  let placeholders = etu;
  let initialValues = {ville:user.ville, adresse:user.adresse, tel: user.tel, dateNaisse: user.dateNaissance};
  let validationSchema = validationSchemaObject;
    return (
        <Modal
          animationType = {"slide"}
          transparent = {false}
          presentationStyle = "pageSheet"
          visible = {isProfilVisible}>
          <View style={[styles.header]}>
            <Text category='h6'>Modifier le profil </Text>
          </View>
          <AppForm
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            <AppFormField
              name="prenom"
              placeholder="Prénom"
              autoCorrect={false}
              placeholder={placeholders.prenom}
            />
            <AppFormField
              name="nom"
              placeholder="Nom"
              autoCorrect={false}
              placeholder={placeholders.nom}
            />
            <AppFormField
              name="ville"
              placeholder="Ville"
              autoCorrect={false}
              placeholder={placeholders.ville}
            />
            <AppFormField
              name="adresse"
              placeholder="Adresse"
              autoCorrect={false}
              placeholder={placeholders.adresse}
            />
            <AppFormField
              name="tel"
              placeholder="Numéro de tel"
              autoCorrect={false}
              placeholder={placeholders.tel}
            />
            <AppFormField
              name="dateNaissance"
              placeholder="Née le"
              autoCorrect={false}
              placeholder={placeholders.dateNaissance}
            />
            <View style={styles.submit}>
              <SubmitButton title="Enregistrer" color="violet" />
            </View>
            </AppForm>
            
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      flexDirection: 'row'
    },
    title: {
      fontSize: 20,
      textAlign: 'justify',
      display: 'flex',
      flexDirection: 'row'
    },
    text: {
      width:50,
    },
    listRow: {
      flexDirection : 'row',
      marginTop: 20,
      justifyContent: 'space-between',
    },
    pictureBackground: {
      marginLeft:-9,
      position: 'absolute'
    },
    cardImage: {
      zIndex: 1,
      textAlign: 'center',
      width: 250,
      marginHorizontal: 50,
      borderBottomStartRadius: 20,
      borderBottomEndRadius: 20,
      borderTopStartRadius:20,
      borderTopEndRadius:20,
      borderColor: 'black',
      marginTop: 80
      
    },
    userName: {
      textAlign: 'center'
    },
    profilePicture: {
      width: 100,
      height: 100,
      marginHorizontal:50,
      marginBottom: 20,
      borderBottomStartRadius: 50,
      borderBottomEndRadius: 50,
      borderTopStartRadius:50,
      borderTopEndRadius:50
    },
    infoUser: {
      color: 'rgb(0,121,255)',
    },
    cardInformations: {
      marginTop: 20,
      borderColor: 'black',
      borderStyle: 'solid',
      borderTopWidth:1,
      paddingTop:0
    },
    cardDescription: {
      marginTop: 20,
      borderColor: 'black',
      borderStyle: 'solid',
      borderTopWidth:1,
      paddingTop:20
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
    submit: {
      paddingTop: 20
    },
    textSubmit: {
      paddingTop: 10,
      textAlign: "center"
    }
});

export default ProfilModifModal;